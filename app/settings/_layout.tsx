import { Stack } from 'expo-router'

const SettingsLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default SettingsLayout
