import React, { useState, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useFonts } from 'expo-font'
import locationIcon from '@/assets/images/location.png' // Update the path if needed
import searchIcon from '@/assets/images/Search.png'
import background_template from '@/assets/images/background.png'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { s } from 'react-native-size-matters'
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

export default function AudioPostScreen() {
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
  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0) // Opens to the first snap point
  }

  const bottomSheetRef = useRef(null)

  const [isExpanded, setIsExpanded] = useState(false)

  if (!fontsLoaded) {
    return null // Wait for fonts to load
  }

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <View style={styles.container}>
      {/* Background Image */}
      {/* Header */}
      <View style={styles.header}>
        {/* Location Icon and Text */}
        <View style={styles.left}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.location}>Vancouver, BC</Text>
        </View>

        {/* Tabs (Explore and Friends) */}
        <View style={styles.center}>
          <Text style={styles.tabSelected}>Explore</Text>
          <Text style={styles.tab}>Friends</Text>
        </View>
        <TouchableOpacity onPress={handleOpenBottomSheet}>
          <Text style={{ color: 'blue' }}>Open BottomSheet</Text>
        </TouchableOpacity>
        {/* Search Icon */}
        <TouchableOpacity style={styles.right}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {/* Audio Waveform Placeholder */}
      <View style={styles.waveform}>
        <Text style={styles.waveformText}>Audio Waveform Placeholder</Text>
      </View>

      {/* User Info */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[200]} // Define appropriate snap points
        handleIndicatorStyle={{ backgroundColor: 'gray' }}
        enablePanDownToClose={true}
        keyboardBehavior="interactive">
        {/* Post Content */}
        <View style={styles.content}>
          <Text style={styles.timer}>0:10/0:55</Text>
          <Text style={styles.title}>This Is How I Disappear</Text>
          <Text style={styles.description} numberOfLines={isExpanded ? 0 : 2} ellipsizeMode="tail">
            I've been noodling around on my guitar and stumbled onto this riff that I think could be
            something cool. 🎸 It’s got a chill, emotional feel, but I’m still shaping it into
            something more polished.
            {isExpanded && (
              <>
                {'\n\n'}Would love to hear what you think—does it flow? Does it feel complete, or is
                something missing? 🙇‍♂️ Be brutally honest (but also nice, lol).
                {'\n\n'}Drop your thoughts below, and thanks for listening! 🙏✨
              </>
            )}
          </Text>
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.moreText}>{isExpanded ? 'less' : 'more'}</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Replace with profile picture
            style={styles.profilePicture}
          />
          <View>
            <Text style={styles.username}>Ian Dooley</Text>
            <Text style={styles.role}>Guitarist • Songwriter</Text>
          </View>
          <TouchableOpacity style={styles.feedbackButton}>
            <Text style={styles.feedbackText}>Seeking Feedback</Text>
          </TouchableOpacity>
        </View>
        {/* Actions */}
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectText}>Get Connected</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background for visibility
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: s(20),
    height: s(20),
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
    marginHorizontal: 8,
  },
  right: {
    alignItems: 'flex-end',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  scrollContainer: {
    marginTop: 120, // Allow space for the header, adjust as needed
    paddingHorizontal: 16,
  },
  waveform: {
    marginVertical: 16,
  },
  waveformText: {
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    paddingBottom: 16,
  },
  timer: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  moreText: {
    color: '#ff8c00',
    fontSize: 14,
    marginTop: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    color: '#888',
    fontSize: 14,
  },
  feedbackButton: {
    backgroundColor: '#444',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 'auto',
  },
  feedbackText: {
    color: '#ff8c00',
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: '#ff8c00',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 16,
  },
  connectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
