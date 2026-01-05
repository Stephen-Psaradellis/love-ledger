/**
 * Avatar Creator Context
 *
 * State management for the avatar creator using Zustand.
 */

import React, { createContext, useContext, useRef, useCallback } from 'react';
import { create } from 'zustand';
import type {
  CustomAvatarConfig,
  AvatarCategory,
  AvatarAttribute,
  AvatarView,
} from '../types';
import { AVATAR_CATEGORIES } from '../types';
import { DEFAULT_AVATAR_CONFIG, generateRandomAvatarConfig } from '../../../lib/avatar/defaults';

// =============================================================================
// Store Types
// =============================================================================

interface AvatarCreatorState {
  /** Current avatar configuration */
  config: CustomAvatarConfig;
  /** Currently selected category */
  selectedCategory: AvatarCategory;
  /** Preview view type */
  previewView: AvatarView;
  /** Whether there are unsaved changes */
  isDirty: boolean;
  /** History for undo */
  history: CustomAvatarConfig[];
  /** Current position in history */
  historyIndex: number;
}

interface AvatarCreatorActions {
  /** Set a single attribute value */
  setAttribute: <K extends AvatarAttribute>(
    attribute: K,
    value: CustomAvatarConfig[K]
  ) => void;
  /** Set multiple attribute values */
  setAttributes: (updates: Partial<CustomAvatarConfig>) => void;
  /** Set the entire config */
  setConfig: (config: CustomAvatarConfig) => void;
  /** Select a category */
  selectCategory: (category: AvatarCategory) => void;
  /** Set preview view */
  setPreviewView: (view: AvatarView) => void;
  /** Randomize the avatar */
  randomize: () => void;
  /** Randomize a single category */
  randomizeCategory: (category: AvatarCategory) => void;
  /** Reset to defaults */
  reset: () => void;
  /** Undo last change */
  undo: () => void;
  /** Redo last undone change */
  redo: () => void;
  /** Mark as saved (clears dirty flag) */
  markSaved: () => void;
}

type AvatarCreatorStore = AvatarCreatorState & AvatarCreatorActions;

// =============================================================================
// Store Factory
// =============================================================================

const MAX_HISTORY = 50;

