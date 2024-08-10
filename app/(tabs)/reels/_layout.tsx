import { Stack } from 'expo-router'

const ReelsLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Reels',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default ReelsLayout
