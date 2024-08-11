import React from 'react'
import { render } from '@testing-library/react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { TabBarIcon } from '@/components/TabBarIcon'

// Mocking the MaterialIcons component
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: jest
    .fn()
    .mockImplementation(({ size, style, ...props }) => (
      <div size={size} style={style} {...props} />
    )),
}))

describe('TabBarIcon', () => {
  const name = 'home'

  afterEach(() => {
    jest.clearAllMocks() // Clears the mock after each test to avoid interference
  })

  it('renders correctly with default size', () => {
    render(<TabBarIcon name={name} />)
    expect(MaterialIcons).toHaveBeenCalledTimes(1)
    expect(MaterialIcons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: name,
        size: 28, // Default size
        style: undefined,
      }),
      {},
    )
  })

  it('renders correctly with provided size and style', () => {
    const customStyle = { color: 'red', margin: 10 }
    render(<TabBarIcon name={name} size={32} style={customStyle} />)
    expect(MaterialIcons).toHaveBeenCalledTimes(1)
    expect(MaterialIcons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: name,
        size: 32,
        style: customStyle,
      }),
      {},
    )
  })

  it('passes other props correctly', () => {
    render(<TabBarIcon name="home" accessibilityLabel="icon" />)
    expect(MaterialIcons).toHaveBeenCalledTimes(1)
    expect(MaterialIcons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: name,
        size: 28,
        style: undefined,
        accessibilityLabel: 'icon',
      }),
      {},
    )
  })
})
