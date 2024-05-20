import { render, screen } from '@testing-library/react'
import ProductImageGallery from '../../src/components/ProductImageGallery'
import '@testing-library/jest-dom/vitest'

describe('Product-Image-Gallery', () => {
  it('should render an empty dom when getting an empty string array', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should render a list of elements', () => {
    const imageUrls = ['url1', 'url2']
    render(<ProductImageGallery imageUrls={imageUrls} />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute('src', url)
    })
    expect(images[0]).toHaveAttribute('src', imageUrls[0])
  })
})
