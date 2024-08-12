import React from 'react'
import { Text } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { Link } from 'expo-router'

import TabBarLink from '@/components/TabBarLink'

jest.mock('expo-router', () => ({
  Link: jest.fn(({ href, children }) => <>{children}</>),
}))

describe('TabBarLink Component', () => {
  it('should pass the correct href to Link component', () => {
    const href = '/settings'
    render(
      <TabBarLink href={href}>
        <Text>Settings</Text>
      </TabBarLink>,
    )
    expect(Link).toHaveBeenCalledWith(expect.objectContaining({ href }), {})
  })

  it('should trigger onPress when Pressable is pressed', () => {
    const mockOnPress = jest.fn()
    const { getByText } = render(
      <TabBarLink href="/home">
        <Text onPress={mockOnPress}>Home</Text>
      </TabBarLink>,
    )
    // Simulate press event
    fireEvent.press(getByText('Home'))
    // Ensure that the onPress handler is called
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('should render children inside Pressable component', () => {
    const { getByText } = render(
      <TabBarLink href="/reels">
        <Text>Reels</Text>
      </TabBarLink>,
    )
    // Check if the children are rendered inside the Pressable component
    expect(getByText('Reels')).toBeTruthy()
  })
})
