import { Tabs } from 'expo-router'

import { Colors } from '@/constants/Colors'
import VectorIcon from '@/components/VectorIcon'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.light.tabIconSelected }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <VectorIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          title: 'Create',
          tabBarIcon: ({ color }) => <VectorIcon name="add-circle-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          headerShown: false,
          title: 'Reels',
          tabBarIcon: ({ color }) => <VectorIcon name="album" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <VectorIcon name="account-circle" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
