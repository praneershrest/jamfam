import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

import TabSafeAreaSafeAreaView from '@/components/TabSafeAreaView'

const Messages = () => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: 'Messages' })
  }, [navigation])

  return (
    <TabSafeAreaSafeAreaView>
      <Text>Messages</Text>
    </TabSafeAreaSafeAreaView>
  )
}

export default Messages
