import { View, Text, ImageProps, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { s, vs, ms, mvs } from 'react-native-size-matters';

import { VectorIconProps } from './VectorIcon'
import { AvatarImageSource } from './Avatar/AvatarImage'
import * as Avatar from '@/components/Avatar'

type Props = React.ComponentPropsWithRef<typeof View> & {
  source: AvatarImageSource
  username: string
  content: string
  onError?: () => React.ReactNode;
}

const InboxMessage = ({source, username, content, ...rest}: Props) => {
  return (
    <View style={styles.container}>
      <Avatar.Image 
        source={source}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.text} numberOfLines={1}>{content}</Text>
      </View>
    </View>
  )
}

export default InboxMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    width: '85%',
    height: '100%',
    alignItems: 'center',
    padding: s(10),
  },
  image: {
    marginRight: s(10)
  },
  username: {
    fontSize: s(20),
    fontWeight: 'bold'
  },
  text: {
    flex: 1,
    fontSize: s(16)
  },
  info: {
    flexDirection: 'column'
  },
});