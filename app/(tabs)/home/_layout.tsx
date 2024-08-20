import { Stack } from 'expo-router'

import { Colors } from '@/constants/Colors'
import VectorIcon from '@/components/VectorIcon'
import TabBarLink from '@/components/TabBarLink'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerLeft: () => (
            <TabBarLink href="/home/settings">
              <VectorIcon name="settings" color={Colors.light.tabIconSelected} />
            </TabBarLink>
          ),
          headerRight: () => (
            <TabBarLink href="/home/messages">
              <VectorIcon name="message" color={Colors.light.tabIconSelected} />
            </TabBarLink>
          ),
        }}
      />
    </Stack>
  )
}

export default HomeLayout
