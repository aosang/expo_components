import { useVideoPlayer, VideoView } from 'expo-video'
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import { useEvent } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { WhiteSpace } from '@ant-design/react-native'

// 单个视频组件
function VideoItem({ video, activeVideoId, onVideoPlay }) {
  const [showPoster, setShowPoster] = useState(true)
  
  const player = useVideoPlayer(video.videoUrl, player => {
    player.loop = false
    player.muted = false
  })

  // 监听播放状态变化
  const { isPlaying } = useEvent(player, 'playingChange', { 
    isPlaying: player.playing 
  })

  useEffect(() => {
    if (isPlaying) {
      setShowPoster(false)
      // 通知父组件当前视频正在播放
      onVideoPlay(video.id)
    }
  }, [isPlaying, video.id, onVideoPlay])

  // 当其他视频播放时，暂停当前视频
  useEffect(() => {
    if (activeVideoId !== null && activeVideoId !== video.id && isPlaying) {
      player.pause()
    }
  }, [activeVideoId, video.id, isPlaying, player])

  // 点击封面启动播放
  const handlePosterPress = () => {
    // 先通知父组件更新activeVideoId，再播放视频
    // 这样可以避免视频开始播放后立即被暂停
    onVideoPlay(video.id)
    player.play()
    setShowPoster(false)
  }

  return (
    <View style={styles.videoContainer}>
      <VideoView 
        style={styles.video} 
        player={player}
        nativeControls={true}
        contentFit="cover"
      />

      {showPoster && (
        <TouchableOpacity 
          style={styles.posterContainer}
          activeOpacity={0.9}
          onPress={handlePosterPress}
        >
          <Image source={{ uri: video.posterUrl }} style={styles.poster} resizeMode="cover" />
          <View style={styles.playButtonContainer}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={30} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      )}
      <WhiteSpace size="lg" />
    </View>
  )
}

export default function VideoScreen() {
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [videoList] = useState([
    {
      id: 1,
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      posterUrl: 'https://media.w3.org/2010/05/sintel/poster.png',
    },
    {
      id: 2,
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      posterUrl: 'https://vjs.zencdn.net/v/oceans.png',
    }
  ])

  // 处理视频播放，设置当前活跃视频
  const handleVideoPlay = useCallback((videoId) => {
    setActiveVideoId(videoId)
  }, [])

  return (
    <ScrollView style={styles.contentContainer}>
      {videoList.map((video) => (
        <VideoItem 
          key={video.id} 
          video={video} 
          activeVideoId={activeVideoId}
          onVideoPlay={handleVideoPlay}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  videoContainer: {
    width: '100%',
    position: 'relative',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  video: {
    width: '100%',
    height: 240,
    backgroundColor: '#000'
  },
  posterContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: '100%',
    height: 240,
    backgroundColor: '#000'
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  }
})
