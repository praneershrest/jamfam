import React from 'react'
import { Text } from 'react-native'
import { render } from '@testing-library/react-native'
import { Link } from 'expo-router'
import LinkTouchableOpacity from '@/components/LinkTouchableOpacity'

jest.mock('expo-router', () => ({
  Link: jest.fn(({ children }) => children),
}))

describe('LinkTouchableOpacity', () => {
  const hrefMock = '/home'
  const childrenMock = <Text testID="child">Child</Text>

  it('renders correctly', () => {
    const { getByTestId } = render(
      <LinkTouchableOpacity href={hrefMock}>{childrenMock}</LinkTouchableOpacity>,
    )
    expect(getByTestId('child')).toBeTruthy()
  })

  it('passes the correct href to Link component', () => {
    render(<LinkTouchableOpacity href={hrefMock}>{childrenMock}</LinkTouchableOpacity>)
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({ href: hrefMock, asChild: true }),
      {},
    )
  })

  it('wraps children with TouchableOpacity', () => {
    const { getByTestId } = render(
      <LinkTouchableOpacity href="/home">
        <Text>Test Child</Text>
      </LinkTouchableOpacity>,
    )
    expect(getByTestId('LinkTouchableOpacity-TouchableOpacity')).toBeTruthy()
  })
})
