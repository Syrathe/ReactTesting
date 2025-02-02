import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../src/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('OrderStatusSelector', () => {
  it('should render New as the default value', () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    )

    const button = screen.getByRole('combobox')
    expect(button).toHaveTextContent(/new/i)
  })

  it('should render correct statuses', async () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    )

    const button = screen.getByRole('combobox')
    const user = userEvent.setup()
    await user.click(button)

    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(3)
  })
})
