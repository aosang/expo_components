import { View, StyleSheet } from 'react-native'
import { Toast, Button, WingBlank, WhiteSpace } from '@ant-design/react-native'

const Toasts = () => {
  const successToast = () => {
    Toast.success({
      content: '这是一个轻提示',
      duration: 2,
      onClose: () => {
        console.log('轻提示关闭')
      }
    })
  }

  return (
    <WingBlank size="md">
      <WhiteSpace size="md" />
      <Button 
        type="primary" 
        onPress={successToast}
      >
        轻提示
      </Button>
    </WingBlank>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  }
})

export default Toasts