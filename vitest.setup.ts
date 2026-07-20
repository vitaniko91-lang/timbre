import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Default matchMedia (individual tests may override via vi.stubGlobal)
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {},
    addListener: () => {}, removeListener: () => {}, dispatchEvent: () => true,
  })) as unknown as typeof window.matchMedia
}

// No-op IntersectionObserver
class IO {
  observe() {} unobserve() {} disconnect() {} takeRecords() { return [] }
  root = null; rootMargin = ''; thresholds = []
}
vi.stubGlobal('IntersectionObserver', IO as unknown as typeof IntersectionObserver)
