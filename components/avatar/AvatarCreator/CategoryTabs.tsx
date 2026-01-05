/**
 * Category Tabs Component
 *
 * Horizontal scrollable tabs for avatar customization categories.
 */

import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AVATAR_CATEGORIES, type AvatarCategory } from '../types';
import {
  useSelectedCategory,
  useAvatarCreatorActions,
} from './AvatarCreatorContext';

// =============================================================================
// Constants
// =============================================================================

const CATEGORIES = Object.entries(AVATAR_CATEGORIES) as [
  AvatarCategory,
  (typeof AVATAR_CATEGORIES)[AvatarCategory]
][];

const ICON_MAP: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  face: 'face-man',
  'content-cut': 'content-cut',
  eye: 'eye',
  emoticon: 'emoticon-outline',
  human: 'human',
  'tshirt-crew': 'tshirt-crew',
  glasses: 'glasses',
};

// =============================================================================
// Tab Item Component
// =============================================================================

interface TabItemProps {
  category: AvatarCategory;
  label: string;
  icon: string;
  isSelected: boolean;
  onPress: () => void;
}

function TabItem({
  category,
  label,
  icon,
  isSelected,
  onPress,
}: TabItemProps): React.JSX.Element {
  const iconName = ICON_MAP[icon] || 'circle';

  return (
    <TouchableOpacity
      style={[styles.tab, isSelected && styles.tabSelected]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={label}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={isSelected ? '#6366F1' : '#6B7280'}
      />
      <Text style={[styles.tabLabel, isSelected && styles.tabLabelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// =============================================================================
// Category Tabs Component
// =============================================================================

export interface CategoryTabsProps {
  /** Called when category changes */
  onCategoryChange?: (category: AvatarCategory) => void;
}

export function CategoryTabs({
  onCategoryChange,
}: CategoryTabsProps): React.JSX.Element {
  const selectedCategory = useSelectedCategory();
  const { selectCategory } = useAvatarCreatorActions();
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<Map<AvatarCategory, View>>(new Map());

  // Handle tab press
  const handleTabPress = useCallback(
    (category: AvatarCategory) => {
      selectCategory(category);
      onCategoryChange?.(category);
    },
    [selectCategory, onCategoryChange]
  );

  // Scroll to selected tab
  useEffect(() => {
    const tabRef = tabRefs.current.get(selectedCategory);
    if (tabRef && scrollViewRef.current) {
      tabRef.measureLayout(
        scrollViewRef.current.getScrollableNode?.() || (scrollViewRef.current as unknown as number),
        (x) => {
          const screenWidth = Dimensions.get('window').width;
          const scrollX = Math.max(0, x - screenWidth / 2 + 50);
          scrollViewRef.current?.scrollTo({ x: scrollX, animated: true });
        },
        () => {}
      );
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map(([category, { label, icon }]) => (
          <View
            key={category}
            ref={(ref) => {
              if (ref) tabRefs.current.set(category, ref);
            }}
          >
            <TabItem
              category={category}
              label={label}
              icon={icon}
              isSelected={selectedCategory === category}
              onPress={() => handleTabPress(category)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    minWidth: 70,
  },
  tabSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
    borderWidth: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
  },
  tabLabelSelected: {
    color: '#6366F1',
    fontWeight: '600',
  },
});

// =============================================================================
// Exports
// =============================================================================

export default CategoryTabs;
