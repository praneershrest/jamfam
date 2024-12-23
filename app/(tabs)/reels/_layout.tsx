import { Stack } from 'expo-router'

const ReelsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // TODO: Hide header or not? If hiding then the snippet container size should be increased
          headerShown: false,
          title: 'Reels',
        }}
      />
    </Stack>
  )
}

export default ReelsLayout
