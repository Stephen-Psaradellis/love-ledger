/**
 * Attribute Grid Component
 *
 * Displays a grid of options for selecting avatar attributes.
 * Handles both color selections and option grids.
 */

import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AVATAR_CATEGORIES,
  type AvatarCategory,
  type AvatarAttribute,
  type CustomAvatarConfig,
} from '../types';
import {
  getAttributeOptions,
  isColorAttribute,
  getColorValue,
  type AttributeOption,
} from '../constants';
import {
  useAvatarConfig,
  useSelectedCategory,
  useAvatarCreatorActions,
} from './AvatarCreatorContext';
import { ColorPicker } from './ColorPicker';

// =============================================================================
// Constants
// =============================================================================

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 16;
const GRID_GAP = 12;
const ITEMS_PER_ROW = 4;
const ITEM_SIZE =
  (SCREEN_WIDTH - GRID_PADDING * 2 - GRID_GAP * (ITEMS_PER_ROW - 1)) /
  ITEMS_PER_ROW;

// =============================================================================
// Attribute Section Component
// =============================================================================

interface AttributeSectionProps {
  attribute: AvatarAttribute;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

function AttributeSection({
  attribute,
  label,
  value,
  onValueChange,
}: AttributeSectionProps): React.JSX.Element {
  const options = useMemo(() => getAttributeOptions(attribute), [attribute]);
  const isColor = isColorAttribute(attribute);

  if (isColor) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{label}</Text>
        <ColorPicker
          options={options}
          selectedValue={value}
          onValueChange={onValueChange}
        />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.grid}>
        {options.map((option) => (
          <OptionItem
            key={option.value}
            option={option}
            isSelected={value === option.value}
            onPress={() => onValueChange(option.value)}
          />
        ))}
      </View>
    </View>
  );
}

// =============================================================================
// Option Item Component
// =============================================================================

interface OptionItemProps {
  option: AttributeOption;
  isSelected: boolean;
  onPress: () => void;
}

function OptionItem({
  option,
  isSelected,
  onPress,
}: OptionItemProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.optionItem, isSelected && styles.optionItemSelected]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected }}
      accessibilityLabel={option.label}
    >
      {option.color ? (
        <View
          style={[
            styles.colorSwatch,
            { backgroundColor: option.color },
            isSelected && styles.colorSwatchSelected,
          ]}
        />
      ) : (
        <View style={styles.optionPreview}>
          {/* Placeholder for future SVG previews */}
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={28}
            color={isSelected ? '#6366F1' : '#9CA3AF'}
          />
        </View>
      )}
      <Text
        style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}
        numberOfLines={2}
      >
        {option.label}
      </Text>
      {isSelected && (
        <View style={styles.checkmark}>
          <MaterialCommunityIcons name="check" size={14} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
}

// =============================================================================
// Attribute Labels
// =============================================================================

const ATTRIBUTE_LABELS: Record<AvatarAttribute, string> = {
  skinTone: 'Skin Tone',
  hairColor: 'Hair Color',
  hairStyle: 'Hair Style',
  facialHair: 'Facial Hair',
  facialHairColor: 'Facial Hair Color',
  faceShape: 'Face Shape',
  eyeShape: 'Eye Shape',
  eyeColor: 'Eye Color',
  eyebrowStyle: 'Eyebrow Style',
  noseShape: 'Nose Shape',
  mouthExpression: 'Expression',
  bodyShape: 'Body Type',
  heightCategory: 'Height',
  topType: 'Top',
  topColor: 'Top Color',
  bottomType: 'Bottom',
  bottomColor: 'Bottom Color',
  glasses: 'Glasses',
  headwear: 'Headwear',
};

// =============================================================================
// Attribute Grid Component
// =============================================================================

export interface AttributeGridProps {
  /** Override the category to show (defaults to selected) */
  category?: AvatarCategory;
}

export function AttributeGrid({
  category: categoryProp,
}: AttributeGridProps): React.JSX.Element {
  const selectedCategory = useSelectedCategory();
  const config = useAvatarConfig();
  const { setAttribute } = useAvatarCreatorActions();

  const category = categoryProp ?? selectedCategory;
  const categoryConfig = AVATAR_CATEGORIES[category];

  // Handle attribute change
  const handleAttributeChange = useCallback(
    (attribute: AvatarAttribute, value: string) => {
      setAttribute(attribute, value as CustomAvatarConfig[typeof attribute]);
    },
    [setAttribute]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {categoryConfig.attributes.map((attribute) => (
        <AttributeSection
          key={attribute}
          attribute={attribute}
          label={ATTRIBUTE_LABELS[attribute]}
          value={config[attribute] as string}
          onValueChange={(value) => handleAttributeChange(attribute, value)}
        />
      ))}

      {/* Bottom padding for safe area */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: GRID_PADDING,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  optionItem: {
    width: ITEM_SIZE,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  optionItemSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  optionPreview: {
    width: '60%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSwatch: {
    width: '60%',
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  colorSwatchSelected: {
    borderColor: '#6366F1',
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  optionLabelSelected: {
    color: '#6366F1',
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomPadding: {
    height: 40,
  },
});

// =============================================================================
// Exports
// =============================================================================

export default AttributeGrid;
