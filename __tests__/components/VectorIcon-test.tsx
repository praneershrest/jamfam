import React from 'react'
import { render } from '@testing-library/react-native'
import VectorIcon, { VectorIconProps } from '@/components/VectorIcon'
import { Colors } from '@/constants/Colors'
import { VectorIconSize } from '@/constants/Size'

// Mocking all icon imports
jest.mock('@expo/vector-icons/AntDesign', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/Entypo', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/EvilIcons', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/Feather', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/FontAwesome', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/FontAwesome5', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/FontAwesome6', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/Fontisto', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/Foundation', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/Ionicons', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/MaterialIcons', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/Octicons', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/SimpleLineIcons', () => ({ default: jest.fn(() => null) }))
jest.mock('@expo/vector-icons/Zocial', () => ({ default: jest.fn(() => null) }))

describe('VectorIcon Component', () => {
  const defaultProps: VectorIconProps = {
    name: 'user',
  }

  it.each`
    type                        | mockedIcon
    ${'AntDesign'}              | ${require('@expo/vector-icons/AntDesign').default}
    ${'Entypo'}                 | ${require('@expo/vector-icons/Entypo').default}
    ${'EvilIcons'}              | ${require('@expo/vector-icons/EvilIcons').default}
    ${'Feather'}                | ${require('@expo/vector-icons/Feather').default}
    ${'FontAwesome'}            | ${require('@expo/vector-icons/FontAwesome').default}
    ${'FontAwesome5'}           | ${require('@expo/vector-icons/FontAwesome5').default}
    ${'FontAwesome6'}           | ${require('@expo/vector-icons/FontAwesome6').default}
    ${'Fontisto'}               | ${require('@expo/vector-icons/Fontisto').default}
    ${'Foundation'}             | ${require('@expo/vector-icons/Foundation').default}
    ${'Ionicons'}               | ${require('@expo/vector-icons/Ionicons').default}
    ${'MaterialCommunityIcons'} | ${require('@expo/vector-icons/MaterialCommunityIcons').default}
    ${'MaterialIcons'}          | ${require('@expo/vector-icons/MaterialIcons').default}
    ${'Octicons'}               | ${require('@expo/vector-icons/Octicons').default}
    ${'SimpleLineIcons'}        | ${require('@expo/vector-icons/SimpleLineIcons').default}
    ${'Zocial'}                 | ${require('@expo/vector-icons/Zocial').default}
  `('renders $type icon correctly', ({ type, mockedIcon }) => {
    render(<VectorIcon {...defaultProps} type={type} />)
    expect(mockedIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'user',
        size: VectorIconSize.default,
        color: Colors.light.icon,
      }),
      {},
    )
  })

  it('renders with default props', () => {
    const MaterialIcons = require('@expo/vector-icons/MaterialIcons').default
    render(<VectorIcon {...defaultProps} />)
    expect(MaterialIcons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'user',
        size: VectorIconSize.default,
        color: Colors.light.icon,
      }),
      {},
    )
  })

  it('renders with custom size and color', () => {
    const customProps: VectorIconProps = {
      name: 'user',
      size: 32,
      color: '#ff0000',
    }
    const MaterialIcons = require('@expo/vector-icons/MaterialIcons').default
    render(<VectorIcon {...customProps} />)
    expect(MaterialIcons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'user',
        size: 32,
        color: '#ff0000',
      }),
      {},
    )
  })

  it('renders with invalid type using default MaterialIcons', () => {
    const MaterialIcons = require('@expo/vector-icons/MaterialIcons').default
    render(<VectorIcon {...defaultProps} type={'InvalidType' as any} />)
    expect(MaterialIcons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'user',
        size: VectorIconSize.default,
        color: Colors.light.icon,
      }),
      {},
    )
  })
})
