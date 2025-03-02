import { Stack } from 'expo-router'

const NotificationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Notification',
        }}
      />
    </Stack>
  )
}

export default NotificationLayout
