import {
  View,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageProps,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { AvatarSize } from '@/constants/Size'

export type AvatarImageSource = ImageSourcePropType | ((props: { size: number }) => React.ReactNode)

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Image to display for the `Avatar`.
   * It accepts a standard React Native Image `source` prop
   * Or a function that returns an `Image`.
   */
  source: AvatarImageSource
  /**
   * Size of the avatar.
   */
  size?: number
  /**
   * Style for the container
   */
  style?: StyleProp<ViewStyle>
  /**
   * Invoked on load error.
   */
  onError?: ImageProps['onError']
}

const Avatar = ({ source, size = AvatarSize.default, style, onError, ...rest }: Props) => {
  const { ...restStyle } = StyleSheet.flatten(style) || {}
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        styles.container,
        restStyle,
      ]}
      {...rest}>
      {typeof source === 'function' && source({ size })}
      {typeof source !== 'function' && (
        <Image
          source={source}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          onError={onError}
          accessibilityIgnoresInvertColors></Image>
      )}
    </View>
  )
}

Avatar.displayName = 'Avatar.Image'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Avatar
