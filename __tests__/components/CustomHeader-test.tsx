import React from 'react'
import { render } from '@testing-library/react-native'
import CustomHeader from '@/components/CustomHeader'
import { useNavigation } from 'expo-router'
import { Text } from 'react-native'

// Mock useNavigation from expo-router
jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}))

describe('CustomHeader Component', () => {
  const mockSetOptions = jest.fn()
  const mockNavigation = { setOptions: mockSetOptions }

  beforeEach(() => {
    ;(useNavigation as jest.Mock).mockReturnValue(mockNavigation)
    mockSetOptions.mockClear()
  })

  it('should render children correctly', () => {
    const { getByText } = render(
      <CustomHeader title="Test Title">
        <Text>Test Child</Text>
      </CustomHeader>,
    )
    expect(getByText('Test Child')).toBeTruthy()
  })

  it('should set navigation options with title and additional props', () => {
    render(
      <CustomHeader
        title="Custom Title"
        headerStyle={{ backgroundColor: 'red' }}
        headerTintColor="white">
        <Text>Test Content</Text>
      </CustomHeader>,
    )
    expect(mockSetOptions).toHaveBeenCalledWith({
      title: 'Custom Title',
      headerStyle: { backgroundColor: 'red' },
      headerTintColor: 'white',
    })
  })

  it('should update navigation options when title or props change', () => {
    const { rerender } = render(
      <CustomHeader title="Initial Title" headerStyle={{ backgroundColor: 'blue' }}>
        <Text>Test Content</Text>
      </CustomHeader>,
    )
    expect(mockSetOptions).toHaveBeenCalledWith({
      title: 'Initial Title',
      headerStyle: { backgroundColor: 'blue' },
    })
    rerender(
      <CustomHeader
        title="Updated Title"
        headerStyle={{ backgroundColor: 'blue' }}
        headerTintColor="yellow">
        <Text>Test Content</Text>
      </CustomHeader>,
    )
    expect(mockSetOptions).toHaveBeenCalledWith({
      title: 'Updated Title',
      headerStyle: { backgroundColor: 'blue' },
      headerTintColor: 'yellow',
    })
  })
})
