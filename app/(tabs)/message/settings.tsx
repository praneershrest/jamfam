import { Text } from 'react-native'
import React from 'react'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import CustomHeader from '@/components/CustomHeader'

const Settings = () => {
  return (
    <CustomHeader title="Settings">
      <TabSafeAreaView>
        <Text>Settings</Text>
      </TabSafeAreaView>
    </CustomHeader>
  )
}

export default Settings
