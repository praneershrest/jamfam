import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import VectorIcon, { VectorIconProps } from '../VectorIcon'
import { Colors } from '@/constants/Colors'
import invert from '@/utils/invert-color'
import { AvatarSize } from '@/constants/Size'

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Icon to display for the `Avatar`.
   */
  icon: VectorIconProps
  /**
   * Size of the avatar.
   */
  size?: number
  /**
   * Custom color for the container.
   */
  color?: string
  /**
   * Style for the container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * ## Usage
 * ```
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Icon size={24} />
 * );
 * ```
 */
const Avatar = ({ icon, size = AvatarSize.default, color, style, ...rest }: Props) => {
  const backgroundColor = color ?? Colors.light.icon
  const { ...restStyle } = StyleSheet.flatten(style) || {}
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        styles.container,
        restStyle,
      ]}
      {...rest}>
      <VectorIcon
        name={icon.name}
        type={icon.type}
        color={icon.color ?? invert(backgroundColor, true)}
        size={size * 0.6}
      />
    </View>
  )
}

Avatar.displayName = 'Avatar.Icon'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Avatar
