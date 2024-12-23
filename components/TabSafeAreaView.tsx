import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const TabSafeAreaView = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView edges={{ top: 'off' }} style={{ flex: 1 }}>
      {children}
    </SafeAreaView>
  )
}

export default TabSafeAreaView
