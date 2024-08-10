import { Stack } from 'expo-router'

const HomeLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default HomeLayout
