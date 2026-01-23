import { Text, View } from 'react-native'
import { useState } from 'react'
import { Button, Drawer } from '@ant-design/react-native'

const Drawers = () => {
  const [showDrawer, setShowDrawer] = useState(false)

  // 点击展示抽屉
  const handleDrawer = () => {
    setShowDrawer(true);
  }

  const sidebarContent = (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>这是侧边栏内容</Text>
      <Button onPress={() => setShowDrawer(false)}>关闭抽屉</Button>
    </View>
  )

  return (
    <Drawer
      open={showDrawer}
      onOpenChange={(isOpen) => setShowDrawer(isOpen)}
      sidebar={sidebarContent}
      position="left"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Button type="primary" onPress={handleDrawer}>打开侧边栏</Button>
      </View>
    </Drawer>

  )
}

export default Drawers

