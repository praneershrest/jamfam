import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import * as Avatar from '@/components/Avatar'
import { AvatarSize } from '@/constants/Size'
import { Image } from 'react-native'

describe('Avatar.Image Component', () => {
  const defaultProps = {
    source: { uri: 'https://example.com/avatar.png' },
  }

  it('should render with default size and image source', () => {
    const { getByTestId } = render(<Avatar.Image testID="avatar-container" {...defaultProps} />)

    const avatarImage = getByTestId('avatar-container').children[0]

    expect(avatarImage).toBeTruthy()
    expect(avatarImage.props.source).toEqual(defaultProps.source)
    expect(avatarImage.props.style).toEqual(
      expect.objectContaining({
        width: AvatarSize.default,
        height: AvatarSize.default,
        borderRadius: AvatarSize.default / 2,
      }),
    )
  })

  it('should render with a custom size', () => {
    const customSize = 48
    const { getByTestId } = render(
      <Avatar.Image testID="avatar-container" {...defaultProps} size={customSize} />,
    )

    const avatarImage = getByTestId('avatar-container')

    expect(avatarImage).toBeTruthy()
    expect.arrayContaining([
      expect.objectContaining({
        width: customSize,
        height: customSize,
        borderRadius: customSize / 2,
      }),
    ])
  })

  it('should render with a functional source', () => {
    const mockSource = jest
      .fn()
      .mockReturnValue(<Image source={{ uri: 'https://example.com/avatar2.png' }} />)
    const { getByTestId } = render(<Avatar.Image testID="avatar-container" source={mockSource} />)

    expect(mockSource).toHaveBeenCalledWith({ size: AvatarSize.default })
    const avatarImage = getByTestId('avatar-container')
    expect(avatarImage.children[0].props.source.uri).toBe('https://example.com/avatar2.png')
  })

  it('should apply custom styles to the container', () => {
    const customStyle = { borderWidth: 2, borderColor: '#ff0000' }
    const { getByTestId } = render(
      <Avatar.Image testID="avatar-container" {...defaultProps} style={customStyle} />,
    )

    const avatarImage = getByTestId('avatar-container')
    const avatarContainer = avatarImage.parent?.parent

    expect(avatarContainer.props.style).toEqual(expect.objectContaining(customStyle))
  })

  it('should call onError callback on image load error', () => {
    const mockOnError = jest.fn()
    const { getByTestId } = render(
      <Avatar.Image testID="avatar-container" {...defaultProps} onError={mockOnError} />,
    )

    const avatarImage = getByTestId('avatar-container').children[0]
    fireEvent(avatarImage, 'error')

    expect(mockOnError).toHaveBeenCalled()
  })
})
