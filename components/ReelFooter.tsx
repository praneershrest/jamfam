import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { s, vs } from 'react-native-size-matters'

import { useFonts } from 'expo-font'
import VectorIcon from './VectorIcon'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import connectBtnIcon from '@/assets/images/connectBtn.png'
import person from '@/assets/images/person_image.png'

import * as Avatar from './Avatar'
import { CreatorProps } from '@/types/Project'
import Badge from './Badge'
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter'

type Props = CreatorProps & {
  title: string
  name: string
  onConnect: () => void // Define the prop type
  renderConnectbtn: boolean
}

const ReelFooter = ({
  title,
  name,
  profilepic,
  occupation = '',
  onConnect,
  renderConnectbtn,
}: Props) => {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  })

  const fadeAnim = useRef(new Animated.Value(renderConnectbtn ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: renderConnectbtn ? 1 : 0,
      duration: 300, // Adjust duration as needed
      useNativeDriver: true,
    }).start()
  }, [renderConnectbtn])

  return (
    <View style={{}}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.creator}>
            <Avatar.Image size={s(36)} source={profilepic} />
            <View style={{ justifyContent: 'center', paddingLeft: s(10), flex: 1 }}>
              <Text
                style={[
                  styles.text,
                  { fontFamily: 'Inter_600SemiBold', fontSize: 16, letterSpacing: s(-0.5) },
                ]}
                numberOfLines={1}>
                {name}
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: 'Inter_400Regular', fontSize: 12, letterSpacing: s(-0.5) },
                ]}
                numberOfLines={1}>
                {occupation}
              </Text>
            </View>
          </View>
        </View>
        <Badge
          style={{ marginTop: s(10) }}
          text="Seeking Networking"
          backgroundColor="#CDC7FF"
          textColor="#350A5F"
        />

        {renderConnectbtn && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity onPress={onConnect} style={styles.connectBtn}>
              <Image source={connectBtnIcon} style={styles.connectIcon} resizeMode="contain" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      {!renderConnectbtn && (
        <TouchableOpacity onPress={onConnect}>
          <Badge
            style={{ marginTop: s(10), width: '100%' }}
            text="Get connected"
            backgroundColor="#FFFFFF"
            textColor="#000000"
            icon={person}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: s(10),
    paddingRight: s(10),
  },
  body: {
    flex: 1,
    marginRight: s(28),
  },
  creator: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    color: Colors.white,
  },
  icon: {
    marginRight: s(24),
  },
  connectBtn: {
    width: s(40),
    height: s(40),
    marginTop: s(10),
  },
  connectBtnLarge: {
    marginLeft: s(20),
    marginRight: s(20),
    backgroundColor: 'white',
    height: s(40),
    marginTop: s(10),
  },
  connectIcon: {
    width: '100%',
    height: '100%',
  },
})

export default ReelFooter
