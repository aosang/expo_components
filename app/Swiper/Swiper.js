import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Carousel, WingBlank } from '@ant-design/react-native'

const { width } = Dimensions.get('window')

const SwiperPage = () => {
  const carouselData = [
    { text: '轮播图 1', color: '#3498db' },
    { text: '轮播图 2', color: '#e74c3c' },
    { text: '轮播图 3', color: '#2ecc71' }
  ]

  return (
    <View style={styles.container}>
      <WingBlank>
        <Carousel
          autoplay={false}
          infinite={false}
          style={styles.wrapper}
        >
          {carouselData.map((item, index) => (
            <View 
              key={`slide-${index}`}
              style={[styles.containerHorizontal, { backgroundColor: item.color }]}
            >
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </Carousel>
      </WingBlank>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  containerHorizontal: {
    width: width,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  }
})

export default SwiperPage
