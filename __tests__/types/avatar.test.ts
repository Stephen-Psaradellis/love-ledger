/**
 * Unit tests for avatar type utilities
 *
 * Tests the type guard functions and configuration utilities
 * for avatar customization options.
 */

import {
  isValidAvatarOption,
  isValidAvatarConfig,
  createAvatarConfig,
  AVATAR_OPTIONS,
  DEFAULT_AVATAR_CONFIG,
  type AvatarOptionKey,
  type AvatarConfig,
} from '@/types/avatar'

describe('isValidAvatarOption', () => {
  // ============================================================================
  // Test all avatar option keys with valid values
  // ============================================================================

  describe('topType validation', () => {
    it('returns true for valid topType values', () => {
      expect(isValidAvatarOption('topType', 'NoHair')).toBe(true)
      expect(isValidAvatarOption('topType', 'Hat')).toBe(true)
      expect(isValidAvatarOption('topType', 'LongHairBigHair')).toBe(true)
      expect(isValidAvatarOption('topType', 'ShortHairShortFlat')).toBe(true)
      expect(isValidAvatarOption('topType', 'WinterHat4')).toBe(true)
    })

    it('returns false for invalid topType values', () => {
      expect(isValidAvatarOption('topType', 'InvalidHair')).toBe(false)
      expect(isValidAvatarOption('topType', 'nohair')).toBe(false) // Case sensitive
      expect(isValidAvatarOption('topType', '')).toBe(false)
    })
  })

  describe('accessoriesType validation', () => {
    it('returns true for valid accessoriesType values', () => {
      expect(isValidAvatarOption('accessoriesType', 'Blank')).toBe(true)
      expect(isValidAvatarOption('accessoriesType', 'Kurt')).toBe(true)
      expect(isValidAvatarOption('accessoriesType', 'Sunglasses')).toBe(true)
      expect(isValidAvatarOption('accessoriesType', 'Wayfarers')).toBe(true)
    })

    it('returns false for invalid accessoriesType values', () => {
      expect(isValidAvatarOption('accessoriesType', 'Monocle')).toBe(false)
      expect(isValidAvatarOption('accessoriesType', 'sunglasses')).toBe(false)
    })
  })

  describe('hairColor validation', () => {
    it('returns true for valid hairColor values', () => {
      expect(isValidAvatarOption('hairColor', 'Auburn')).toBe(true)
      expect(isValidAvatarOption('hairColor', 'Black')).toBe(true)
      expect(isValidAvatarOption('hairColor', 'Blonde')).toBe(true)
      expect(isValidAvatarOption('hairColor', 'PastelPink')).toBe(true)
      expect(isValidAvatarOption('hairColor', 'SilverGray')).toBe(true)
    })

    it('returns false for invalid hairColor values', () => {
      expect(isValidAvatarOption('hairColor', 'Purple')).toBe(false)
      expect(isValidAvatarOption('hairColor', 'auburn')).toBe(false)
    })
  })

  describe('facialHairType validation', () => {
    it('returns true for valid facialHairType values', () => {
      expect(isValidAvatarOption('facialHairType', 'Blank')).toBe(true)
      expect(isValidAvatarOption('facialHairType', 'BeardMedium')).toBe(true)
      expect(isValidAvatarOption('facialHairType', 'MoustacheFancy')).toBe(true)
    })

    it('returns false for invalid facialHairType values', () => {
      expect(isValidAvatarOption('facialHairType', 'Goatee')).toBe(false)
    })
  })

  describe('facialHairColor validation', () => {
    it('returns true for valid facialHairColor values', () => {
      expect(isValidAvatarOption('facialHairColor', 'Auburn')).toBe(true)
      expect(isValidAvatarOption('facialHairColor', 'Black')).toBe(true)
      expect(isValidAvatarOption('facialHairColor', 'Platinum')).toBe(true)
    })

    it('returns false for invalid facialHairColor values', () => {
      expect(isValidAvatarOption('facialHairColor', 'Gray')).toBe(false)
    })
  })

  describe('clotheType validation', () => {
    it('returns true for valid clotheType values', () => {
      expect(isValidAvatarOption('clotheType', 'BlazerShirt')).toBe(true)
      expect(isValidAvatarOption('clotheType', 'Hoodie')).toBe(true)
      expect(isValidAvatarOption('clotheType', 'ShirtVNeck')).toBe(true)
    })

    it('returns false for invalid clotheType values', () => {
      expect(isValidAvatarOption('clotheType', 'TShirt')).toBe(false)
    })
  })

  describe('clotheColor validation', () => {
    it('returns true for valid clotheColor values', () => {
      expect(isValidAvatarOption('clotheColor', 'Black')).toBe(true)
      expect(isValidAvatarOption('clotheColor', 'Blue01')).toBe(true)
      expect(isValidAvatarOption('clotheColor', 'PastelBlue')).toBe(true)
      expect(isValidAvatarOption('clotheColor', 'White')).toBe(true)
    })

    it('returns false for invalid clotheColor values', () => {
      expect(isValidAvatarOption('clotheColor', 'Blue')).toBe(false)
      expect(isValidAvatarOption('clotheColor', 'Rainbow')).toBe(false)
    })
  })

  describe('graphicType validation', () => {
    it('returns true for valid graphicType values', () => {
      expect(isValidAvatarOption('graphicType', 'Bat')).toBe(true)
      expect(isValidAvatarOption('graphicType', 'Pizza')).toBe(true)
      expect(isValidAvatarOption('graphicType', 'Skull')).toBe(true)
    })

    it('returns false for invalid graphicType values', () => {
      expect(isValidAvatarOption('graphicType', 'Star')).toBe(false)
    })
  })

  describe('eyeType validation', () => {
    it('returns true for valid eyeType values', () => {
      expect(isValidAvatarOption('eyeType', 'Close')).toBe(true)
      expect(isValidAvatarOption('eyeType', 'Default')).toBe(true)
      expect(isValidAvatarOption('eyeType', 'Happy')).toBe(true)
      expect(isValidAvatarOption('eyeType', 'Hearts')).toBe(true)
      expect(isValidAvatarOption('eyeType', 'WinkWacky')).toBe(true)
    })

    it('returns false for invalid eyeType values', () => {
      expect(isValidAvatarOption('eyeType', 'Open')).toBe(false)
      expect(isValidAvatarOption('eyeType', 'default')).toBe(false)
    })
  })

  describe('eyebrowType validation', () => {
    it('returns true for valid eyebrowType values', () => {
      expect(isValidAvatarOption('eyebrowType', 'Angry')).toBe(true)
      expect(isValidAvatarOption('eyebrowType', 'Default')).toBe(true)
      expect(isValidAvatarOption('eyebrowType', 'UnibrowNatural')).toBe(true)
    })

    it('returns false for invalid eyebrowType values', () => {
      expect(isValidAvatarOption('eyebrowType', 'Surprised')).toBe(false)
    })
  })

  describe('mouthType validation', () => {
    it('returns true for valid mouthType values', () => {
      expect(isValidAvatarOption('mouthType', 'Default')).toBe(true)
      expect(isValidAvatarOption('mouthType', 'Smile')).toBe(true)
      expect(isValidAvatarOption('mouthType', 'Vomit')).toBe(true)
    })

    it('returns false for invalid mouthType values', () => {
      expect(isValidAvatarOption('mouthType', 'Happy')).toBe(false)
    })
  })

  describe('skinColor validation', () => {
    it('returns true for valid skinColor values', () => {
      expect(isValidAvatarOption('skinColor', 'Tanned')).toBe(true)
      expect(isValidAvatarOption('skinColor', 'Light')).toBe(true)
      expect(isValidAvatarOption('skinColor', 'DarkBrown')).toBe(true)
      expect(isValidAvatarOption('skinColor', 'Black')).toBe(true)
    })

    it('returns false for invalid skinColor values', () => {
      expect(isValidAvatarOption('skinColor', 'White')).toBe(false)
      expect(isValidAvatarOption('skinColor', 'dark')).toBe(false)
    })
  })

  describe('avatarStyle validation', () => {
    it('returns true for valid avatarStyle values', () => {
      expect(isValidAvatarOption('avatarStyle', 'Circle')).toBe(true)
      expect(isValidAvatarOption('avatarStyle', 'Transparent')).toBe(true)
    })

    it('returns false for invalid avatarStyle values', () => {
      expect(isValidAvatarOption('avatarStyle', 'Square')).toBe(false)
      expect(isValidAvatarOption('avatarStyle', 'circle')).toBe(false)
    })
  })

  // ============================================================================
  // Edge cases - null, undefined, wrong types
  // ============================================================================

  describe('edge cases', () => {
    it('returns false for null value', () => {
      expect(isValidAvatarOption('topType', null)).toBe(false)
      expect(isValidAvatarOption('eyeType', null)).toBe(false)
      expect(isValidAvatarOption('skinColor', null)).toBe(false)
    })

    it('returns false for undefined value', () => {
      expect(isValidAvatarOption('topType', undefined)).toBe(false)
      expect(isValidAvatarOption('eyeType', undefined)).toBe(false)
      expect(isValidAvatarOption('skinColor', undefined)).toBe(false)
    })

    it('returns false for number values', () => {
      expect(isValidAvatarOption('topType', 0)).toBe(false)
      expect(isValidAvatarOption('topType', 1)).toBe(false)
      expect(isValidAvatarOption('topType', 42)).toBe(false)
    })

    it('returns false for boolean values', () => {
      expect(isValidAvatarOption('topType', true)).toBe(false)
      expect(isValidAvatarOption('topType', false)).toBe(false)
    })

    it('returns false for object values', () => {
      expect(isValidAvatarOption('topType', {})).toBe(false)
      expect(isValidAvatarOption('topType', { value: 'NoHair' })).toBe(false)
    })

    it('returns false for array values', () => {
      expect(isValidAvatarOption('topType', [])).toBe(false)
      expect(isValidAvatarOption('topType', ['NoHair'])).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isValidAvatarOption('topType', '')).toBe(false)
      expect(isValidAvatarOption('eyeType', '')).toBe(false)
      expect(isValidAvatarOption('skinColor', '')).toBe(false)
    })

    it('returns false for whitespace-only strings', () => {
      expect(isValidAvatarOption('topType', ' ')).toBe(false)
      expect(isValidAvatarOption('topType', '  ')).toBe(false)
    })
  })

  // ============================================================================
  // Comprehensive test - validates all options for all keys
  // ============================================================================

  describe('validates all defined options', () => {
    const avatarOptionKeys = Object.keys(AVATAR_OPTIONS) as AvatarOptionKey[]

    avatarOptionKeys.forEach((key) => {
      describe(`all ${key} options are valid`, () => {
        const options = AVATAR_OPTIONS[key]

        options.forEach((option) => {
          it(`validates "${option}" as a valid ${key}`, () => {
            expect(isValidAvatarOption(key, option)).toBe(true)
          })
        })
      })
    })
  })
})

