import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const TabSafeAreaView = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={{flex: 1}} edges={{ top: 'off' }}>{children}</SafeAreaView>
}

export default TabSafeAreaView
