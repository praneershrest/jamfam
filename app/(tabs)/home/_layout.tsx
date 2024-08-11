import { Stack, Link } from 'expo-router'
import { Pressable } from 'react-native'

import { TabBarIcon } from '@/components/TabBarIcon'

const HomeLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => (
            // TODO: Replace with a custom component
            <Link href="/settings" asChild>
              <Pressable>
                <TabBarIcon name="settings" />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  )
}

export default HomeLayout
