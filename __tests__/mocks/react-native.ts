/**
 * React Native Mock for Vitest
 *
 * Vitest 4.x can't parse React Native's Flow type syntax.
 * This mock provides all commonly used exports for testing.
 */

import { vi } from 'vitest'

// Core components
export const View = 'View'
export const Text = 'Text'
export const Image = 'Image'
export const TextInput = 'TextInput'
export const ScrollView = 'ScrollView'
export const FlatList = 'FlatList'
export const SectionList = 'SectionList'
export const TouchableOpacity = 'TouchableOpacity'
export const TouchableHighlight = 'TouchableHighlight'
export const TouchableWithoutFeedback = 'TouchableWithoutFeedback'
export const Pressable = 'Pressable'
export const Button = 'Button'
export const Switch = 'Switch'
export const ActivityIndicator = 'ActivityIndicator'
export const Modal = 'Modal'
export const SafeAreaView = 'SafeAreaView'
export const StatusBar = 'StatusBar'
export const KeyboardAvoidingView = 'KeyboardAvoidingView'
export const RefreshControl = 'RefreshControl'
export const VirtualizedList = 'VirtualizedList'

// StyleSheet
export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T): T => styles,
  flatten: (style: unknown) => style,
  hairlineWidth: 1,
  absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  absoluteFillObject: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  compose: (a: unknown, b: unknown) => [a, b],
}

// Platform
export const Platform = {
  OS: 'ios' as 'ios' | 'android' | 'web',
  Version: '17.0',
  isPad: false,
  isTVOS: false,
  isTV: false,
  select: <T>(obj: { ios?: T; android?: T; web?: T; default?: T }): T | undefined =>
    obj.ios ?? obj.default,
}

// Alert
export const Alert = {
  alert: vi.fn(),
  prompt: vi.fn(),
}

// Linking
export const Linking = {
  openURL: vi.fn(() => Promise.resolve()),
  canOpenURL: vi.fn(() => Promise.resolve(true)),
  addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  removeEventListener: vi.fn(),
  getInitialURL: vi.fn(() => Promise.resolve(null)),
  openSettings: vi.fn(() => Promise.resolve()),
}

// Dimensions
export const Dimensions = {
  get: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
  addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  removeEventListener: vi.fn(),
  set: vi.fn(),
}

// Animated
class AnimatedValue {
  _value: number
  constructor(val: number) {
    this._value = val
  }
  setValue(val: number) {
    this._value = val
  }
  setOffset() {}
  flattenOffset() {}
  extractOffset() {}
  addListener() {
    return ''
  }
  removeListener() {}
  removeAllListeners() {}
  stopAnimation(callback?: (value: number) => void) {
    callback?.(this._value)
  }
  resetAnimation(callback?: (value: number) => void) {
    callback?.(this._value)
  }
  interpolate() {
    return this
  }
}

export const Animated = {
  View: 'Animated.View',
  Text: 'Animated.Text',
  Image: 'Animated.Image',
  ScrollView: 'Animated.ScrollView',
  FlatList: 'Animated.FlatList',
  Value: AnimatedValue,
  ValueXY: class {
    x: AnimatedValue
    y: AnimatedValue
    constructor(config?: { x: number; y: number }) {
      this.x = new AnimatedValue(config?.x ?? 0)
      this.y = new AnimatedValue(config?.y ?? 0)
    }
    setValue() {}
    setOffset() {}
    flattenOffset() {}
    extractOffset() {}
    addListener() {
      return ''
    }
    removeListener() {}
    removeAllListeners() {}
    stopAnimation() {}
    resetAnimation() {}
    getLayout() {
      return {}
    }
    getTranslateTransform() {
      return []
    }
  },
  timing: () => ({ start: (cb?: () => void) => cb?.(), stop: vi.fn(), reset: vi.fn() }),
  spring: () => ({ start: (cb?: () => void) => cb?.(), stop: vi.fn(), reset: vi.fn() }),
  decay: () => ({ start: (cb?: () => void) => cb?.(), stop: vi.fn(), reset: vi.fn() }),
  parallel: () => ({ start: (cb?: () => void) => cb?.(), stop: vi.fn(), reset: vi.fn() }),
  sequence: () => ({ start: (cb?: () => void) => cb?.(), stop: vi.fn(), reset: vi.fn() }),
  stagger: () => ({ start: (cb?: () => void) => cb?.(), stop: vi.fn(), reset: vi.fn() }),
  loop: () => ({ start: (cb?: () => void) => cb?.(), stop: vi.fn(), reset: vi.fn() }),
  event: () => vi.fn(),
  add: () => new AnimatedValue(0),
  subtract: () => new AnimatedValue(0),
  multiply: () => new AnimatedValue(0),
  divide: () => new AnimatedValue(0),
  modulo: () => new AnimatedValue(0),
  diffClamp: () => new AnimatedValue(0),
  delay: () => ({ start: (cb?: () => void) => cb?.() }),
  createAnimatedComponent: <T>(component: T): T => component,
}

