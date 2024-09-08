import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  Image,
  useColorScheme,
  Alert,
  Pressable,
} from 'react-native'
import { Video, Audio } from 'expo-av'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import VectorIcon from './VectorIcon'
import { ButtonSize } from '@/constants/Size'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { AttachmentType } from '@/types/attachmentType'
import { useFocusEffect } from '@react-navigation/native'
import { s } from 'react-native-size-matters'

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Custom background color for the container.
   */
  backgroundColor?: string
  /**
   * Width of the attachment container.
   */
  width?: number
  /**
   * Height of the attachment container.
   */
  height?: number
  /**
   * Border radius for the attachment container.
   */
  borderRadius?: number
  /**
   * Text to display on the button when no attachment is selected.
   */
  btnText?: string
  /**
   * Style for the attachment container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * The attachment object, which includes type and URI.
   */
  attachment: AttachmentType | null
  /**
   * Function to update the attachment state.
   */
  setAttachment: React.Dispatch<React.SetStateAction<AttachmentType | null>>
  /**
   * How the media (image or video) should be resized when rendered. Either contain or cover the container
   */
  resizeMode: string
  /**
   * The mode of the component, determining where you're using the component (e.g., 'reel', 'profile', or 'cover' (as in cover photo)).
   */
  mode: string
}

const defaultImageUri = 'https://via.placeholder.com/300x200' //TO-DO change this to whatever we decide the default image will

/**
 * Attachment is for any area where the user needs to upload files. This includes audio, video for reels, or image files for profile
 *
 * ## Usage
 *
 *      <Attachment
 *       width={'100%'}
 *       height={400}
 *       resizeMode="contain"
 *       mode="reel"
 *       attachment={attachment}
 *       btnText="Upload Profile"
 *       setAttachment={setAttachment}
 *     />
 *
 */

