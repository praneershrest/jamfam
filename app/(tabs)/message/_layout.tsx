import { Stack } from 'expo-router'

import { Colors } from '@/constants/Colors'
import VectorIcon from '@/components/VectorIcon'
import LinkTouchableOpacity from '@/components/LinkTouchableOpacity'

const MessageLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Message',
          headerLeft: () => (
            <LinkTouchableOpacity href="/message/settings">
              <VectorIcon name="settings" color={Colors.light.tabIconSelected} />
            </LinkTouchableOpacity>
          ),
          headerRight: () => (
            <LinkTouchableOpacity href="/message/messages">
              <VectorIcon name="message" color={Colors.light.tabIconSelected} />
            </LinkTouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}

export default MessageLayout
