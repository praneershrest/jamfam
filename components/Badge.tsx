import React from 'react'
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle, Image } from 'react-native'
import { s } from 'react-native-size-matters'

type BadgeProps = {
  text: string
  backgroundColor?: string
  textColor?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  icon?: any // Change to accept a valid image source
}

const Badge: React.FC<BadgeProps> = ({
  text,
  backgroundColor = '#E5D7FF',
  textColor = '#6A0DAD',
  style,
  textStyle,
  icon,
}) => {
  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <View style={styles.content}>
        {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
        <Text style={[styles.text, { color: textColor }, textStyle]}>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: s(13),
    paddingVertical: s(8),
    borderRadius: s(4),
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: s(16),
    height: s(16),
    marginRight: s(5), // Adds spacing between the icon and text
  },
  text: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
})

export default Badge
