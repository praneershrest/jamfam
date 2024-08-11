import React from 'react'
import { Text } from 'react-native'
import { render } from '@testing-library/react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import TabSafeAreaSafeAreaView from '@/components/TabSafeAreaView'

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaView: jest.fn(({ children }) => <>{children}</>),
  }
})

describe('TabSafeAreaSafeAreaView Component', () => {
  it('should render children correctly', () => {
    const testMessage = 'Test Child Component'

    const { getByText } = render(
      <TabSafeAreaSafeAreaView>
        <Text>{testMessage}</Text>
      </TabSafeAreaSafeAreaView>,
    )

    // Check if the child component is rendered
    expect(getByText(testMessage)).toBeTruthy()
  })

  it('should apply correct SafeAreaView edges prop', () => {
    render(
      <TabSafeAreaSafeAreaView>
        <></>
      </TabSafeAreaSafeAreaView>,
    )

    // Check if SafeAreaView was called with correct "edges" prop
    expect(SafeAreaView).toHaveBeenCalledWith(
      expect.objectContaining({ edges: { top: 'off' } }),
      {},
    )
  })
})