describe('isValidAvatarConfig', () => {
  // ============================================================================
  // Valid complete configuration
  // ============================================================================

  describe('valid complete config', () => {
    it('returns true for DEFAULT_AVATAR_CONFIG', () => {
      expect(isValidAvatarConfig(DEFAULT_AVATAR_CONFIG)).toBe(true)
    })

    it('returns true for a complete valid config with all properties', () => {
      const config: AvatarConfig = {
        avatarStyle: 'Circle',
        topType: 'LongHairBigHair',
        accessoriesType: 'Sunglasses',
        hairColor: 'Auburn',
        facialHairType: 'BeardMedium',
        facialHairColor: 'Black',
        clotheType: 'Hoodie',
        clotheColor: 'Blue01',
        graphicType: 'Pizza',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Tanned',
      }
      expect(isValidAvatarConfig(config)).toBe(true)
    })

    it('returns true for a config with different valid values', () => {
      const config: AvatarConfig = {
        avatarStyle: 'Transparent',
        topType: 'Hat',
        accessoriesType: 'Wayfarers',
        hairColor: 'Blonde',
        facialHairType: 'MoustacheFancy',
        facialHairColor: 'Brown',
        clotheType: 'BlazerShirt',
        clotheColor: 'White',
        graphicType: 'Skull',
        eyeType: 'Wink',
        eyebrowType: 'RaisedExcited',
        mouthType: 'Tongue',
        skinColor: 'DarkBrown',
      }
      expect(isValidAvatarConfig(config)).toBe(true)
    })
  })

  // ============================================================================
  // Valid partial configuration
  // ============================================================================

  describe('valid partial config', () => {
    it('returns true for an empty object', () => {
      expect(isValidAvatarConfig({})).toBe(true)
    })

    it('returns true for a config with only topType', () => {
      expect(isValidAvatarConfig({ topType: 'NoHair' })).toBe(true)
    })

    it('returns true for a config with only avatarStyle', () => {
      expect(isValidAvatarConfig({ avatarStyle: 'Transparent' })).toBe(true)
    })

    it('returns true for a config with only eyeType', () => {
      expect(isValidAvatarConfig({ eyeType: 'Hearts' })).toBe(true)
    })

    it('returns true for a config with only skinColor', () => {
      expect(isValidAvatarConfig({ skinColor: 'Brown' })).toBe(true)
    })

    it('returns true for a config with a few properties', () => {
      const config: AvatarConfig = {
        topType: 'ShortHairShortCurly',
        eyeType: 'Default',
        mouthType: 'Smile',
      }
      expect(isValidAvatarConfig(config)).toBe(true)
    })

    it('returns true for a config with most properties', () => {
      const config: AvatarConfig = {
        topType: 'LongHairBob',
        accessoriesType: 'Kurt',
        hairColor: 'Black',
        clotheType: 'ShirtVNeck',
        clotheColor: 'Red',
        eyeType: 'Side',
        eyebrowType: 'FlatNatural',
        mouthType: 'Serious',
        skinColor: 'Light',
      }
      expect(isValidAvatarConfig(config)).toBe(true)
    })
  })

  // ============================================================================
  // Config with invalid options
  // ============================================================================

  describe('config with invalid options', () => {
    it('returns false for config with invalid topType', () => {
      const config = {
        topType: 'InvalidHair',
        eyeType: 'Default',
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with invalid eyeType', () => {
      const config = {
        topType: 'NoHair',
        eyeType: 'InvalidEye',
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with invalid skinColor', () => {
      const config = {
        skinColor: 'Green',
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with invalid avatarStyle', () => {
      const config = {
        avatarStyle: 'Square',
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with invalid clotheType', () => {
      const config = {
        clotheType: 'TShirt',
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with case-sensitive value error', () => {
      const config = {
        topType: 'nohair', // should be 'NoHair'
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with one invalid among many valid', () => {
      const config = {
        avatarStyle: 'Circle', // valid
        topType: 'Hat', // valid
        eyeType: 'Default', // valid
        mouthType: 'InvalidMouth', // invalid
        skinColor: 'Light', // valid
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with null value for valid key', () => {
      const config = {
        topType: null,
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with undefined value for valid key', () => {
      const config = {
        topType: undefined,
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with number value', () => {
      const config = {
        topType: 123,
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with boolean value', () => {
      const config = {
        topType: true,
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with array value', () => {
      const config = {
        topType: ['NoHair'],
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })

    it('returns false for config with object value', () => {
      const config = {
        topType: { value: 'NoHair' },
      }
      expect(isValidAvatarConfig(config)).toBe(false)
    })
  })

  // ============================================================================
  // Config with extra/unknown properties
  // ============================================================================

  describe('config with extra properties', () => {
    it('returns true for config with unknown property keys', () => {
      // Unknown keys are ignored (not in AVATAR_OPTIONS)
      const config = {
        topType: 'NoHair',
        unknownProp: 'someValue',
      }
      expect(isValidAvatarConfig(config)).toBe(true)
    })

    it('returns true for config with only unknown properties', () => {
      const config = {
        foo: 'bar',
        baz: 123,
      }
      expect(isValidAvatarConfig(config)).toBe(true)
    })
  })

  // ============================================================================
  // Non-object inputs
  // ============================================================================

  describe('non-object inputs', () => {
    it('returns false for string input', () => {
      expect(isValidAvatarConfig('not an object')).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isValidAvatarConfig('')).toBe(false)
    })

    it('returns false for number input', () => {
      expect(isValidAvatarConfig(42)).toBe(false)
    })

    it('returns false for zero', () => {
      expect(isValidAvatarConfig(0)).toBe(false)
    })

    it('returns false for boolean true', () => {
      expect(isValidAvatarConfig(true)).toBe(false)
    })

    it('returns false for boolean false', () => {
      expect(isValidAvatarConfig(false)).toBe(false)
    })

    it('returns false for array input', () => {
      expect(isValidAvatarConfig([])).toBe(false)
    })

    it('returns false for array with valid config object', () => {
      expect(isValidAvatarConfig([{ topType: 'NoHair' }])).toBe(false)
    })

    it('returns false for function input', () => {
      expect(isValidAvatarConfig(() => {})).toBe(false)
    })

    it('returns false for Symbol input', () => {
      expect(isValidAvatarConfig(Symbol('test'))).toBe(false)
    })
  })

  // ============================================================================
  // Null and undefined inputs
  // ============================================================================

  describe('null and undefined inputs', () => {
    it('returns false for null', () => {
      expect(isValidAvatarConfig(null)).toBe(false)
    })

    it('returns false for undefined', () => {
      expect(isValidAvatarConfig(undefined)).toBe(false)
    })
  })

  // ============================================================================
  // Edge cases
  // ============================================================================

  describe('edge cases', () => {
    it('handles config with empty string key', () => {
      const config = {
        '': 'value',
      }
      // Empty string is not a valid avatar option key, so it's ignored
      expect(isValidAvatarConfig(config)).toBe(true)
    })

    it('validates all avatar option keys from AVATAR_OPTIONS', () => {
      // Build a valid config using first option from each category
      const validConfig: Record<string, string> = {}
      const avatarOptionKeys = Object.keys(AVATAR_OPTIONS) as AvatarOptionKey[]

      avatarOptionKeys.forEach((key) => {
        validConfig[key] = AVATAR_OPTIONS[key][0]
      })

      expect(isValidAvatarConfig(validConfig)).toBe(true)
    })

    it('validates config built from last options in each category', () => {
      // Build a valid config using last option from each category
      const validConfig: Record<string, string> = {}
      const avatarOptionKeys = Object.keys(AVATAR_OPTIONS) as AvatarOptionKey[]

      avatarOptionKeys.forEach((key) => {
        const options = AVATAR_OPTIONS[key]
        validConfig[key] = options[options.length - 1]
      })

      expect(isValidAvatarConfig(validConfig)).toBe(true)
    })

    it('handles Object.create(null) as config', () => {
      const config = Object.create(null)
      config.topType = 'NoHair'
      expect(isValidAvatarConfig(config)).toBe(true)
    })

    it('handles frozen object', () => {
      const config = Object.freeze({ topType: 'NoHair', eyeType: 'Default' })
      expect(isValidAvatarConfig(config)).toBe(true)
    })

    it('handles sealed object', () => {
      const config = Object.seal({ topType: 'Hat', skinColor: 'Light' })
      expect(isValidAvatarConfig(config)).toBe(true)
    })
  })
})

describe('createAvatarConfig', () => {
  // ============================================================================
  // Empty/undefined input returns all defaults
  // ============================================================================

  describe('empty input returns all defaults', () => {
    it('returns DEFAULT_AVATAR_CONFIG when called with no arguments', () => {
      const result = createAvatarConfig()
      expect(result).toEqual(DEFAULT_AVATAR_CONFIG)
    })

    it('returns DEFAULT_AVATAR_CONFIG when called with undefined', () => {
      const result = createAvatarConfig(undefined)
      expect(result).toEqual(DEFAULT_AVATAR_CONFIG)
    })

    it('returns DEFAULT_AVATAR_CONFIG when called with empty object', () => {
      const result = createAvatarConfig({})
      expect(result).toEqual(DEFAULT_AVATAR_CONFIG)
    })

    it('returns a new object, not a reference to DEFAULT_AVATAR_CONFIG', () => {
      const result = createAvatarConfig()
      expect(result).not.toBe(DEFAULT_AVATAR_CONFIG)
      expect(result).toEqual(DEFAULT_AVATAR_CONFIG)
    })
  })

  // ============================================================================
  // All default values match DEFAULT_AVATAR_CONFIG
  // ============================================================================

  describe('all default values match DEFAULT_AVATAR_CONFIG', () => {
    it('returns correct default avatarStyle', () => {
      const result = createAvatarConfig()
      expect(result.avatarStyle).toBe(DEFAULT_AVATAR_CONFIG.avatarStyle)
      expect(result.avatarStyle).toBe('Circle')
    })

    it('returns correct default topType', () => {
      const result = createAvatarConfig()
      expect(result.topType).toBe(DEFAULT_AVATAR_CONFIG.topType)
      expect(result.topType).toBe('ShortHairShortFlat')
    })

    it('returns correct default accessoriesType', () => {
      const result = createAvatarConfig()
      expect(result.accessoriesType).toBe(DEFAULT_AVATAR_CONFIG.accessoriesType)
      expect(result.accessoriesType).toBe('Blank')
    })

    it('returns correct default hairColor', () => {
      const result = createAvatarConfig()
      expect(result.hairColor).toBe(DEFAULT_AVATAR_CONFIG.hairColor)
      expect(result.hairColor).toBe('Brown')
    })

    it('returns correct default facialHairType', () => {
      const result = createAvatarConfig()
      expect(result.facialHairType).toBe(DEFAULT_AVATAR_CONFIG.facialHairType)
      expect(result.facialHairType).toBe('Blank')
    })

    it('returns correct default facialHairColor', () => {
      const result = createAvatarConfig()
      expect(result.facialHairColor).toBe(DEFAULT_AVATAR_CONFIG.facialHairColor)
      expect(result.facialHairColor).toBe('Brown')
    })

    it('returns correct default clotheType', () => {
      const result = createAvatarConfig()
      expect(result.clotheType).toBe(DEFAULT_AVATAR_CONFIG.clotheType)
      expect(result.clotheType).toBe('ShirtCrewNeck')
    })

    it('returns correct default clotheColor', () => {
      const result = createAvatarConfig()
      expect(result.clotheColor).toBe(DEFAULT_AVATAR_CONFIG.clotheColor)
      expect(result.clotheColor).toBe('Blue01')
    })

    it('returns correct default graphicType', () => {
      const result = createAvatarConfig()
      expect(result.graphicType).toBe(DEFAULT_AVATAR_CONFIG.graphicType)
      expect(result.graphicType).toBe('Bat')
    })

    it('returns correct default eyeType', () => {
      const result = createAvatarConfig()
      expect(result.eyeType).toBe(DEFAULT_AVATAR_CONFIG.eyeType)
      expect(result.eyeType).toBe('Default')
    })

    it('returns correct default eyebrowType', () => {
      const result = createAvatarConfig()
      expect(result.eyebrowType).toBe(DEFAULT_AVATAR_CONFIG.eyebrowType)
      expect(result.eyebrowType).toBe('Default')
    })

    it('returns correct default mouthType', () => {
      const result = createAvatarConfig()
      expect(result.mouthType).toBe(DEFAULT_AVATAR_CONFIG.mouthType)
      expect(result.mouthType).toBe('Default')
    })

    it('returns correct default skinColor', () => {
      const result = createAvatarConfig()
      expect(result.skinColor).toBe(DEFAULT_AVATAR_CONFIG.skinColor)
      expect(result.skinColor).toBe('Light')
    })
  })

  // ============================================================================
  // Partial input merges with defaults
  // ============================================================================

  describe('partial input merges with defaults', () => {
    it('merges single property override with defaults', () => {
      const result = createAvatarConfig({ topType: 'Hat' })
      expect(result.topType).toBe('Hat')
      // All other properties should be defaults
      expect(result.avatarStyle).toBe(DEFAULT_AVATAR_CONFIG.avatarStyle)
      expect(result.accessoriesType).toBe(DEFAULT_AVATAR_CONFIG.accessoriesType)
      expect(result.hairColor).toBe(DEFAULT_AVATAR_CONFIG.hairColor)
      expect(result.facialHairType).toBe(DEFAULT_AVATAR_CONFIG.facialHairType)
      expect(result.facialHairColor).toBe(DEFAULT_AVATAR_CONFIG.facialHairColor)
      expect(result.clotheType).toBe(DEFAULT_AVATAR_CONFIG.clotheType)
      expect(result.clotheColor).toBe(DEFAULT_AVATAR_CONFIG.clotheColor)
      expect(result.graphicType).toBe(DEFAULT_AVATAR_CONFIG.graphicType)
      expect(result.eyeType).toBe(DEFAULT_AVATAR_CONFIG.eyeType)
      expect(result.eyebrowType).toBe(DEFAULT_AVATAR_CONFIG.eyebrowType)
      expect(result.mouthType).toBe(DEFAULT_AVATAR_CONFIG.mouthType)
      expect(result.skinColor).toBe(DEFAULT_AVATAR_CONFIG.skinColor)
    })

    it('merges multiple property overrides with defaults', () => {
      const result = createAvatarConfig({
        topType: 'LongHairBigHair',
        eyeType: 'Happy',
        mouthType: 'Smile',
      })
      expect(result.topType).toBe('LongHairBigHair')
      expect(result.eyeType).toBe('Happy')
      expect(result.mouthType).toBe('Smile')
      // Other properties should be defaults
      expect(result.avatarStyle).toBe(DEFAULT_AVATAR_CONFIG.avatarStyle)
      expect(result.skinColor).toBe(DEFAULT_AVATAR_CONFIG.skinColor)
    })

    it('merges partial config preserving all unspecified defaults', () => {
      const partial: Partial<AvatarConfig> = {
        skinColor: 'DarkBrown',
        clotheType: 'Hoodie',
      }
      const result = createAvatarConfig(partial)

      // Count how many properties match the partial
      expect(result.skinColor).toBe('DarkBrown')
      expect(result.clotheType).toBe('Hoodie')

      // All 11 other properties should match defaults
      const avatarOptionKeys = Object.keys(AVATAR_OPTIONS) as AvatarOptionKey[]
      avatarOptionKeys.forEach((key) => {
        if (!(key in partial)) {
          expect(result[key]).toBe(DEFAULT_AVATAR_CONFIG[key])
        }
      })
    })
  })

  // ============================================================================
  // Overrides work correctly for each property
  // ============================================================================

  describe('overrides work correctly for each property', () => {
    it('overrides avatarStyle correctly', () => {
      const result = createAvatarConfig({ avatarStyle: 'Transparent' })
      expect(result.avatarStyle).toBe('Transparent')
    })

    it('overrides topType correctly', () => {
      const result = createAvatarConfig({ topType: 'NoHair' })
      expect(result.topType).toBe('NoHair')
    })

    it('overrides accessoriesType correctly', () => {
      const result = createAvatarConfig({ accessoriesType: 'Sunglasses' })
      expect(result.accessoriesType).toBe('Sunglasses')
    })

    it('overrides hairColor correctly', () => {
      const result = createAvatarConfig({ hairColor: 'Auburn' })
      expect(result.hairColor).toBe('Auburn')
    })

    it('overrides facialHairType correctly', () => {
      const result = createAvatarConfig({ facialHairType: 'BeardMedium' })
      expect(result.facialHairType).toBe('BeardMedium')
    })

    it('overrides facialHairColor correctly', () => {
      const result = createAvatarConfig({ facialHairColor: 'Black' })
      expect(result.facialHairColor).toBe('Black')
    })

    it('overrides clotheType correctly', () => {
      const result = createAvatarConfig({ clotheType: 'Hoodie' })
      expect(result.clotheType).toBe('Hoodie')
    })

    it('overrides clotheColor correctly', () => {
      const result = createAvatarConfig({ clotheColor: 'Red' })
      expect(result.clotheColor).toBe('Red')
    })

    it('overrides graphicType correctly', () => {
      const result = createAvatarConfig({ graphicType: 'Pizza' })
      expect(result.graphicType).toBe('Pizza')
    })

    it('overrides eyeType correctly', () => {
      const result = createAvatarConfig({ eyeType: 'Hearts' })
      expect(result.eyeType).toBe('Hearts')
    })

    it('overrides eyebrowType correctly', () => {
      const result = createAvatarConfig({ eyebrowType: 'Angry' })
      expect(result.eyebrowType).toBe('Angry')
    })

    it('overrides mouthType correctly', () => {
      const result = createAvatarConfig({ mouthType: 'Tongue' })
      expect(result.mouthType).toBe('Tongue')
    })

    it('overrides skinColor correctly', () => {
      const result = createAvatarConfig({ skinColor: 'Tanned' })
      expect(result.skinColor).toBe('Tanned')
    })

    it('overrides all properties at once correctly', () => {
      const fullOverride: Required<AvatarConfig> = {
        avatarStyle: 'Transparent',
        topType: 'Hat',
        accessoriesType: 'Wayfarers',
        hairColor: 'Blonde',
        facialHairType: 'MoustacheFancy',
        facialHairColor: 'Auburn',
        clotheType: 'BlazerShirt',
        clotheColor: 'White',
        graphicType: 'Skull',
        eyeType: 'Wink',
        eyebrowType: 'RaisedExcited',
        mouthType: 'Twinkle',
        skinColor: 'DarkBrown',
      }
      const result = createAvatarConfig(fullOverride)
      expect(result).toEqual(fullOverride)
    })
  })

  // ============================================================================
  // Return type and immutability
  // ============================================================================

  describe('return type and immutability', () => {
    it('returns a Required<AvatarConfig> with all properties defined', () => {
      const result = createAvatarConfig()
      const avatarOptionKeys = Object.keys(AVATAR_OPTIONS) as AvatarOptionKey[]

      avatarOptionKeys.forEach((key) => {
        expect(result[key]).toBeDefined()
        expect(result[key]).not.toBeUndefined()
      })
    })

    it('returns a valid avatar config', () => {
      const result = createAvatarConfig({ topType: 'LongHairBob' })
      expect(isValidAvatarConfig(result)).toBe(true)
    })

    it('returns valid config even with full override', () => {
      const fullOverride: Required<AvatarConfig> = {
        avatarStyle: 'Circle',
        topType: 'WinterHat1',
        accessoriesType: 'Kurt',
        hairColor: 'PastelPink',
        facialHairType: 'BeardMajestic',
        facialHairColor: 'Platinum',
        clotheType: 'Overall',
        clotheColor: 'PastelGreen',
        graphicType: 'Diamond',
        eyeType: 'Dizzy',
        eyebrowType: 'UnibrowNatural',
        mouthType: 'Vomit',
        skinColor: 'Pale',
      }
      const result = createAvatarConfig(fullOverride)
      expect(isValidAvatarConfig(result)).toBe(true)
    })

    it('does not modify the input partial config', () => {
      const partial: Partial<AvatarConfig> = { topType: 'Hat' }
      const partialCopy = { ...partial }
      createAvatarConfig(partial)
      expect(partial).toEqual(partialCopy)
    })

    it('does not modify DEFAULT_AVATAR_CONFIG', () => {
      const defaultCopy = { ...DEFAULT_AVATAR_CONFIG }
      createAvatarConfig({ topType: 'Hat', skinColor: 'Black' })
      expect(DEFAULT_AVATAR_CONFIG).toEqual(defaultCopy)
    })
  })

  // ============================================================================
  // Edge cases
  // ============================================================================

  describe('edge cases', () => {
    it('handles config created with Object.create(null)', () => {
      const partial = Object.create(null) as Partial<AvatarConfig>
      partial.eyeType = 'Happy'
      const result = createAvatarConfig(partial)
      expect(result.eyeType).toBe('Happy')
      expect(result.topType).toBe(DEFAULT_AVATAR_CONFIG.topType)
    })

    it('handles frozen partial config', () => {
      const partial = Object.freeze({ mouthType: 'Smile' as const })
      const result = createAvatarConfig(partial)
      expect(result.mouthType).toBe('Smile')
    })

    it('handles sealed partial config', () => {
      const partial = Object.seal({ clotheColor: 'Pink' as const })
      const result = createAvatarConfig(partial)
      expect(result.clotheColor).toBe('Pink')
    })

    it('can be called multiple times independently', () => {
      const result1 = createAvatarConfig({ topType: 'Hat' })
      const result2 = createAvatarConfig({ topType: 'NoHair' })
      const result3 = createAvatarConfig()

      expect(result1.topType).toBe('Hat')
      expect(result2.topType).toBe('NoHair')
      expect(result3.topType).toBe(DEFAULT_AVATAR_CONFIG.topType)

      // Results should be independent objects
      expect(result1).not.toBe(result2)
      expect(result2).not.toBe(result3)
    })

    it('dynamically validates all first options work as overrides', () => {
      const avatarOptionKeys = Object.keys(AVATAR_OPTIONS) as AvatarOptionKey[]

      avatarOptionKeys.forEach((key) => {
        const firstOption = AVATAR_OPTIONS[key][0]
        const partial = { [key]: firstOption } as Partial<AvatarConfig>
        const result = createAvatarConfig(partial)
        expect(result[key]).toBe(firstOption)
      })
    })

    it('dynamically validates all last options work as overrides', () => {
      const avatarOptionKeys = Object.keys(AVATAR_OPTIONS) as AvatarOptionKey[]

      avatarOptionKeys.forEach((key) => {
        const options = AVATAR_OPTIONS[key]
        const lastOption = options[options.length - 1]
        const partial = { [key]: lastOption } as Partial<AvatarConfig>
        const result = createAvatarConfig(partial)
        expect(result[key]).toBe(lastOption)
      })
    })
  })
})
