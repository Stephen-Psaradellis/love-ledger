/**
 * Color Picker Component
 *
 * Displays a grid of color options for selection.
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { AttributeOption } from '../constants';

// =============================================================================
// Constants
// =============================================================================

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 0;
const GRID_GAP = 10;
const ITEMS_PER_ROW = 6;
const SWATCH_SIZE =
  (SCREEN_WIDTH - 32 - GRID_PADDING * 2 - GRID_GAP * (ITEMS_PER_ROW - 1)) /
  ITEMS_PER_ROW;

// =============================================================================
// Color Swatch Component
// =============================================================================

interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onPress: () => void;
  accessibilityLabel: string;
}

function ColorSwatch({
  color,
  isSelected,
  onPress,
  accessibilityLabel,
}: ColorSwatchProps): React.JSX.Element {
  // Determine if color is light (for checkmark contrast)
  const isLightColor = isColorLight(color);

  return (
    <TouchableOpacity
      style={[
        styles.swatch,
        { backgroundColor: color },
        isSelected && styles.swatchSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected }}
      accessibilityLabel={accessibilityLabel}
    >
      {isSelected && (
        <View style={[styles.checkmark, isLightColor && styles.checkmarkDark]}>
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={isLightColor ? '#374151' : '#FFFFFF'}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

/**
 * Determine if a color is light (for contrast)
 */
function isColorLight(hex: string): boolean {
  // Convert hex to RGB
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return true;

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5;
}

// =============================================================================
// Color Picker Component
// =============================================================================

export interface ColorPickerProps {
  /** Available color options */
  options: AttributeOption[];
  /** Currently selected value */
  selectedValue: string;
  /** Called when selection changes */
  onValueChange: (value: string) => void;
}

export function ColorPicker({
  options,
  selectedValue,
  onValueChange,
}: ColorPickerProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <ColorSwatch
          key={option.value}
          color={option.color || '#CCCCCC'}
          isSelected={selectedValue === option.value}
          onPress={() => onValueChange(option.value)}
          accessibilityLabel={option.label}
        />
      ))}
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    padding: GRID_PADDING,
  },
  swatch: {
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    borderRadius: SWATCH_SIZE / 2,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchSelected: {
    borderColor: '#6366F1',
    borderWidth: 3,
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

// =============================================================================
// Exports
// =============================================================================

export default ColorPicker;
