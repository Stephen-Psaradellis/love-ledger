/**
 * Avatar Creator Component
 *
 * Full-screen avatar customization interface.
 * Combines preview, category tabs, and attribute selection.
 */

import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CustomAvatarConfig, StoredCustomAvatar } from '../types';
import { createStoredAvatar } from '../../../lib/avatar/defaults';
import {
  AvatarCreatorProvider,
  useAvatarConfig,
  useIsDirty,
  useAvatarCreatorActions,
} from './AvatarCreatorContext';
import { PreviewPanel } from './PreviewPanel';
import { CategoryTabs } from './CategoryTabs';
import { AttributeGrid } from './AttributeGrid';

// =============================================================================
// Props
// =============================================================================

export interface AvatarCreatorProps {
  /** Initial avatar configuration */
  initialConfig?: Partial<CustomAvatarConfig>;
  /** Mode: creating own avatar or describing someone */
  mode?: 'self' | 'target';
  /** Title displayed in header */
  title?: string;
  /** Subtitle/instructions */
  subtitle?: string;
  /** Called when avatar is saved */
  onComplete: (avatar: StoredCustomAvatar) => void;
  /** Called when user cancels */
  onCancel: () => void;
  /** Preview panel height */
  previewHeight?: number;
}

// =============================================================================
// Header Component
// =============================================================================

interface HeaderProps {
  title: string;
  subtitle?: string;
  onCancel: () => void;
  onSave: () => void;
  canSave: boolean;
}

function Header({
  title,
  subtitle,
  onCancel,
  onSave,
  canSave,
}: HeaderProps): React.JSX.Element {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onCancel}
        activeOpacity={0.7}
        accessibilityLabel="Cancel"
        accessibilityRole="button"
      >
        <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
      </TouchableOpacity>

      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.headerButton, styles.saveButton]}
        onPress={onSave}
        activeOpacity={0.7}
        accessibilityLabel="Save avatar"
        accessibilityRole="button"
      >
        <MaterialCommunityIcons
          name="check"
          size={24}
          color={canSave ? '#FFFFFF' : '#A5B4FC'}
        />
      </TouchableOpacity>
    </View>
  );
}

// =============================================================================
// Inner Component (with context access)
// =============================================================================

interface AvatarCreatorInnerProps {
  title: string;
  subtitle?: string;
  onComplete: (avatar: StoredCustomAvatar) => void;
  onCancel: () => void;
  previewHeight: number;
}

function AvatarCreatorInner({
  title,
  subtitle,
  onComplete,
  onCancel,
  previewHeight,
}: AvatarCreatorInnerProps): React.JSX.Element {
  const config = useAvatarConfig();
  const isDirty = useIsDirty();
  const { markSaved } = useAvatarCreatorActions();

  // Handle save
  const handleSave = useCallback(() => {
    const storedAvatar = createStoredAvatar(config);
    markSaved();
    onComplete(storedAvatar);
  }, [config, markSaved, onComplete]);

  // Handle cancel with dirty check
  const handleCancel = useCallback(() => {
    // TODO: Add confirmation dialog if isDirty
    onCancel();
  }, [onCancel, isDirty]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <Header
        title={title}
        subtitle={subtitle}
        onCancel={handleCancel}
        onSave={handleSave}
        canSave={true} // Always allow save
      />

      {/* Preview */}
      <PreviewPanel height={previewHeight} />

      {/* Category Tabs */}
      <CategoryTabs />

      {/* Attribute Selection */}
      <AttributeGrid />
    </SafeAreaView>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function AvatarCreator({
  initialConfig,
  mode = 'self',
  title,
  subtitle,
  onComplete,
  onCancel,
  previewHeight = 280,
}: AvatarCreatorProps): React.JSX.Element {
  // Default titles based on mode
  const displayTitle =
    title ??
    (mode === 'self' ? 'Create Your Avatar' : 'Describe Who You Saw');

  const displaySubtitle =
    subtitle ??
    (mode === 'self'
      ? 'Make it look like you for better matches'
      : 'Help others recognize who you\'re looking for');

  return (
    <AvatarCreatorProvider initialConfig={initialConfig}>
      <AvatarCreatorInner
        title={displayTitle}
        subtitle={displaySubtitle}
        onComplete={onComplete}
        onCancel={onCancel}
        previewHeight={previewHeight}
      />
    </AvatarCreatorProvider>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#6366F1',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
});

// =============================================================================
// Exports
// =============================================================================

export {
  AvatarCreatorProvider,
  useAvatarConfig,
  useAvatarCreatorActions,
  useSelectedCategory,
  usePreviewView,
  useIsDirty,
  useCanUndo,
  useCanRedo,
} from './AvatarCreatorContext';

export { PreviewPanel } from './PreviewPanel';
export { CategoryTabs } from './CategoryTabs';
export { AttributeGrid } from './AttributeGrid';
export { ColorPicker } from './ColorPicker';

export default AvatarCreator;
