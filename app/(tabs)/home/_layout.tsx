import { Stack } from 'expo-router'

import { Colors } from '@/constants/Colors'
import VectorIcon from '@/components/VectorIcon'
import LinkTouchableOpacity from '@/components/LinkTouchableOpacity'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerLeft: () => (
            <LinkTouchableOpacity href="/home/settings">
              <VectorIcon name="settings" color={Colors.light.tabIconSelected} />
            </LinkTouchableOpacity>
          ),
          headerRight: () => (
            <LinkTouchableOpacity href="/home/messages">
              <VectorIcon name="message" color={Colors.light.tabIconSelected} />
            </LinkTouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}

export default HomeLayout
