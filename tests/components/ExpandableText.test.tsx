import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event'

describe('ExpandableText', () => {
  const limit = 255
  const longText = 'a'.repeat(limit + 1)
  const truncatedText = longText.substring(0, limit) + '...'

  it('should render the full text if under 255 chars', () => {
    const text = 'Short text'
    render(<ExpandableText text={text} />)

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('should truncate text if over 255 chars', () => {
    render(<ExpandableText text={longText} />)

    expect(screen.getByText(truncatedText)).toBeInTheDocument()
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(/more/i)
  })

  it('should expand text when show more btn is clicked', async () => {
    render(<ExpandableText text={longText} />)

    const button = screen.getByRole('button')
    const user = userEvent.setup()
    await user.click(button)

    //Assert
    expect(screen.getByText(longText)).toBeInTheDocument
    expect(button).toHaveTextContent(/less/i)
  })

  it('should collapse text when show less btn is clicked', async () => {
    render(<ExpandableText text={longText} />)
    const showMoreButton = screen.getByRole('button', { name: /more/i })
    const user = userEvent.setup()
    await user.click(showMoreButton)

    const showLessButton = screen.getByRole('button', { name: /less/i })
    await user.click(showLessButton)

    //Assert
    expect(screen.getByText(truncatedText)).toBeInTheDocument
    expect(showMoreButton).toHaveTextContent(/more/i)
  })
})
