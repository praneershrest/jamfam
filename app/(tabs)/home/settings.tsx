import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

import TabSafeAreaSafeAreaView from '@/components/TabSafeAreaView'

const Settings = () => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: 'Settings' })
  }, [navigation])

  return (
    <TabSafeAreaSafeAreaView>
      <Text>Settings</Text>
    </TabSafeAreaSafeAreaView>
  )
}

export default Settings
