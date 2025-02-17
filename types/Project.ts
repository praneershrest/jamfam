import { AVPlaybackSource } from 'expo-av'
import { ImageSourcePropType } from 'react-native'

export type ProjectReelProps = {
  title: string
  description: string
  needs: string[]
  snippet: AVPlaybackSource
  creator: CreatorProps
}

export type CreatorProps = {
  name: string
  profilepic: ImageSourcePropType
  occupation?: string
}
