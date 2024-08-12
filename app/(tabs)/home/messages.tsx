import { Text } from 'react-native'
import React from 'react'

import TabSafeAreaSafeAreaView from '@/components/TabSafeAreaView'
import CustomHeader from '@/components/CustomHeader'

const Messages = () => {
  return (
    <CustomHeader title="Messages">
      <TabSafeAreaSafeAreaView>
        <Text>Messages</Text>
      </TabSafeAreaSafeAreaView>
    </CustomHeader>
  )
}

export default Messages