// Keyboard
export const Keyboard = {
  dismiss: vi.fn(),
  addListener: vi.fn(() => ({ remove: vi.fn() })),
  removeListener: vi.fn(),
  removeAllListeners: vi.fn(),
  isVisible: vi.fn(() => false),
  metrics: vi.fn(() => null),
}

// Appearance
export const Appearance = {
  getColorScheme: vi.fn(() => 'light'),
  addChangeListener: vi.fn(() => ({ remove: vi.fn() })),
  removeChangeListener: vi.fn(),
  setColorScheme: vi.fn(),
}

// AppState
export const AppState = {
  currentState: 'active' as 'active' | 'background' | 'inactive',
  addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  removeEventListener: vi.fn(),
  isAvailable: true,
}

// NativeModules and NativeEventEmitter
export const NativeModules = {}
export const NativeEventEmitter = vi.fn(() => ({
  addListener: vi.fn(() => ({ remove: vi.fn() })),
  removeListener: vi.fn(),
  removeAllListeners: vi.fn(),
  emit: vi.fn(),
  listenerCount: vi.fn(() => 0),
}))

// PixelRatio
export const PixelRatio = {
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (size: number) => size * 2,
  roundToNearestPixel: (size: number) => size,
}

// Hooks
export const useWindowDimensions = () => ({ width: 375, height: 812, scale: 2, fontScale: 1 })
export const useColorScheme = () => 'light'

// BackHandler (Android)
export const BackHandler = {
  exitApp: vi.fn(),
  addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  removeEventListener: vi.fn(),
}

// LayoutAnimation
export const LayoutAnimation = {
  configureNext: vi.fn(),
  create: vi.fn(),
  Types: { spring: 'spring', linear: 'linear', easeInEaseOut: 'easeInEaseOut' },
  Properties: { opacity: 'opacity', scaleXY: 'scaleXY' },
  Presets: {
    easeInEaseOut: {},
    linear: {},
    spring: {},
  },
}

// AccessibilityInfo
export const AccessibilityInfo = {
  isReduceMotionEnabled: vi.fn(() => Promise.resolve(false)),
  isScreenReaderEnabled: vi.fn(() => Promise.resolve(false)),
  addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  removeEventListener: vi.fn(),
  announceForAccessibility: vi.fn(),
}

// InteractionManager
export const InteractionManager = {
  runAfterInteractions: vi.fn((callback) => {
    callback()
    return { then: vi.fn(), done: vi.fn(), cancel: vi.fn() }
  }),
  createInteractionHandle: vi.fn(() => 1),
  clearInteractionHandle: vi.fn(),
  setDeadline: vi.fn(),
}

// Vibration
export const Vibration = {
  vibrate: vi.fn(),
  cancel: vi.fn(),
}

// Share
export const Share = {
  share: vi.fn(() => Promise.resolve({ action: 'sharedAction' })),
}

// Default export (for import React from 'react-native' style)
export default {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  Button,
  Switch,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
  VirtualizedList,
  StyleSheet,
  Platform,
  Alert,
  Linking,
  Dimensions,
  Animated,
  Keyboard,
  Appearance,
  AppState,
  NativeModules,
  NativeEventEmitter,
  PixelRatio,
  useWindowDimensions,
  useColorScheme,
  BackHandler,
  LayoutAnimation,
  AccessibilityInfo,
  InteractionManager,
  Vibration,
  Share,
}
