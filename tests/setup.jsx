import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }) => {
    return <a href={href}>{children}</a>
  },
}))

// Normalize fetch host for tests: replace localhost with 127.0.0.1
// This avoids potential IPv6 vs IPv4 resolution differences in the test
// environment that can cause ECONNREFUSED when the dev server is bound
// to IPv4. It only rewrites requests targeting localhost:3000.
if (typeof global.fetch === 'function') {
  const originalFetch = global.fetch
  global.fetch = (input, init) => {
    try {
      if (typeof input === 'string') {
        if (input.startsWith('http://localhost:3000')) {
          input = input.replace('http://localhost:3000', 'http://127.0.0.1:3000')
        }
      } else if (input instanceof URL) {
        if (input.hostname === 'localhost' && input.port === '3000') {
          const u = new URL(input.toString())
          u.hostname = '127.0.0.1'
          input = u
        }
      }
    } catch (e) {
      // ignore and fall back to original input
    }
    return originalFetch(input, init)
  }
}
