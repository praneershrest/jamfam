import { Stack } from 'expo-router'

const CreateLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Create',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default CreateLayout
