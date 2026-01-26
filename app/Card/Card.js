import { View, Text, StyleSheet } from 'react-native'
import { Card, WingBlank, WhiteSpace } from '@ant-design/react-native'

const Cards = () => {
  return (
    <View>
      <WingBlank size='md'>
        <WhiteSpace size='md' />
        <Card>
          <Card.Header
            title="卡片标题"
            thumbStyle={{ width: 24, height: 24, borderRadius: 12 }}
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
          />
          <Card.Body style={styles.cardBody}>
            <Text>卡片内容</Text>
          </Card.Body>
          <Card.Footer content="底部内容" extra="更多" />
        </Card>  
      </WingBlank>
    </View>
  )
}

const styles = StyleSheet.create({
  cardBody: {
    padding: 15,
  },

  cardMargin: {
    marginTop: 15
  }
})

export default Cards