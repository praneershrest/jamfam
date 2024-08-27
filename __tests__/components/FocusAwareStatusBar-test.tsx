import React from 'react'
import { render } from '@testing-library/react-native'
import { useIsFocused } from '@react-navigation/native'
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar'
import { View } from 'react-native'

// Mock the useIsFocused hook
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}))

describe('FocusAwareStatusBar', () => {
  it('should render StatusBar when the screen is focused', () => {
    // Mock useIsFocused to return true
    ;(useIsFocused as jest.Mock).mockReturnValue(true)

    const { getByTestId } = render(
      <View testID="focus-aware-status-bar">
        <FocusAwareStatusBar />
      </View>,
    )

    // Check if the StatusBar is rendered
    expect(getByTestId('focus-aware-status-bar').children[0]).toBeTruthy()
  })

  it('should not render StatusBar when the screen is not focused', () => {
    // Mock useIsFocused to return false
    ;(useIsFocused as jest.Mock).mockReturnValue(false)

    const { getByTestId } = render(
      <View testID="focus-aware-status-bar">
        <FocusAwareStatusBar />
      </View>,
    )

    // Check if the StatusBar is not rendered
    expect(getByTestId('focus-aware-status-bar').child).toBeUndefined()
  })
})
