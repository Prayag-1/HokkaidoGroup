import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { FranchiseCard } from './FranchiseCard'
afterEach(cleanup)
it('opens the franchise website directly in a protected new tab', () => {
  render(<FranchiseCard franchise={{ name: 'Test location', brand: 'Test brand', location: 'Test city', description: 'Test description', image: '/test-image.webp', websiteUrl: 'https://example.com/franchise' }} />)
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', 'https://example.com/franchise')
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noopener noreferrer')
})
