/**
 * Supabase Edge Function: moderate-image
 *
 * Moderates uploaded profile photos using Google Cloud Vision SafeSearch API.
 * Called after a photo is uploaded to check for inappropriate content.
 *
 * Expected payload:
 * {
 *   photo_id: string,    // UUID of the profile_photo record
 *   storage_path: string // Path to the image in Supabase Storage
 * }
 *
 * Environment variables required:
 * - GOOGLE_CLOUD_VISION_API_KEY: API key for Google Cloud Vision
 * - SUPABASE_URL: Supabase project URL (auto-injected)
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key (auto-injected)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// SafeSearch likelihood levels
type SafeSearchLikelihood =
  | 'VERY_UNLIKELY'
  | 'UNLIKELY'
  | 'POSSIBLE'
  | 'LIKELY'
  | 'VERY_LIKELY'

interface SafeSearchResult {
  adult: SafeSearchLikelihood
  spoof: SafeSearchLikelihood
  medical: SafeSearchLikelihood
  violence: SafeSearchLikelihood
  racy: SafeSearchLikelihood
}

interface VisionApiResponse {
  responses: Array<{
    safeSearchAnnotation?: SafeSearchResult
    error?: {
      code: number
      message: string
    }
  }>
}

interface ModerationRequest {
  photo_id: string
  storage_path: string
}

// Rejection thresholds - content at or above these levels is rejected
// SECURITY: Stricter thresholds to prevent inappropriate content
const REJECTION_THRESHOLDS: Partial<Record<keyof SafeSearchResult, SafeSearchLikelihood[]>> = {
  adult: ['LIKELY', 'VERY_LIKELY'],
  violence: ['LIKELY', 'VERY_LIKELY'],
  racy: ['LIKELY', 'VERY_LIKELY'], // Tightened: was only VERY_LIKELY, now includes LIKELY
}

// Allowed CORS origins for security
// Only allow requests from our app domains
const ALLOWED_ORIGINS = [
  'https://backtrack.social',
  'https://www.backtrack.social',
  'https://app.backtrack.social',
  // Development origins
  'http://localhost:3000',
  'http://localhost:8081',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:8081',
]

/**
 * Get CORS origin header based on request origin
 * Returns the origin if it's in the allowed list, otherwise null
 */
function getCorsOrigin(requestOrigin: string | null): string | null {
  if (!requestOrigin) return null
  if (ALLOWED_ORIGINS.includes(requestOrigin)) {
    return requestOrigin
  }
  // Allow Expo development URLs (exp:// and custom schemes)
  if (requestOrigin.startsWith('exp://') || requestOrigin.startsWith('backtrack://')) {
    return requestOrigin
  }
  return null
}

// Likelihood levels in order (for comparison)
const LIKELIHOOD_ORDER: SafeSearchLikelihood[] = [
  'VERY_UNLIKELY',
  'UNLIKELY',
  'POSSIBLE',
  'LIKELY',
  'VERY_LIKELY',
]

function shouldReject(result: SafeSearchResult): boolean {
  for (const [category, thresholds] of Object.entries(REJECTION_THRESHOLDS)) {
    const level = result[category as keyof SafeSearchResult]
    if (thresholds && thresholds.includes(level)) {
      return true
    }
  }
  return false
}

async function moderateImage(
  imageBase64: string,
  apiKey: string
): Promise<SafeSearchResult> {
  const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`

  // Debug: log image content info
  console.log('Image base64 length:', imageBase64?.length ?? 'null/undefined')
  console.log('Image base64 first 100 chars:', imageBase64?.substring(0, 100) ?? 'null')
  console.log('API key present:', !!apiKey)

  if (!imageBase64 || imageBase64.length === 0) {
    throw new Error('Image base64 content is empty')
  }

  const requestBody = {
    requests: [
      {
        image: {
          content: imageBase64,
        },
        features: [
          {
            type: 'SAFE_SEARCH_DETECTION',
          },
        ],
      },
    ],
  }

  console.log('Request body structure:', JSON.stringify({
    requests: [{
      image: { content: `[${imageBase64.length} chars]` },
      features: requestBody.requests[0].features
    }]
  }))

  const response = await fetch(visionApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Vision API request failed: ${response.status} - ${errorText}`)
  }

  const data: VisionApiResponse = await response.json()

  if (data.responses[0]?.error) {
    throw new Error(`Vision API error: ${data.responses[0].error.message}`)
  }

  const safeSearchResult = data.responses[0]?.safeSearchAnnotation

  if (!safeSearchResult) {
    throw new Error('No SafeSearch result returned from Vision API')
  }

  return safeSearchResult
}

