import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import VectorIcon from 'react-native-vector-icons/Entypo'
import { useRouter } from 'expo-router'

const LyricsScreen = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title your work</Text>
      <TextInput
        style={styles.input}
        placeholder="What’s your story? Write your verses, chorus, or that one line you can’t shake."
        multiline
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/reels')}>
        <VectorIcon name="cross" color={'#fff'} size={35} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Semi-transparent background
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 500,
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  backButton: {
    position: 'absolute', // Use absolute positioning
    top: 60, // Distance from the top of the screen
    left: 10, // Distance from the right of the scree
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 20, // Reduced horizontal padding
    borderRadius: 10,
    zIndex: 1, // Ensure the button is above other elements
  },
  button: {
    position: 'absolute', // Use absolute positioning
    top: 60, // Distance from the top of the screen
    right: 30, // Distance from the right of the screen
    backgroundColor: '#fff',
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 20, // Reduced horizontal padding
    borderRadius: 10,
    zIndex: 1, // Ensure the button is above other elements
  },
  buttonText: {
    color: '#000',
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
  },
})

export default LyricsScreen
