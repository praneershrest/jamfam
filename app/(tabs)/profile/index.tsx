import { Text } from 'react-native'
import React from 'react'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import ProfileContainer from '@/components/Profile/ProfileContainer'

const Profile = () => {
  return (
    <TabSafeAreaView>
        <ProfileContainer/>
    </TabSafeAreaView>
  )
}

export default Profile
