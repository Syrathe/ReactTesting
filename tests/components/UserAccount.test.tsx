import { render, screen } from '@testing-library/react'
import { User } from '../../src/entities'
import UserAccount from '../../src/components/UserAccount'
import '@testing-library/jest-dom/vitest'
//3 test cases
//user name is rendered in the DOM - getbytext
//edit btn -> admin user - edit btn is shown
//edit btn -> non-admin user - edit btn is not shown - expect().not.isInTheDocument

describe('UserAccount', () => {
  it('should render user name', () => {
    const user: User = { id: 1, name: 'Alex' }
    render(<UserAccount user={user} />)
    expect(screen.getByText(user.name)).toBeInTheDocument()
  })

  it('should render Edit Btn', () => {
    const user: User = { id: 1, name: 'Alex', isAdmin: true }
    render(<UserAccount user={user} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/edit/i)
  })

  it('should not render Edit Btn', () => {
    const user: User = { id: 1, name: 'Alex', isAdmin: false }
    render(<UserAccount user={user} />)
    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })
})