const Attachment = ({
  width = ButtonSize.defaultWidth,
  height = ButtonSize.defaultHeight,
  backgroundColor = Colors.white,
  borderRadius = 0,
  btnText,
  attachment,
  setAttachment,
  resizeMode = 'contain',
  mode = 'reel',
}: Props) => {
  // Controlling the video async
  const videoRef = useRef<Video>(null)
  //for light mode dark mode
  const colorScheme = useColorScheme()
  const [audioRef, setAudioRef] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const gradientColors =
    colorScheme === 'light'
      ? [Colors.buttonGradientLight.primary, Colors.buttonGradientLight.secondary]
      : [Colors.buttonGradientDark.primary, Colors.buttonGradientDark.secondary]

  const iconColor = colorScheme === 'light' ? Colors.light.icon : Colors.dark.icon
  const textColor = colorScheme === 'light' ? Colors.light.text : Colors.dark.text

  // Used just for controlling the play button based on if it's audio or a video
  const handlePlayPress = async () => {
    if (attachment.type === 'video') {
      if (isPlaying) {
        await videoRef.current.pauseAsync()
      } else {
        await videoRef.current.playAsync()
      }
    } else if (attachment.type === 'audio') {
      if (!audioRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: attachment.uri },
          { shouldPlay: false },
        )
        audioRef.current = sound
      }
      if (isPlaying) {
        await audioRef.current.pauseAsync()
      } else {
        await audioRef.current.playAsync()
      }
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    return () => {
      // When cancelling the audio upload, destroy audio component.
      if (audioRef && audioRef.current) {
        audioRef.current.unloadAsync()
      }
    }
  }, [audioRef])

  const selectAttachment = async (
    setAttachment: React.Dispatch<React.SetStateAction<AttachmentType | null>>,
    mode: string,
  ) => {
    setIsLoading(true)

    let alertOptions = []
    let msg = ''

    // Adjust the options based on the mode
    // i.e. if it's a reel, then only video and audio is allowed, if it's profile pic, then only image is allowed.
    if (mode === 'reel') {
      msg = 'Choose the type of attachment you want to add'
      alertOptions = [
        {
          text: 'Video',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Videos,
              quality: 1,
            })

            if (!result.canceled && result.assets && result.assets.length > 0) {
              const { uri, fileName } = result.assets[0]
              setAttachment({
                type: 'video',
                uri: uri,
                name: fileName || 'attachment',
              })
            } else {
              // toggle the loading screen to be off if nothing is selected
              setIsLoading(false)
            }
          },
        },
        {
          text: 'Audio',
          onPress: async () => {
            const result = await DocumentPicker.getDocumentAsync({
              type: 'audio/*',
            })
            if (!result.canceled && result.assets && result.assets.length > 0) {
              const { uri, fileName } = result.assets[0]
              setAttachment({
                type: 'audio',
                uri: uri,
                name: fileName,
              })
              const { sound } = await Audio.Sound.createAsync({ uri: uri }, { shouldPlay: false })
              setAudioRef(sound)
            } else {
              // toggle the loading screen to be off if nothing is selected
              setIsLoading(false)
            }
          },
        },
      ]
    } else if (mode === 'profile') {
      msg = 'Choose an image for your profile from the gallery?'
      alertOptions = [
        {
          text: 'Image',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            })

            if (!result.canceled && result.assets && result.assets.length > 0) {
              const { uri, fileName } = result.assets[0]
              setAttachment({
                type: 'image',
                uri: uri,
                name: fileName || 'attachment',
              })
            } else {
              // toggle the loading screen to be off if nothing is selected
              setIsLoading(false)
            }
          },
        },
      ]
    } else if (mode === 'cover') {
      msg = 'Choose the type of attachment you want to add'
      alertOptions = [
        {
          text: 'Image or Video',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              quality: 1,
            })

            if (!result.canceled && result.assets && result.assets.length > 0) {
              const { uri, type, fileName } = result.assets[0]
              setAttachment({
                type: type === 'video' ? 'video' : 'image',
                uri: uri,
                name: fileName || 'attachment',
              })
            } else {
              // toggle the loading screen to be off if nothing is selected
              setIsLoading(false)
            }
          },
        },
      ]
    }
    // For if the user decides not to select anything and presses cancel instead
    alertOptions.push({
      text: 'Cancel',
      style: 'cancel',
      onPress: async () => {
        setIsLoading(false)
      },
    })

    Alert.alert('Select Attachment', msg, alertOptions, {
      cancelable: true,
    })
  }

  // Used for when the cancel button is pressed
  const resetAttachment = async () => {
    setAttachment(null)
    setIsPlaying(false)
    setIsLoading(false)
    if (audioRef) {
      await audioRef.current.pauseAsync()
      await audioRef.current.unloadAsync()
      setAudioRef(null)
    }
  }

  // The audio and video component has a callback for when the image or video finishes uploading to the app
  const handleContentLoad = () => {
    setIsLoading(false)
  }

  // This function is triggered if a user moves to another screen, it will disable everything
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (videoRef && videoRef.current) {
          videoRef.current.pauseAsync()
        }
        if (audioRef && audioRef.current) {
          audioRef.current.pauseAsync()
        }
        setIsLoading(false)
        setIsPlaying(false)
      }
    }, [videoRef, audioRef]),
  )

  return (
    <View style={[{ width: width, height: height, backgroundColor: backgroundColor }]}>
      {!attachment ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => selectAttachment(setAttachment, mode)}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 0.8]}
            style={[{ borderRadius: borderRadius }, styles.linearGradientContainer]}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primary}
                style={styles.loadingSpinner}
              />
            ) : (
              <>
                <VectorIcon name="upload" type="MaterialIcons" color={iconColor} size={100} />
                <Text
                  style={[
                    styles.text,
                    {
                      color: textColor,
                    },
                  ]}>
                  {btnText}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.contentContainer}>
          {attachment.type === 'image' ? (
            <Image
              resizeMode={resizeMode}
              source={{ uri: attachment.uri }}
              style={[{ borderRadius: borderRadius }, styles.mediaContainer]} // Combine the inline and external styles
              onLoad={handleContentLoad}
            />
          ) : (
            <Pressable onPress={handlePlayPress} style={styles.mediaContainer}>
              {isLoading && (
                <ActivityIndicator
                  size="large"
                  color={Colors.primary}
                  style={styles.loadingSpinner}
                />
              )}
              {attachment.type === 'video' ? (
                <Video
                  ref={videoRef}
                  source={{ uri: attachment.uri }}
                  rate={1.0}
                  resizeMode={resizeMode}
                  shouldPlay={isPlaying}
                  onLoad={handleContentLoad}
                  style={[{ borderRadius: borderRadius }, styles.media]}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  source={{ uri: defaultImageUri }}
                  style={[{ borderRadius: borderRadius }, styles.media]}
                  onLoad={handleContentLoad}
                />
              )}

              {!isPlaying && (
                <View style={styles.playButton}>
                  <VectorIcon
                    name="play-circle-outline"
                    type="MaterialIcons"
                    color={Colors.white}
                    size={s(100)}
                  />
                </View>
              )}
            </Pressable>
          )}
          <TouchableOpacity style={styles.resetButton} onPress={resetAttachment}>
            <VectorIcon name="close" type="MaterialIcons" color="white" size={s(24)} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradientContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  resetButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  mediaContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
  },
  loadingSpinner: {
    position: 'absolute',
  },
})

export default Attachment
