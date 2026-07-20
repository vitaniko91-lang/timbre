// Type-only: augments Vitest's `Assertion` interface with jest-dom matchers
// (toBeInTheDocument, toHaveAttribute, toHaveAccessibleName, ...).
// Runtime matcher registration happens via the `@testing-library/jest-dom`
// side-effect import in vitest.setup.ts — this file adds no runtime code.
import '@testing-library/jest-dom/vitest'
