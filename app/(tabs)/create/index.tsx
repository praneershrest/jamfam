import React, { useCallback, useEffect, useRef, useState } from 'react'
import TabSafeAreaView from '@/components/TabSafeAreaView'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import BottomSheet from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'

const Create = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const router = useRouter()

  const handleSheetChange = useCallback((index: number) => {
    // if (index < 0) {
    //   // sheet has been closed — snap it back open
    //   // console.log(1)
    //   bottomSheetRef.current?.snapToIndex(0)
    // }
    // console.log(bottomSheetRef.current?.snapToIndex(0))
  }, [])
  const handleOptionPress = async (optionType: 'lyrics' | 'audio' | 'video') => {
    if (optionType === 'lyrics') {
      router.push('/lyrics-screen') // Correctly call router.push
    }
    if (optionType === 'audio') {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: ['audio/*'],
          copyToCacheDirectory: true,
        })

        if (result.canceled) {
          return
        }

        // Handle the selected audio file
        const audioFile = result.assets[0]
        console.log('Selected audio file:', audioFile)
        Alert.alert('Success', `Selected: ${audioFile.name}`)
      } catch (error) {
        Alert.alert('Error', 'Failed to pick audio file')
        console.error(error)
      }
    } else if (optionType === 'video') {
      try {
        // Request permission first
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissionResult.granted) {
          Alert.alert('Permission Needed', 'We need access to your media library to select videos.')
          return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          aspect: [16, 9],
          quality: 1,
          videoMaxDuration: 300, // 5 minutes in seconds
        })

        if (!result.canceled) {
          const videoAsset = result.assets[0]
          console.log('Selected video:', videoAsset)
          Alert.alert('Success', 'Video selected successfully')
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to pick video')
        console.error(error)
      }
    }
  }
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['75%']}
        enablePanDownToClose={true}
        onChange={handleSheetChange}>
        <Text style={styles.header}>Share your work.</Text>
        <Text style={styles.subHeader}>Choose from three ways to share your projects</Text>
        <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('lyrics')}>
          <View style={styles.optionHeader}>
            <FontAwesome name="edit" size={24} color="#4A90E2" />
            <Text style={styles.optionTitle}>Lyrics</Text>
          </View>
          <Text style={styles.optionDescription}>
            Share a single line, song idea, or a full song's worth of inspiration{' '}
            <Text style={{ fontWeight: 'bold' }}>- share your words</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('audio')}>
          <View style={styles.optionHeader}>
            <FontAwesome name="headphones" size={24} color="#4A90E2" />
            <Text style={styles.optionTitle}>Audio</Text>
          </View>
          <Text style={styles.optionDescription}>
            From a quick voice memo to a polished track in progress{' '}
            <Text style={{ fontWeight: 'bold' }}>- share your sounds</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress('video')}>
          <View style={styles.optionHeader}>
            <FontAwesome name="video-camera" size={24} color="#4A90E2" />
            <Text style={styles.optionTitle}>Video</Text>
          </View>
          <Text style={styles.optionDescription}>
            Post anything from a raw jam session to a visualized performance
            <Text style={{ fontWeight: 'bold' }}>- share your vision</Text>
          </Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    marginHorizontal: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 10,
    marginBottom: 32,
  },
  optionCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  optionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
})

export default Create
