import { View, StyleSheet, Text } from "react-native"
import { Button, Modal, Portal, PaperProvider, TextInput, HelperText  } from "react-native-paper"
import { useState } from "react";

const Paper = () => {
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')

  const onOpenModal = () => {
    setVisible(true)
  }

  const onCloseModal = () => {
    setVisible(false)
  }

  const onChangeText = (text) => {
    setText(text)
  }

  const hasError = () => {
    // 手机号正则
    const phoneRxp = /^1[3-9]\d{9}$/
    return !phoneRxp.test(text)
  }

  return (
    <PaperProvider>
      <View>
        <Button 
          icon="camera" 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          buttonColor="#3F9AAE"
          textColor="#fff"
          style={styles.button}
          contentStyle={{ 
            height: 52,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          labelStyle={{
            fontSize: 18,
            fontWeight: '600'
          }}
        >
          Press me
        </Button>

        <Button 
          icon="application" 
          mode="contained" 
          onPress={onOpenModal}
          buttonColor="#FEB05D"
          textColor="#fff"
          style={styles.button}
          contentStyle={{ 
            height: 52,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          labelStyle={{
            fontSize: 18,
            fontWeight: '600'
          }}
        >
          Modal
        </Button>

        <Portal>
          <Modal visible={visible} onDismiss={onCloseModal} contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalText}>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>

        {/* 自定义边框颜色的 TextInput */}
        <TextInput
          mode="outlined"
          label="用户名"
          placeholder="请输入用户名"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          outlineStyle={styles.inputOutline}
          textColor="#333"
          placeholderTextColor="#999"
          activeOutlineColor="#3f9aae"
          outlineColor="#ccc"
        />

        {/* 扁平模式的 TextInput */}
        <TextInput
          mode="flat"
          label="邮箱"
          placeholder="请输入邮箱"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          textColor="#333"
          placeholderTextColor="#999"
          underlineColor="#ccc"
          activeUnderlineColor="#feB05d"
        />

        {/* HelperText */}
        <View>
        <TextInput mode="outlined" label="Phone" value={text} onChangeText={onChangeText} />
        <HelperText type="info" visible={hasError()}>
          Phone is invalid!
        </HelperText>
        </View>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center'
  },
  input: {
    width: 320,
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#fff'
  },
  inputOutline: {
    borderRadius: 10,
    borderWidth: 2
  }
})

export default Paper