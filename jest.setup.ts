// Jest setup file - runs after Jest is initialized but before tests

// Import jest-dom matchers for DOM testing assertions
// This adds custom matchers like toBeInTheDocument(), toHaveClass(), etc.
import '@testing-library/jest-dom'

// Configure testing-library to auto-cleanup after each test
// This is default behavior but we explicitly configure it here
import { configure } from '@testing-library/react'

configure({
  // Recommended for async testing
  asyncUtilTimeout: 5000,
  // Show element in error messages for easier debugging
  getElementError: (message, container) => {
    const error = new Error(
      [message, container?.innerHTML].filter(Boolean).join('\n\n')
    )
    error.name = 'TestingLibraryElementError'
    return error
  },
})

// Mock window.matchMedia for components that use media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver for components that use it
class MockIntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor() {}

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

// Mock ResizeObserver for components that use it
class MockResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
})

// Suppress console errors during tests (optional - comment out if you want to see them)
// This helps keep test output clean while still catching actual test failures
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    // Filter out React act() warnings and other known noise
    const message = args[0]?.toString() || ''
    if (
      message.includes('Warning: ReactDOM.render is no longer supported') ||
      message.includes('Warning: An update to') ||
      message.includes('act(')
    ) {
      return
    }
    originalError.apply(console, args)
  }
})

afterAll(() => {
  console.error = originalError
})
