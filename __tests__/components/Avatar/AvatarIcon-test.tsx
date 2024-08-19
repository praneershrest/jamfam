import React from 'react'
import { render } from '@testing-library/react-native'
import * as Avatar from '@/components/Avatar'
import { Colors } from '@/constants/Colors'
import invert from '@/utils/invert-color'
import { AvatarSize } from '@/constants/Size'
import VectorIcon from '@/components/VectorIcon'
import { VectorIconProps } from '@/components/VectorIcon'

// Mock the invert-color utility as a jest function
jest.mock('@/utils/invert-color', () => jest.fn())
// Mock the VectorIcon component
jest.mock('@/components/VectorIcon', () => jest.fn())

describe('Avatar Component', () => {
  const defaultProps = {
    icon: { name: 'user', type: 'FontAwesome', color: '#000' } as VectorIconProps,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default props', () => {
    ;(invert as unknown as jest.Mock).mockReturnValue('#ffffff')

    const { getByTestId } = render(<Avatar.Icon testID="avatar-container" {...defaultProps} />)

    const avatarContainer = getByTestId('avatar-container')

    expect(avatarContainer).toBeTruthy()
    expect(avatarContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: AvatarSize.default,
          height: AvatarSize.default,
          backgroundColor: Colors.light.icon,
          borderRadius: AvatarSize.default / 2,
        }),
      ]),
    )

    expect(VectorIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'user',
        type: 'FontAwesome',
        color: '#000',
        size: AvatarSize.default * 0.6,
      }),
      {},
    )
  })

  it('should apply custom size and color', () => {
    const customSize = 48
    const customColor = '#ff5733'

    const { getByTestId } = render(
      <Avatar.Icon
        testID="avatar-container"
        {...defaultProps}
        size={customSize}
        color={customColor}
      />,
    )

    const avatarContainer = getByTestId('avatar-container')

    expect(avatarContainer).toBeTruthy()
    expect(avatarContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: customSize,
          height: customSize,
          backgroundColor: customColor,
          borderRadius: customSize / 2,
        }),
      ]),
    )

    expect(VectorIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'user',
        type: 'FontAwesome',
        color: '#000',
        size: customSize * 0.6,
      }),
      {},
    )

    expect(invert).not.toHaveBeenCalled() // invert should not be called when icon color is provided
  })

  it('should apply custom container styles', () => {
    const customStyle = { borderWidth: 2, borderColor: '#ff0000' }

    const { getByTestId } = render(
      <Avatar.Icon testID="avatar-container" {...defaultProps} style={customStyle} />,
    )

    const avatarContainer = getByTestId('avatar-container')

    expect(avatarContainer.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    )
  })

  it('should apply inverted color when icon color is not provided', () => {
    const customIcon = { name: 'user', type: 'FontAwesome' } as VectorIconProps

    ;(invert as unknown as jest.Mock).mockReturnValue('#ffffff')

    render(<Avatar.Icon icon={customIcon} />)

    expect(VectorIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'user',
        type: 'FontAwesome',
        color: '#ffffff', // Color returned by invert
      }),
      {},
    )
    expect(invert).toHaveBeenCalledWith(Colors.light.icon, true)
  })
})
