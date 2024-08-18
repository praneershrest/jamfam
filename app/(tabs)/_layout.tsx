import { Tabs } from 'expo-router'

import { Colors } from '@/constants/Colors'
import TabBarIcon from '@/components/TabBarIcon'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.light.tabIconSelected }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          title: 'Create',
          tabBarIcon: ({ color }) => <TabBarIcon name="add-circle-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          headerShown: false,
          title: 'Reels',
          tabBarIcon: ({ color }) => <TabBarIcon name="album" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="account-circle" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