serve(async (req) => {
  const requestOrigin = req.headers.get('origin')
  const corsOrigin = getCorsOrigin(requestOrigin)

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    // Only allow preflight from allowed origins
    if (!corsOrigin) {
      return new Response(null, { status: 403 })
    }
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Get environment variables
    // Note: Supabase auto-injects SUPABASE_SERVICE_ROLE_KEY (not SUPABASE_SECRET_KEY)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const visionApiKey = Deno.env.get('GOOGLE_CLOUD_VISION_API_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration')
    }

    if (!visionApiKey) {
      throw new Error('Missing GOOGLE_CLOUD_VISION_API_KEY')
    }

    // Parse request body
    const body: ModerationRequest = await req.json()
    const { photo_id, storage_path } = body

    if (!photo_id || !storage_path) {
      return new Response(
        JSON.stringify({ error: 'Missing photo_id or storage_path' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Download the image from Supabase Storage
    console.log('Downloading image from selfies bucket, path:', storage_path)
    const { data: imageData, error: downloadError } = await supabase.storage
      .from('selfies')
      .download(storage_path)

    if (downloadError || !imageData) {
      console.error('Failed to download image:', downloadError)
      console.error('Download error details:', JSON.stringify(downloadError, null, 2))
      console.error('Storage path attempted:', storage_path)
      console.error('Supabase URL:', supabaseUrl)
      // Update status to error
      await supabase.rpc('update_photo_moderation', {
        p_photo_id: photo_id,
        p_status: 'error',
        p_result: { error: 'Failed to download image', path: storage_path },
      })
      return new Response(
        JSON.stringify({ error: 'Failed to download image', details: downloadError, path: storage_path }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Convert blob to base64 using Deno's standard library
    console.log('imageData type:', typeof imageData)
    console.log('imageData size:', imageData.size)
    console.log('imageData type property:', imageData.type)

    const arrayBuffer = await imageData.arrayBuffer()
    console.log('arrayBuffer byteLength:', arrayBuffer.byteLength)

    const uint8Array = new Uint8Array(arrayBuffer)
    console.log('uint8Array length:', uint8Array.length)

    // Use standard base64 encoding for Deno
    let base64Image: string
    try {
      base64Image = base64Encode(uint8Array)
      console.log('base64Encode result length:', base64Image.length)
    } catch (encodeError) {
      console.error('base64Encode failed:', encodeError)
      // Fallback: try manual encoding
      const binaryString = Array.from(uint8Array, byte => String.fromCharCode(byte)).join('')
      base64Image = btoa(binaryString)
      console.log('btoa fallback result length:', base64Image.length)
    }

    console.log('Final base64 length:', base64Image.length)

    // Call Google Cloud Vision API
    let safeSearchResult: SafeSearchResult
    try {
      safeSearchResult = await moderateImage(base64Image, visionApiKey)
    } catch (visionError) {
      console.error('Vision API error:', visionError)
      // Update status to error
      await supabase.rpc('update_photo_moderation', {
        p_photo_id: photo_id,
        p_status: 'error',
        p_result: { error: String(visionError) },
      })
      return new Response(
        JSON.stringify({ error: 'Moderation failed', details: String(visionError) }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Determine if content should be rejected
    const isRejected = shouldReject(safeSearchResult)
    const newStatus = isRejected ? 'rejected' : 'approved'

    // Update the photo record with moderation result
    await supabase.rpc('update_photo_moderation', {
      p_photo_id: photo_id,
      p_status: newStatus,
      p_result: safeSearchResult,
    })

    // If rejected, delete the image from storage
    if (isRejected) {
      const { error: deleteError } = await supabase.storage
        .from('selfies')
        .remove([storage_path])

      if (deleteError) {
        console.error('Failed to delete rejected image:', deleteError)
        // Continue anyway - the photo is marked as rejected
      }
    }

    // Build response headers with CORS if origin is allowed
    const responseHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (corsOrigin) {
      responseHeaders['Access-Control-Allow-Origin'] = corsOrigin
    }

    return new Response(
      JSON.stringify({
        success: true,
        photo_id,
        status: newStatus,
        moderation_result: safeSearchResult,
      }),
      {
        status: 200,
        headers: responseHeaders,
      }
    )
  } catch (error) {
    console.error('Moderation error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})
