import React from 'react'
import { render } from '@testing-library/react-native'
import * as Avatar from '@/components/Avatar'
import { Colors } from '@/constants/Colors'
import invert from '@/utils/invert-color'
import { AvatarSize } from '@/constants/Size'
import { TextStyle } from 'react-native'

// Mock the invert-color utility as a jest function
jest.mock('@/utils/invert-color', () => jest.fn())

describe('Avatar Component', () => {
  const defaultProps = {
    label: 'JD',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default props', () => {
    const { getByText } = render(<Avatar.Text {...defaultProps} />)

    const avatarText = getByText('JD')
    const avatarContainer = avatarText.parent.parent

    expect(avatarContainer).toBeTruthy()
    expect(avatarText).toBeTruthy()
    expect(avatarContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: AvatarSize.default,
          height: AvatarSize.default,
          backgroundColor: Colors.light.icon,
        }),
      ]),
    )
    expect(invert).toHaveBeenCalledWith(Colors.light.icon, true)
  })

  it('should apply custom size and background color', () => {
    const customSize = 48
    const customBackgroundColor = '#000000'

    // Here, we properly mock the return value of the invert function
    ;(invert as unknown as jest.Mock).mockReturnValue('#ffffff')

    const { getByText } = render(
      <Avatar.Text {...defaultProps} size={customSize} backgroundColor={customBackgroundColor} />,
    )

    const avatarText = getByText('JD')
    const avatarContainer = avatarText.parent.parent

    expect(avatarContainer).toBeTruthy()
    expect(avatarText).toBeTruthy()
    expect(avatarContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: customSize,
          height: customSize,
          backgroundColor: customBackgroundColor,
        }),
      ]),
    )
    expect(invert).toHaveBeenCalledWith(customBackgroundColor, true)
    expect(avatarText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: '#ffffff',
          fontSize: customSize / 2,
        }),
      ]),
    )
  })

  it('should apply custom label color', () => {
    const customLabelColor = '#123456'

    const { getByText } = render(<Avatar.Text {...defaultProps} labelColor={customLabelColor} />)

    const avatarText = getByText('JD')

    expect(avatarText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: customLabelColor,
        }),
      ]),
    )
    expect(invert).not.toHaveBeenCalled() // invert should not be called when labelColor is provided
  })

  it('should apply custom styles for container and label', () => {
    const customContainerStyle = { borderWidth: 2, borderColor: '#ff0000' }
    const customLabelStyle: TextStyle = { fontWeight: 'bold' }

    const { getByText } = render(
      <Avatar.Text {...defaultProps} style={customContainerStyle} labelStyle={customLabelStyle} />,
    )

    const avatarText = getByText('JD')
    const avatarContainer = avatarText.parent.parent

    expect(avatarContainer.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customContainerStyle)]),
    )
    expect(avatarText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customLabelStyle)]),
    )
  })
})
