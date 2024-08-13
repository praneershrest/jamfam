import React from 'react'
import { Text } from 'react-native'
import { render } from '@testing-library/react-native'
import { Link } from 'expo-router'
import TabBarLink from '@/components/TabBarLink'

jest.mock('expo-router', () => ({
  Link: jest.fn(({ children }) => children),
}))

describe('TabBarLink', () => {
  const hrefMock = '/home'
  const childrenMock = <Text testID="child">Child</Text>

  it('renders correctly', () => {
    const { getByTestId } = render(<TabBarLink href={hrefMock}>{childrenMock}</TabBarLink>)
    expect(getByTestId('child')).toBeTruthy()
  })

  it('passes the correct href to Link component', () => {
    render(<TabBarLink href={hrefMock}>{childrenMock}</TabBarLink>)
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({ href: hrefMock, asChild: true }),
      {},
    )
  })

  it('wraps children with TouchableOpacity', () => {
    const { getByTestId } = render(
      <TabBarLink href="/home">
        <Text>Test Child</Text>
      </TabBarLink>,
    )
    expect(getByTestId('TabBarLink-TouchableOpacity')).toBeTruthy()
  })
})
