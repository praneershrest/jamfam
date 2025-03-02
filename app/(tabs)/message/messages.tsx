import { Text } from 'react-native'
import React from 'react'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import CustomHeader from '@/components/CustomHeader'

const Messages = () => {
  return (
    <CustomHeader title="Messages">
      <TabSafeAreaView>
        <Text>Messages</Text>
      </TabSafeAreaView>
    </CustomHeader>
  )
}

export default Messages
