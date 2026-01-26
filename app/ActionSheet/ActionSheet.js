import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native"
import { Button } from "@ant-design/react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'

const ActionSheets = () => {
  const insets = useSafeAreaInsets()
  const [visible, setVisible] = useState(false)
  
  const options = [
    { text: '选项1', onPress: () => handleSelect(0) },
    { text: '选项2', onPress: () => handleSelect(1) },
    { text: '选项3', onPress: () => handleSelect(2) },
  ]
  
  const handleSelect = (index) => {
    console.log('选择了选项', index + 1)
    setVisible(false)
  }
  
  return (
    <View style={styles.container}>
      <Button type="primary" onPress={() => setVisible(true)}>
        触发动作面板（自定义版）
      </Button>
      
      {/* 自定义 ActionSheet */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View 
            style={[styles.actionSheet, { paddingBottom: insets.bottom || 20 }]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.header}>
              <Text style={styles.title}>请选择操作</Text>
              <Text style={styles.message}>这是一个动作面板</Text>
            </View>
            
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={option.onPress}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
            
            <View style={styles.divider} />
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    marginHorizontal: 'auto',
    paddingTop: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  actionSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  optionText: {
    fontSize: 16,
    color: '#108ee9',
    textAlign: 'center',
  },
  divider: {
    height: 8,
    backgroundColor: '#f5f5f5',
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
})

export default ActionSheets
