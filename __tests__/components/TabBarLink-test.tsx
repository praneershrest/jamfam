import React from 'react'
import { Text } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { Link } from 'expo-router'

import TabBarLink from '@/components/TabBarLink'
import { Colors } from '@/constants/Colors'

// Mocking the Link component from expo-router
jest.mock('expo-router', () => ({
  Link: jest.fn(({ href, children }) => <>{children}</>),
}))

describe('TabBarLink Component', () => {
  it('should pass the correct href to Link component', () => {
    const href = '/home/settings'
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

  it('should change color when Pressable is pressed in and revert on press out', () => {
    const { getByText } = render(
      <TabBarLink href="/home">
        <Text>Home</Text>
      </TabBarLink>,
    )

    // Simulate press in event
    fireEvent(getByText('Home'), 'pressIn')
    expect(getByText('Home').props.color).toBe(Colors.light.tabIconDefault)

    // Simulate press out event
    fireEvent(getByText('Home'), 'pressOut')
    expect(getByText('Home').props.color).toBeUndefined() // Should revert to original style
  })

  it('should render modified children when pressed', () => {
    const { getByText } = render(
      <TabBarLink href="/home/messages">
        <Text>Messages</Text>
      </TabBarLink>,
    )

    // Simulate press in to modify child
    fireEvent(getByText('Messages'), 'pressIn')
    // Check that the child is modified (color changed)
    expect(getByText('Messages').props.color).toBe(Colors.light.tabIconDefault)

    // Simulate press out to revert back
    fireEvent(getByText('Messages'), 'pressOut')
    // Check that the child reverts back to original state
    expect(getByText('Messages').props.color).toBeUndefined()
  })
})
