import { Text } from 'react-native'
import React from 'react'

import TabSafeAreaSafeAreaView from '@/components/TabSafeAreaView'
import CustomHeader from '@/components/CustomHeader'

const Settings = () => {
  return (
    <CustomHeader title="Settings">
      <TabSafeAreaSafeAreaView>
        <Text>Settings</Text>
      </TabSafeAreaSafeAreaView>
    </CustomHeader>
  )
}

export default Settings
