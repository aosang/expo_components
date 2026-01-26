import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Provider, Theme } from '@ant-design/react-native'
import { loadAsync } from 'expo-font'
import { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'

// 创建自定义主题，添加安全区域支持
const createCustomTheme = (bottomInset) => {
  const safeBottomSpace = bottomInset || 20 // 至少20px的底部间距
  
  return {
    ...Theme,
    // ActionSheet 和 Modal 相关的样式变量
    action_sheet_item_height: 50,
    modal_button_height: 50 + safeBottomSpace,
    // 添加更多可能的变量
    fill_base: '#fff',
  }
}

function AppContent() {
  const insets = useSafeAreaInsets()
  const customTheme = createCustomTheme(insets.bottom)

  return (
    <Provider theme={customTheme}>
      <Stack 
        screenOptions={{
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: '#fff',
          }
        }}
      />
    </Provider>
  )
}

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    const loadFontAsync = async () => {
      await loadAsync({
        antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
      })
      setFontLoaded(true)
    }

    loadFontAsync()
  }, [])

  if (!fontLoaded) {
    return <Text>字体加载中...</Text>
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
