import { StyleSheet, View } from 'react-native'
import { Button } from '@ant-design/react-native'
import { useRouter } from 'expo-router'

export default function App() {
  const router = useRouter();

  const goToCase = (name) => {
    router.push(`/${name}/${name}`);
  }


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button type="primary" onPress={() => goToCase('Drawer')}>抽屉效果</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button type="primary" onPress={() => goToCase('Picker')}>Picker选择器</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    // backgroundColor: '#f5f5f5',
    marginHorizontal: 'auto',
  },

  buttonContainer: {
    marginTop: 20,
  }
})