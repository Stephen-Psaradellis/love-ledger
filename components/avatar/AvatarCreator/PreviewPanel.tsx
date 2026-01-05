/**
 * Preview Panel Component
 *
 * Displays a live preview of the avatar being created.
 * Includes view toggle and action buttons.
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AvatarDisplay } from '../AvatarDisplay';
import type { AvatarView } from '../types';
import {
  useAvatarConfig,
  usePreviewView,
  useCanUndo,
  useCanRedo,
  useAvatarCreatorActions,
} from './AvatarCreatorContext';

// =============================================================================
// Action Button Component
// =============================================================================

interface ActionButtonProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
  label: string;
}

function ActionButton({
  icon,
  onPress,
  disabled = false,
  label,
}: ActionButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.actionButton, disabled && styles.actionButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <MaterialCommunityIcons
        name={icon}
        size={22}
        color={disabled ? '#D1D5DB' : '#6B7280'}
      />
    </TouchableOpacity>
  );
}

// =============================================================================
// View Toggle Component
// =============================================================================

interface ViewToggleProps {
  view: AvatarView;
  onViewChange: (view: AvatarView) => void;
}

function ViewToggle({ view, onViewChange }: ViewToggleProps): React.JSX.Element {
  return (
    <View style={styles.viewToggle}>
      <TouchableOpacity
        style={[
          styles.viewToggleButton,
          view === 'portrait' && styles.viewToggleButtonActive,
        ]}
        onPress={() => onViewChange('portrait')}
        activeOpacity={0.7}
        accessibilityLabel="Portrait view"
        accessibilityRole="tab"
        accessibilityState={{ selected: view === 'portrait' }}
      >
        <MaterialCommunityIcons
          name="account-circle"
          size={20}
          color={view === 'portrait' ? '#6366F1' : '#9CA3AF'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.viewToggleButton,
          view === 'fullBody' && styles.viewToggleButtonActive,
        ]}
        onPress={() => onViewChange('fullBody')}
        activeOpacity={0.7}
        accessibilityLabel="Full body view"
        accessibilityRole="tab"
        accessibilityState={{ selected: view === 'fullBody' }}
      >
        <MaterialCommunityIcons
          name="human"
          size={20}
          color={view === 'fullBody' ? '#6366F1' : '#9CA3AF'}
        />
      </TouchableOpacity>
    </View>
  );
}

// =============================================================================
// Preview Panel Component
// =============================================================================

export interface PreviewPanelProps {
  /** Height of the preview panel */
  height?: number;
}

export function PreviewPanel({
  height = 280,
}: PreviewPanelProps): React.JSX.Element {
  const config = useAvatarConfig();
  const previewView = usePreviewView();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const { setPreviewView, undo, redo, randomize } = useAvatarCreatorActions();

  // Calculate avatar size based on view
  const avatarSize = previewView === 'portrait' ? height - 60 : (height - 60) / 2;

  return (
    <View style={[styles.container, { height }]}>
      {/* Top actions row */}
      <View style={styles.topActions}>
        <View style={styles.leftActions}>
          <ActionButton
            icon="undo"
            onPress={undo}
            disabled={!canUndo}
            label="Undo"
          />
          <ActionButton
            icon="redo"
            onPress={redo}
            disabled={!canRedo}
            label="Redo"
          />
        </View>

        <ViewToggle view={previewView} onViewChange={setPreviewView} />

        <View style={styles.rightActions}>
          <ActionButton
            icon="shuffle-variant"
            onPress={randomize}
            label="Randomize"
          />
        </View>
      </View>

      {/* Avatar preview */}
      <View style={styles.previewContainer}>
        <AvatarDisplay
          avatar={config}
          size={avatarSize}
          view={previewView}
          showLoading={false}
          testID="avatar-preview"
        />
      </View>
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#F3F4F6',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  viewToggleButton: {
    width: 36,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewToggleButtonActive: {
    backgroundColor: '#EEF2FF',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// =============================================================================
// Exports
// =============================================================================

export default PreviewPanel;
