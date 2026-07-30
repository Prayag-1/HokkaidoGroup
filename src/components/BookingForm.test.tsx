import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { BookingForm } from './BookingForm'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('BookingForm', () => {
  it('advances from the brand step to the details step', async () => {
    const user = userEvent.setup()
    renderWithProviders(<BookingForm />)

    await user.click(screen.getByRole('button', { name: /next/i }))

    expect(screen.getByText(/step 2 of 4: details/i)).toBeInTheDocument()
    expect(await screen.findByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/party size/i)).toBeInTheDocument()
  })
})
