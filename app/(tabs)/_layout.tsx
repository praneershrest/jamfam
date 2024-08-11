import { Tabs } from 'expo-router'

import { Colors } from '@/constants/Colors'
import { TabBarIcon } from '@/components/TabBarIcon'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.light.tabIconSelected }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <TabBarIcon name="add-circle-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color }) => <TabBarIcon name="album" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
