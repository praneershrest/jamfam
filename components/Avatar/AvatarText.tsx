import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import invert from '@/utils/invert-color'
import { AvatarSize } from '@/constants/Size'

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Initials to show as the text in the `Avatar`.
   */
  label: string
  /**
   * Size of the avatar.
   */
  size?: number
  /**
   * Custom color for the text.
   */
  labelColor?: string
  /**
   * Style for the title.
   */
  labelStyle?: StyleProp<TextStyle>
  /*
   * Custom color for the container
   */
  backgroundColor?: string
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
 * import * as Avatar from '@/components/Avatar'
 *
 * const MyComponent = () => (
 *   <Avatar.Text size={24} label="XD" />
 * );
 * ```
 */
const Avatar = ({
  label,
  size = AvatarSize.default,
  style,
  labelColor: customLabelColor,
  labelStyle,
  backgroundColor: customBackgroundColor,
  ...rest
}: Props) => {
  /**
   * TODO: With ThemeProvider, colors (backgroundColor and textColor) should be taken with Theme context
   */
  const backgroundColor = customBackgroundColor ?? Colors.light.icon
  const textColor = customLabelColor ?? invert(backgroundColor, true)
  const { ...restStyle } = StyleSheet.flatten(style) || {}
  const { fontScale } = useWindowDimensions()
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
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: size / 2,
            lineHeight: size / fontScale,
          },
          labelStyle,
        ]}
        numberOfLines={1}>
        {label}
      </Text>
    </View>
  )
}

Avatar.displayName = 'Avatar.Text'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

export default Avatar
