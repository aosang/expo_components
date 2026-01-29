import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitle: '组件库',
      tabBarLabelStyle: {
        fontSize: 13,
      },
    }}
    > 
      <Tabs.Screen 
        name="index" 
        options={{ title: '首页', 
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size || 24} color={color || '#000'} />
      )}}/>

      <Tabs.Screen 
        name="video" 
        options={{ title: '视频', 
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="videocam" size={size || 24} color={color || '#000'} />
      )}} />
    </Tabs>
  )
}

