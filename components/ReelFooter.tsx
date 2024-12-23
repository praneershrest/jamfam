import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { s, vs } from 'react-native-size-matters'

import VectorIcon from './VectorIcon'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import * as Avatar from './Avatar'
import { CreatorProps } from '@/types/Project'

type Props = CreatorProps & {
  title: string
  name: string
}

const ReelFooter = ({ title, name, profilepic, occupation = '' }: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.creator}>
            <Avatar.Image size={s(36)} source={profilepic} />
            <View style={{ justifyContent: 'center', paddingLeft: s(10), flex: 1 }}>
              <Text style={[styles.text, Fonts.default.labelLarge]} numberOfLines={1}>
                {name}
              </Text>
              <Text style={[styles.text, Fonts.default.labelSmall]} numberOfLines={1}>
                {occupation}
              </Text>
            </View>
          </View>
          <Text style={[styles.text, Fonts.default.titleMedium, styles.title]} numberOfLines={2}>
            {title}
          </Text>
        </View>
        <VectorIcon style={styles.icon} name="angles-up" type="FontAwesome6" color={Colors.white} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: s(10),
  },
  body: {
    flex: 1,
    marginRight: s(28),
  },
  creator: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    paddingVertical: vs(10),
  },
  text: {
    color: Colors.white,
  },
  icon: {
    marginRight: s(24),
  },
})

export default ReelFooter
