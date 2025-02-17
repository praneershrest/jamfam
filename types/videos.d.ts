// videos
declare module '*.mp4' {
  import { AVPlaybackSource } from 'expo-av'
  const src: AVPlaybackSource
  export default src
}
