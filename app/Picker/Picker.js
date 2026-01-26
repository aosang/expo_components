import { View, Text, StyleSheet } from 'react-native'
import { Picker, List } from '@ant-design/react-native'
import { useState, useEffect, useRef, useCallback } from 'react'

const Pickers = () => {
  const [selectedValue, setSelectedValue] = useState(['1']);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const pickerData = [
    { label: '选项 1', value: '1' },
    { label: '选项 2', value: '2' },
    { label: '选项 3', value: '3' },
    { label: '选项 4', value: '4' },
    { label: '选项 5', value: '5' },
  ];

  const handlePickerChange = useCallback((value) => {
    if (!isMounted.current || !value) return;
    
    try {
      setSelectedValue(value);
      console.log('选择了:', value);
    } catch (error) {
      console.warn('Picker onChange error:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Picker 选择器示例</Text>
      
      <List>
        <Picker
          data={pickerData}
          cols={1}
          value={selectedValue}
          onChange={handlePickerChange}
        >
          <List.Item arrow="horizontal">
            当前选择：{pickerData.find(item => item.value === selectedValue[0])?.label || '请选择'}
          </List.Item>
        </Picker>
      </List>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          已选择的值: {selectedValue[0]}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  }
});

export default Pickers