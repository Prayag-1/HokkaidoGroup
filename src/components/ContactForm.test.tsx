import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('ContactForm', () => {
  it('shows validation errors for missing required fields', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    expect(screen.getByText(/please select who this is for/i)).toBeInTheDocument()
    expect(screen.getByText(/please share a bit more about your inquiry/i)).toBeInTheDocument()
  })

  it('submits successfully when the form is valid', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response)

    renderWithQueryClient(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'Asha Sharma')
    await user.type(screen.getByLabelText(/email/i), 'asha@example.com')
    await user.type(screen.getByLabelText(/phone/i), '9812345678')
    await user.selectOptions(screen.getByLabelText(/brand/i), 'Hokkaido Ramen (House)')
    await user.type(screen.getByLabelText(/message/i), 'I would like to discuss a catering event for our office.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/thanks for reaching out\. we will be in touch shortly\./i)).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalled()

    fetchSpy.mockRestore()
  })
})
