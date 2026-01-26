import { View, Text, StyleSheet } from 'react-native'
import { Modal, Button, WhiteSpace, WingBlank } from '@ant-design/react-native'

const Modals = () => {
  
  // 方式1：简单的 alert 弹窗
  const showAlertModal = () => {
    Modal.alert('提示', '这是一个简单的提示弹窗', [
      { text: '取消', onPress: () => console.log('取消') },
      { text: '确定', onPress: () => console.log('确定') }
    ])
  }

  // 方式2：带输入框的 prompt 弹窗
  const showPromptModal = () => {
    Modal.prompt(
      '请输入',
      '请输入您的名字',
      [
        { text: '取消' },
        { text: '提交', onPress: (value) => console.log('输入的值:', value) }
      ],
      'default',
      ''
    )
  }

  // 方式3：自定义操作弹窗
  const showOperationModal = () => {
    Modal.operation([
      { text: '选项1', onPress: () => console.log('选择了选项1') },
      { text: '选项2', onPress: () => console.log('选择了选项2') },
      { text: '选项3', onPress: () => console.log('选择了选项3') },
    ])
  }

  return (
    <View style={styles.container}>
      <WingBlank>
        <WhiteSpace size="lg" />
        <Text style={styles.title}>Modal 弹窗示例</Text>
        
        <WhiteSpace size="md" />
        <Button type="primary" onPress={showAlertModal}>
          打开 Alert 弹窗
        </Button>

        <WhiteSpace size="md" />
        <Button type="ghost" onPress={showPromptModal}>
          打开 Prompt 输入弹窗
        </Button>

        <WhiteSpace size="md" />
        <Button type="warning" onPress={showOperationModal}>
          打开操作选项弹窗
        </Button>
      </WingBlank>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
})

export default Modals