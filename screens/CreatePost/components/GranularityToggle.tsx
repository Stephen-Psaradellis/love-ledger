/**
 * GranularityToggle Component
 *
 * Toggle component for selecting between 'specific' and 'approximate' time modes
 * in the CreatePost wizard flow. Allows users to specify whether they want to
 * provide an exact time (e.g., "3:15 PM") or an approximate period
 * (morning/afternoon/evening).
 *
 * @example
 * ```tsx
 * <GranularityToggle
 *   mode={timeMode}
 *   onModeChange={setTimeMode}
 * />
 * ```
 */

import React, { memo, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { lightFeedback } from '../../../lib/haptics'
import { COLORS } from '../styles'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Time granularity mode
 *
 * - 'specific': User will enter an exact time (e.g., "3:15 PM")
 * - 'approximate': User will select a time period (morning/afternoon/evening)
 */
export type GranularityMode = 'specific' | 'approximate'

/**
 * Props for the GranularityToggle component
 */
export interface GranularityToggleProps {
  /**
   * Currently selected mode
   */
  mode: GranularityMode

  /**
   * Callback when mode is changed
   */
  onModeChange: (mode: GranularityMode) => void

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Test ID prefix for testing purposes
   * @default 'granularity-toggle'
   */
  testID?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * GranularityToggle - Toggle between specific and approximate time modes
 *
 * Displays two toggle options side by side. The selected option is highlighted
 * with the primary color, while the unselected option has a secondary appearance.
 * Provides haptic feedback on selection changes.
 */
export const GranularityToggle = memo(function GranularityToggle({
  mode,
  onModeChange,
  disabled = false,
  testID = 'granularity-toggle',
}: GranularityToggleProps): JSX.Element {
  /**
   * Handle toggle press with haptic feedback
   */
  const handlePress = useCallback(
    async (newMode: GranularityMode) => {
      if (disabled || newMode === mode) return

      await lightFeedback()
      onModeChange(newMode)
    },
    [disabled, mode, onModeChange]
  )

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>Time precision</Text>
      <View style={styles.toggleContainer}>
        {/* Specific time option */}
        <TouchableOpacity
          style={[
            styles.toggleOption,
            mode === 'specific' && styles.toggleOptionSelected,
            disabled && styles.toggleOptionDisabled,
          ]}
          onPress={() => handlePress('specific')}
          disabled={disabled}
          activeOpacity={0.7}
          testID={`${testID}-specific`}
          accessibilityLabel="Specific time"
          accessibilityRole="radio"
          accessibilityState={{ checked: mode === 'specific', disabled }}
        >
          <Text style={styles.toggleIcon}>🕐</Text>
          <Text
            style={[
              styles.toggleText,
              mode === 'specific' && styles.toggleTextSelected,
              disabled && styles.toggleTextDisabled,
            ]}
          >
            Specific Time
          </Text>
          <Text
            style={[
              styles.toggleDescription,
              mode === 'specific' && styles.toggleDescriptionSelected,
              disabled && styles.toggleDescriptionDisabled,
            ]}
          >
            e.g., 3:15 PM
          </Text>
        </TouchableOpacity>

        {/* Approximate time option */}
        <TouchableOpacity
          style={[
            styles.toggleOption,
            mode === 'approximate' && styles.toggleOptionSelected,
            disabled && styles.toggleOptionDisabled,
          ]}
          onPress={() => handlePress('approximate')}
          disabled={disabled}
          activeOpacity={0.7}
          testID={`${testID}-approximate`}
          accessibilityLabel="Approximate time"
          accessibilityRole="radio"
          accessibilityState={{ checked: mode === 'approximate', disabled }}
        >
          <Text style={styles.toggleIcon}>🌤️</Text>
          <Text
            style={[
              styles.toggleText,
              mode === 'approximate' && styles.toggleTextSelected,
              disabled && styles.toggleTextDisabled,
            ]}
          >
            Approximate
          </Text>
          <Text
            style={[
              styles.toggleDescription,
              mode === 'approximate' && styles.toggleDescriptionSelected,
              disabled && styles.toggleDescriptionDisabled,
            ]}
          >
            Morning, Afternoon, Evening
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  toggleContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  toggleOption: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },

  toggleOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#E8F2FF',
  },

  toggleOptionDisabled: {
    opacity: 0.5,
  },

  toggleIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },

  toggleTextSelected: {
    color: COLORS.primary,
  },

  toggleTextDisabled: {
    color: COLORS.textSecondary,
  },

  toggleDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  toggleDescriptionSelected: {
    color: COLORS.primary,
  },

  toggleDescriptionDisabled: {
    color: COLORS.textSecondary,
  },
})

// ============================================================================
// EXPORTS
// ============================================================================

export default GranularityToggle
