import { Stack } from 'expo-router'

const CreateLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Create',
        }}
      />
    </Stack>
  )
}

export default CreateLayout
