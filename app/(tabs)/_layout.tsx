import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

/**
 * TODO:
 * Create components with styling for Bottom Tabs
 * Styling constants should be set up through a theme configuration
 */
const TEMPORARY_CONSTANTS = {
  tabBarActiveTintColor: 'blue',
  tabBarIconSize: 28,
}

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: TEMPORARY_CONSTANTS.tabBarActiveTintColor }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={TEMPORARY_CONSTANTS.tabBarIconSize} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              size={TEMPORARY_CONSTANTS.tabBarIconSize}
              name="add-circle-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={TEMPORARY_CONSTANTS.tabBarIconSize} name="album" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
