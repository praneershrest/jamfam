import { Text, View, StyleSheet, Pressable, ScrollView, Alert, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { s } from 'react-native-size-matters'
import LottieView from 'lottie-react-native'

import { ProjectReelProps } from '@/types/Project'
import VectorIcon from '@/components/VectorIcon'
import { Colors } from '@/constants/Colors'
import ReelFooter from '@/components/ReelFooter'
import { Fonts, FontSize, FontWeight } from '@/constants/Fonts'
import * as Avatar from './Avatar'
import ProgressCircleButton from '@/components/ProgressCircleButton'
import fistbump from '@/assets/lotties/fistbump.json'

const ProjectReel = (project: ProjectReelProps) => {
  const videoRef = useRef<Video>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const animationTranslateY = useRef(new Animated.Value(0)).current
  const [msg, setMsg] = useState<string>('')
  const [isAnimationVisible, setIsAnimationVisible] = useState(false)
  const [status, setStatus] = useState<AVPlaybackStatus>()
  const isPlaying = status?.isLoaded && status.isPlaying

  const snapPoints = useMemo(() => ['50%'], [])

  useEffect(() => {
    videoRef?.current?.playAsync()
  }, [])

  const handleOnVideoPress = () => {
    if (!videoRef.current) {
      return
    }
    if (isPlaying) {
      videoRef.current.pauseAsync()
    } else {
      videoRef.current.playAsync()
    }
  }

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    [],
  )

  const handleOnPresentModalPress = () => bottomSheetRef.current?.snapToIndex(0)

  const handleOnLetsJamFam = () => {
    Alert.alert('jam sent to fam')
  }

  const handlePressIn = () => {
    setIsAnimationVisible(true)
    Animated.timing(animationTranslateY, {
      toValue: -200, // Adjust this value to set how high the animation slides up
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(animationTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsAnimationVisible(false)
    })
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={StyleSheet.absoluteFill}
        source={project.snippet}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
        isLooping
      />
      <Pressable onPress={handleOnVideoPress} style={{ flex: 1 }}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,1)']}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        {!isPlaying && (
          <View style={[StyleSheet.absoluteFill, styles.playIcon]}>
            <VectorIcon name="play-arrow" size={s(64)} color={Colors.white} />
          </View>
        )}
      </Pressable>
      <Pressable onPress={handleOnPresentModalPress}>
        <ReelFooter {...project.creator} title={project.title} />
      </Pressable>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore">
        <ScrollView>
          <View style={styles.sheet}>
            <View style={styles.section}>
              <Text style={styles.title}>{project.title}</Text>
              <Text style={styles.details}>{project.description}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>looking for</Text>
              <Text style={styles.details}>{project.needs.join(', ')}</Text>
            </View>
            <BottomSheetTextInput
              style={[styles.input, styles.section]}
              autoFocus={false}
              multiline={true}
              textAlignVertical={'top'}
              maxLength={200}
              blurOnSubmit={true}
              placeholder={"Let's jam, fam!"}
              value={msg}
              onChangeText={setMsg}
            />
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
                styles.section,
              ]}>
              <View style={styles.creator}>
                <Avatar.Image size={s(48)} source={project.creator.profilepic} />
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: s(10) }}>
                  <Text style={Fonts.default.titleMedium} numberOfLines={2}>
                    {project.creator.name}
                  </Text>
                  <Text style={Fonts.default.bodyMedium} numberOfLines={2}>
                    {project.creator.occupation}
                  </Text>
                </View>
              </View>
              <ProgressCircleButton
                radius={s(52)}
                strokeWidth={s(5)}
                showCustomText={true}
                backgroundColor={Colors.input}
                customTextStyles={Fonts.default.titleMedium}
                customText="let's jam, fam?"
                onCustomPressIn={handlePressIn}
                onCustomPressOut={handlePressOut}
                onCompleted={handleOnLetsJamFam}
              />
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
      {isAnimationVisible && (
        <Animated.View
          style={[styles.animationContainer, { transform: [{ translateY: animationTranslateY }] }]}>
          <LottieView
            source={fistbump}
            autoPlay
            loop
            speed={2.5}
            style={{ width: 400, height: 400 }}
          />
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    top: '50%',
  },
  section: {
    marginBottom: s(20),
  },
  playIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    paddingHorizontal: s(24),
    justifyContent: 'space-evenly',
  },
  title: {
    paddingBottom: s(8),
    ...Fonts.default.headlineSmall,
  },
  details: {
    ...Fonts.default.bodyMedium,
  },
  input: {
    borderRadius: s(10),
    lineHeight: s(20),
    padding: s(16),
    backgroundColor: Colors.input,
    ...Fonts.default.bodyLarge,
  },
  creator: {
    flex: 1,
    flexDirection: 'row',
  },
  animationContainer: {
    position: 'absolute',
    top: '95%',
    left: '25%',
    width: 200,
    height: 200,
    transform: [{ translateX: -100 }, { translateY: 0 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProjectReel
