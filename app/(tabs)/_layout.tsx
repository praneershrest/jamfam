import { Tabs } from 'expo-router'
import { Colors } from '@/constants/Colors'
import VectorIcon from '@/components/VectorIcon'

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.light.background },
        tabBarActiveTintColor: Colors.light.tabIconSelected,
      }}>
      <Tabs.Screen
        name="reels"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <VectorIcon name="home" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <VectorIcon name="notifications" color={color} size={28} />,
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => (
            <VectorIcon name="add-box" color={Colors.add_button_orange} size={28} />
          ),
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => (
            <VectorIcon name="messenger-outline" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <VectorIcon name="account-circle" color={color} size={28} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