function createAvatarCreatorStore(initialConfig?: Partial<CustomAvatarConfig>) {
  return create<AvatarCreatorStore>((set, get) => ({
    // Initial state
    config: { ...DEFAULT_AVATAR_CONFIG, ...initialConfig },
    selectedCategory: 'face',
    previewView: 'portrait',
    isDirty: false,
    history: [{ ...DEFAULT_AVATAR_CONFIG, ...initialConfig }],
    historyIndex: 0,

    // Actions
    setAttribute: (attribute, value) => {
      const { config, history, historyIndex } = get();
      if (config[attribute] === value) return;

      const newConfig = { ...config, [attribute]: value };

      // Add to history (truncate future if we're not at the end)
      const newHistory = [
        ...history.slice(0, historyIndex + 1),
        newConfig,
      ].slice(-MAX_HISTORY);

      set({
        config: newConfig,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },

    setAttributes: (updates) => {
      const { config, history, historyIndex } = get();
      const newConfig = { ...config, ...updates };

      const newHistory = [
        ...history.slice(0, historyIndex + 1),
        newConfig,
      ].slice(-MAX_HISTORY);

      set({
        config: newConfig,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },

    setConfig: (config) => {
      const { history, historyIndex } = get();

      const newHistory = [
        ...history.slice(0, historyIndex + 1),
        config,
      ].slice(-MAX_HISTORY);

      set({
        config,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },

    selectCategory: (category) => {
      set({ selectedCategory: category });
    },

    setPreviewView: (view) => {
      set({ previewView: view });
    },

    randomize: () => {
      const newConfig = generateRandomAvatarConfig();
      const { history, historyIndex } = get();

      const newHistory = [
        ...history.slice(0, historyIndex + 1),
        newConfig,
      ].slice(-MAX_HISTORY);

      set({
        config: newConfig,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },

    randomizeCategory: (category) => {
      const { config, history, historyIndex } = get();
      const categoryAttrs = AVATAR_CATEGORIES[category].attributes;
      const randomConfig = generateRandomAvatarConfig();

      // Only copy attributes from the selected category
      const updates: Partial<CustomAvatarConfig> = {};
      for (const attr of categoryAttrs) {
        (updates as Record<string, unknown>)[attr] = randomConfig[attr];
      }

      const newConfig = { ...config, ...updates };
      const newHistory = [
        ...history.slice(0, historyIndex + 1),
        newConfig,
      ].slice(-MAX_HISTORY);

      set({
        config: newConfig,
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },

    reset: () => {
      const initialConfig = get().history[0];
      set({
        config: initialConfig,
        isDirty: false,
        history: [initialConfig],
        historyIndex: 0,
      });
    },

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        set({
          config: history[newIndex],
          historyIndex: newIndex,
          isDirty: newIndex > 0,
        });
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        set({
          config: history[newIndex],
          historyIndex: newIndex,
          isDirty: true,
        });
      }
    },

    markSaved: () => {
      set({ isDirty: false });
    },
  }));
}

// =============================================================================
// Context
// =============================================================================

type AvatarCreatorStoreApi = ReturnType<typeof createAvatarCreatorStore>;

const AvatarCreatorContext = createContext<AvatarCreatorStoreApi | null>(null);

// =============================================================================
// Provider
// =============================================================================

export interface AvatarCreatorProviderProps {
  /** Initial avatar configuration */
  initialConfig?: Partial<CustomAvatarConfig>;
  /** Children */
  children: React.ReactNode;
}

export function AvatarCreatorProvider({
  initialConfig,
  children,
}: AvatarCreatorProviderProps): React.JSX.Element {
  const storeRef = useRef<AvatarCreatorStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createAvatarCreatorStore(initialConfig);
  }

  return (
    <AvatarCreatorContext.Provider value={storeRef.current}>
      {children}
    </AvatarCreatorContext.Provider>
  );
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Access the avatar creator store
 */
export function useAvatarCreatorStore<T>(
  selector: (state: AvatarCreatorStore) => T
): T {
  const store = useContext(AvatarCreatorContext);
  if (!store) {
    throw new Error(
      'useAvatarCreatorStore must be used within AvatarCreatorProvider'
    );
  }
  return store(selector);
}

/**
 * Get the current avatar config
 */
export function useAvatarConfig(): CustomAvatarConfig {
  return useAvatarCreatorStore((state) => state.config);
}

/**
 * Get the selected category
 */
export function useSelectedCategory(): AvatarCategory {
  return useAvatarCreatorStore((state) => state.selectedCategory);
}

/**
 * Get the preview view
 */
export function usePreviewView(): AvatarView {
  return useAvatarCreatorStore((state) => state.previewView);
}

/**
 * Get whether there are unsaved changes
 */
export function useIsDirty(): boolean {
  return useAvatarCreatorStore((state) => state.isDirty);
}

/**
 * Get whether undo is available
 */
export function useCanUndo(): boolean {
  return useAvatarCreatorStore((state) => state.historyIndex > 0);
}

/**
 * Get whether redo is available
 */
export function useCanRedo(): boolean {
  return useAvatarCreatorStore(
    (state) => state.historyIndex < state.history.length - 1
  );
}

/**
 * Get all creator actions
 */
export function useAvatarCreatorActions(): AvatarCreatorActions {
  const store = useContext(AvatarCreatorContext);
  if (!store) {
    throw new Error(
      'useAvatarCreatorActions must be used within AvatarCreatorProvider'
    );
  }

  const state = store.getState();

  return {
    setAttribute: state.setAttribute,
    setAttributes: state.setAttributes,
    setConfig: state.setConfig,
    selectCategory: state.selectCategory,
    setPreviewView: state.setPreviewView,
    randomize: state.randomize,
    randomizeCategory: state.randomizeCategory,
    reset: state.reset,
    undo: state.undo,
    redo: state.redo,
    markSaved: state.markSaved,
  };
}

// =============================================================================
// Exports
// =============================================================================

export type { AvatarCreatorStore, AvatarCreatorState, AvatarCreatorActions };
