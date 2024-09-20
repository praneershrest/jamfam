import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { storage, db } from '@/config/firebaseConfig'
import TabSafeAreaView from '@/components/TabSafeAreaView'
import Attachment from '@/components/Attachment'
import { AttachmentType } from '@/constants/types'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const Create = () => {
  const [attachment, setAttachment] = useState<AttachmentType | null>(null)
  const [description, setDescription] = useState('')
  const [lookingFor, setLookingFor] = useState('')

  // Upload to Firebase Storage
  const uploadToFirebase = async () => {
    if (!attachment) {
      Alert.alert('Please select an attachment to upload')
      return
    }

    const { uri, name } = attachment

    if (!name) {
      Alert.alert('File name is missing')
      return
    }

    const storageRef = storage().ref(`uploads/${name}`)
    const task = storageRef.putFile(uri)

    task.on('state_changed', (taskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`)
    })

    task
      .then(() => {
        Alert.alert('File uploaded to Firebase successfully!')
      })
      .catch((error) => {
        Alert.alert('Upload failed', error.message)
      })
  }

  const handleSubmit = async () => {
    try {
      // Save description, lookingFor, and downloadURL to Firestore
      await addDoc(collection(db, 'profiles'), {
        description,
        lookingFor,
        attachmentUrl: attachment.uri, // Save the uploaded file's URL
        createdAt: new Date(), // Optional: Store creation timestamp
      })

      Alert.alert('Profile submitted successfully!')
    } catch (error) {
      Alert.alert('Error submitting profile:', error.message)
    }
  }

  return (
    <TabSafeAreaView>
      {/* Attachment component */}
      <Attachment
        width={'100%'}
        height={400}
        resizeMode="contain"
        mode="reel"
        attachment={attachment}
        btnText="Upload Profile"
        setAttachment={setAttachment}
      />

      {/* Profile input field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter your profile"
        />
      </View>

      {/* Looking For input field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Looking For:</Text>
        <TextInput
          style={styles.input}
          value={lookingFor}
          onChangeText={setLookingFor}
          placeholder="Enter what you're looking for"
        />
      </View>

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} />
    </TabSafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
})

export default Create
