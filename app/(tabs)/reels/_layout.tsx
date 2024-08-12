import { Stack } from 'expo-router'

const ReelsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Reels',
        }}
      />
    </Stack>
  )
}

export default ReelsLayout
