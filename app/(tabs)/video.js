import { useVideoPlayer, VideoView } from 'expo-video'
import { StyleSheet, View } from 'react-native'

const videoSource =
  'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4';

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true
    player.muted = false
  })

  return (
    <View style={styles.contentContainer}>
      <VideoView 
        style={styles.video} 
        player={player}
        nativeControls={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  video: {
    width: '100%',
    height: 260,
    backgroundColor: '#000'
  }
})
