import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Animated,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
import { useFonts } from 'expo-font'
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
import locationIcon from '@/assets/images/location.png' // Update the path if needed
import searchIcon from '@/assets/images/search.png'
import background from '@/assets/images/background.png'

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

const WORD_LIMIT = 8 // Adjust the word limit as needed

const ProjectReel = (project: ProjectReelProps) => {
  const videoRef = useRef<Video>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const animationTranslateY = useRef(new Animated.Value(0)).current
  const [msg, setMsg] = useState<string>('')
  const [isAnimationVisible, setIsAnimationVisible] = useState(false)
  const [status, setStatus] = useState<AVPlaybackStatus>()
  const isPlaying = status?.isLoaded && status.isPlaying
  const toggleDescription = () => {
    setIsExpanded((prev) => {
      if (prev) {
        // Animate fade-out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start()
      } else {
        // Animate fade-in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      }
      return !prev
    })
  }
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

  useEffect(() => {
    videoRef?.current?.playAsync()
  }, [])

  const onConnect = () => {
    console.log('Opening BottomSheet...')
    bottomSheetRef.current?.expand() // ✅ Opens the BottomSheet
  }

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

  const [isExpanded, setIsExpanded] = useState(false) // State to toggle
  const slideAnim = useRef(new Animated.Value(0)).current // Animation value
  const fadeAnim = useRef(new Animated.Value(0)).current

  const toggleSlide = () => {
    toggleDescription()
    Animated.timing(slideAnim, {
      toValue: isExpanded ? 0 : 1, // Expand (1) or collapse (0)
      duration: 300, // Animation duration in ms
      useNativeDriver: false,
    }).start(() => setIsExpanded(!isExpanded)) // Toggle state after animation
  }

  // Interpolated height for sliding animation
  const slideHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [s(50), s(350)], // Collapsed height (100) and expanded height (300)
  })

  const truncatedDescription = project.description
    .split(' ') // Split by spaces to get individual words
    .slice(0, WORD_LIMIT) // Take only the first WORD_LIMIT words
    .join(' ') // Join them back into a string

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'transparent']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
        {/* Location Icon and Text */}
        <View style={styles.left}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.location}>Vancouver, BC</Text>
        </View>

        {/* Tabs (Explore and Friends) */}
        <View style={styles.center}>
          <Text style={styles.tabSelected}>Jam</Text>
          <Text style={styles.tab}>Fam</Text>
        </View>
        <TouchableOpacity style={styles.right}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </LinearGradient>

      {/* <Video
        ref={videoRef}
        style={StyleSheet.absoluteFill}
        source={project.snippet}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
        isLooping
      /> */}
      <Image
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        source={background}></Image>
      {/* <Pressable onPress={handleOnVideoPress} style={{ flex: 1 }}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,1)']}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        {!isPlaying && (
          <View style={[StyleSheet.absoluteFill, styles.playIcon]}>
            <VectorIcon name="play-arrow" size={s(64)} color={Colors.white} />
          </View>
        )}
      </Pressable> */}
      <View style={styles.bottomContainer}>
        <Animated.View style={[styles.container, { height: slideHeight }]}>
          <ScrollView>
            <View style={styles.sheet}>
              <View style={styles.section}>
                <Text style={styles.title}>{project.title}</Text>
                <Text style={styles.details}>
                  {isExpanded ? project.description : truncatedDescription}
                  {project.description.split(' ').length > WORD_LIMIT && !isExpanded && (
                    <Text onPress={toggleSlide} style={styles.moreButton}>
                      {' '}
                      ...more
                    </Text>
                  )}
                </Text>
                {isExpanded && (
                  <TouchableOpacity onPress={toggleSlide}>
                    <Text style={styles.lessButton}>Read Less</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Render everything below the description only if expanded */}
              <Animated.View style={[styles.fadeContainer, { opacity: fadeAnim }]}>
                (
                <>
                  <View style={styles.section}>
                    <Text style={styles.title}>Looking For</Text>
                    <Text style={styles.details}>{project.needs.join(', ')}</Text>
                  </View>
                  <TextInput
                    style={[styles.input, styles.section]}
                    autoFocus={false}
                    multiline={true}
                    textAlignVertical={'top'}
                    maxLength={200}
                    blurOnSubmit={true}
                    placeholder={"Let's jam, fam!"}
                  />
                </>
                )
              </Animated.View>
            </View>
          </ScrollView>
        </Animated.View>
        <Pressable style={styles.footerTab}>
          <ReelFooter
            {...project.creator}
            title={project.title}
            onConnect={onConnect}
            renderConnectbtn={!isExpanded}
          />
        </Pressable>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['60%']}
        enablePanDownToClose={true}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}>
        <View style={styles.bottomSheetContainer}>
          {/* Profile Image */}
          <Avatar.Image source={project.creator.profilepic} size={s(50)} />
          <Text style={styles.bottomSheetTitle}>Collaborate with {project.creator.name}</Text>

          {/* Audio Track */}
          <View style={styles.audioContainer}>
            <Image source={{ uri: project.coverImage }} style={styles.audioThumbnail} />
            <View style={styles.audioDetails}>
              <Text style={styles.audioTitle}>{project.title}</Text>
              <Text style={styles.audioMeta}>Audio - 0:00</Text>
            </View>
            <TouchableOpacity>
              <VectorIcon name="more-vert" size={s(24)} color={Colors.black} />
            </TouchableOpacity>
          </View>

          {/* Optional Message Input */}
          <Text style={styles.messageLabel}>Message (Optional)</Text>
          <TextInput
            placeholder="Ex: Hey, I was wanting to collaborate with you on this track..."
            placeholderTextColor="#888"
            style={styles.inputBottomSheet}
            value={msg}
            textAlignVertical="top"
            multiline={true}
            numberOfLines={8} // ✅ Ensures text starts from the top
            onChangeText={setMsg}
          />

          {/* Buttons */}
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send Connection Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendWithoutNote}>
            <Text style={styles.sendWithoutNoteText}>Send without Personalized Note</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column', // Ensure flex works in a column layout
  },
  bottomContainer: {
    flexGrow: 1, // Allow the bottom section to grow and push content to the bottom
    justifyContent: 'flex-end', // Align content to the bottom
  },
  footerTab: {
    paddingVertical: s(20),
    paddingBottom: s(30),
  },
  timeStamp: {
    paddingHorizontal: s(24),
    ...Fonts.default.bodyMedium,
    color: 'white',
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
    color: 'white',
  },
  moreButton: {
    color: '#fff',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  lessButton: {
    color: 'blue',
    fontSize: 14,
  },
  details: {
    ...Fonts.default.bodyMedium,
    color: 'white',
    fontSize: 14,
  },
  inputBottomSheet: {
    backgroundColor: '#F5F5F5',
    borderRadius: s(10),
    padding: s(12),
    height: s(80),
    color: '#000', // ✅ Adjust color if needed
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: s(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1, // Ensure the header stays on top
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: semi-transparent background for visibility
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: s(24),
    height: s(24),
    marginRight: s(1),
  },
  location: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },

  center: {
    position: 'absolute', // Center content horizontally and vertically
    left: 0,
    right: 0,
    top: 0,
    bottom: s(16),
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  tab: {
    color: '#888',
    fontSize: 16,
    marginHorizontal: 8,
  },
  tabSelected: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    borderBottomWidth: 1, // Simulated underline
    borderBottomColor: '#FFF',
  },
  right: {
    alignItems: 'flex-end',
  },
  searchIcon: {
    width: s(24),
    height: s(24),
  },
  fadeContainer: {
    // Style for the animated container
    width: '100%',
  },

  bottomSheetContainer: {
    padding: s(20),
    alignItems: 'center',
  },
  bottomSheetTitle: {
    fontSize: s(18),
    fontWeight: 'bold',
    marginTop: s(10),
    color: '#000',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#B3B3B3',

    backgroundColor: '#FFFFFF',
    padding: s(10),
    borderRadius: s(10),
    borderWidth: 1,
    width: '100%',
    marginTop: s(15),
  },
  audioThumbnail: {
    width: s(40),
    height: s(40),
    borderRadius: s(8),
    marginRight: s(10),
  },
  audioDetails: {
    flex: 1,
  },
  audioTitle: {
    fontSize: s(14),
    color: '#000',
    fontWeight: 'bold',
  },
  audioMeta: {
    fontSize: s(12),
    color: '#bbb',
  },
  messageLabel: {
    alignSelf: 'flex-start',
    marginTop: s(15),
    fontSize: s(14),
    color: '#000',
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    padding: s(12),
    borderRadius: s(8),
    color: '#fff',
    marginTop: s(5),
  },
  sendButton: {
    backgroundColor: '#F7931E',
    padding: s(12),
    width: '100%',
    borderRadius: s(8),
    marginTop: s(15),
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: s(14),
  },
  sendWithoutNote: {
    marginTop: s(10),
  },
  sendWithoutNoteText: {
    color: 'black',
    fontSize: s(14),
    fontWeight: 'medium',
  },
})

export default ProjectReel
