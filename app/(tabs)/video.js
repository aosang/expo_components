import { useVideoPlayer, VideoView } from 'expo-video'
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { useState, useEffect, useCallback, memo } from 'react'
import { useEvent } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { WhiteSpace } from '@ant-design/react-native'

// 单个视频组件 - 使用 memo 优化重渲染
const VideoItem = memo(({ video, activeVideoId, onVideoPlay }) => {
  const [showPoster, setShowPoster] = useState(true)
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false)
  
  // 配置视频源，启用缓存和优化缓冲
  const videoSource = {
    uri: video.videoUrl,
    useCaching: true, // 启用缓存
  }
  
  const player = useVideoPlayer(videoSource, player => {
    player.loop = false
    player.muted = false
    // 配置缓冲选项以优化播放
    player.bufferOptions = {
      preferredForwardBufferDuration: 5,  // 预缓冲5秒
      waitsToMinimizeStalling: true,      // 自动延迟播放以减少卡顿
    }
  })

  // 监听播放状态变化
  const { isPlaying } = useEvent(player, 'playingChange', { 
    isPlaying: player.playing 
  })

  // 同步播放状态并通知父组件
  useEffect(() => {
    setIsCurrentlyPlaying(isPlaying)
    
    if (isPlaying) {
      setShowPoster(false)
      // 当视频开始播放时，立即通知父组件更新activeVideoId
      // 这样可以确保在全屏模式下播放时，状态是同步的
      onVideoPlay(video.id)
    }
  }, [isPlaying, video.id, onVideoPlay])

  // 当其他视频播放时，暂停当前视频
  useEffect(() => {
    // 只有当本视频正在播放，且激活的不是本视频时，才暂停
    // 添加 isCurrentlyPlaying 检查，避免重复暂停操作
    if (activeVideoId !== null && activeVideoId !== video.id && isCurrentlyPlaying) {
      player.pause()
    }
  }, [activeVideoId, video.id, isCurrentlyPlaying, player])

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
        // Android优化：使用textureView以获得更好的性能
        surfaceType="textureView"
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
})

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

  // 渲染单个视频项
  const renderItem = useCallback(({ item }) => (
    <VideoItem 
      video={item} 
      activeVideoId={activeVideoId}
      onVideoPlay={handleVideoPlay}
    />
  ), [activeVideoId, handleVideoPlay])

  // 提取key
  const keyExtractor = useCallback((item) => item.id.toString(), [])

  return (
    <FlatList
      data={videoList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.contentContainer}
      // 性能优化配置
      removeClippedSubviews={true}           // 移除不可见的视图
      maxToRenderPerBatch={2}                // 每批最多渲染2个
      windowSize={3}                         // 渲染窗口大小
      initialNumToRender={2}                 // 初始渲染数量
      updateCellsBatchingPeriod={50}         // 批量更新周期
      getItemLayout={(data, index) => ({     // 固定高度优化
        length: 264,
        offset: 264 * index,
        index,
      })}
    />
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
