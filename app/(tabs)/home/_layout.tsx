import { Stack } from 'expo-router'

import TabBarIcon from '@/components/TabBarIcon'
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
              <TabBarIcon name="settings" />
            </TabBarLink>
          ),
          headerRight: () => (
            <TabBarLink href="/home/messages">
              <TabBarIcon name="message" />
            </TabBarLink>
          ),
        }}
      />
    </Stack>
  )
}

export default HomeLayout
