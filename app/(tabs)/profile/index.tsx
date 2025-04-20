// screens/ProfileScreen.js
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const AVATAR_SIZE = 80
const GRID_ITEM_SIZE = width / 3

const TABS = ['All Posts', 'Projects', 'About']

// placeholder data
const POSTS = [
  { id: '1', uri: 'https://picsum.photos/200/200?random=1', type: 'video', duration: '0:00' },
  { id: '2', uri: 'https://picsum.photos/200/200?random=2', type: 'image', editable: true },
  { id: '3', uri: 'https://picsum.photos/200/200?random=3', type: 'audio' },
  { id: '4', uri: 'https://picsum.photos/200/200?random=4', type: 'audio' },
  { id: '5', uri: 'https://picsum.photos/200/200?random=5', type: 'video', duration: '0:00' },
  { id: '6', uri: 'https://picsum.photos/200/200?random=6', type: 'image', editable: true },
  { id: '7', uri: 'https://picsum.photos/200/200?random=7', type: 'audio' },
  { id: '8', uri: 'https://picsum.photos/200/200?random=8', type: 'image', editable: true },
  { id: '9', uri: 'https://picsum.photos/200/200?random=9', type: 'video', duration: '0:00' },
]

const Profile = () => {
  const [activeTab, setActiveTab] = useState(TABS[0])

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item.uri }} style={styles.gridImage} />
      {/* overlay icons */}
      {item.type === 'video' && (
        <Ionicons name="videocam" size={20} color="#fff" style={styles.overlayIcon} />
      )}
      {item.type === 'audio' && (
        <MaterialCommunityIcons name="waveform" size={20} color="#fff" style={styles.overlayIcon} />
      )}
      {item.editable && (
        <Feather
          name="edit-2"
          size={20}
          color="#fff"
          style={[styles.overlayIcon, { top: 5, right: 5 }]}
        />
      )}
      {item.duration && (
        <View style={styles.durationBox}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* header background */}
      <View style={styles.headerBackground}>
        <TouchableOpacity style={styles.uploadPlaceholder}>
          <Ionicons name="image-outline" size={32} color="#888" />
        </TouchableOpacity>
      </View>

      {/* avatar, connect button */}
      <View style={styles.profileRow}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} style={styles.avatar} />
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectText}>Connect</Text>
        </TouchableOpacity>
      </View>

      {/* name & bio */}
      <View style={styles.nameSection}>
        <Text style={styles.name}>Ian Dooley</Text>
        <Text style={styles.bio}>
          Always chasing new sounds and stories. 🎶
          <Text style={styles.bioSub}> 💡 Guitarist, songwriter, and occasional producer.</Text>
        </Text>
      </View>

      {/* tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.filterIcon}>
          <Feather name="filter" size={20} color="#222" />
        </TouchableOpacity>
      </View>

      {/* grid */}
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        style={styles.grid}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBackground: {
    height: 140,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileRow: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: '#fff',
  },
  connectButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
  },
  connectText: { fontWeight: '600' },
  nameSection: {
    marginTop: AVATAR_SIZE / 2 + 10,
    paddingHorizontal: 20,
  },
  name: { fontSize: 24, fontWeight: 'bold' },
  bio: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  bioSub: { color: '#555' },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 16,
  },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  tabText: { fontSize: 16, color: '#666' },
  tabTextActive: { color: '#000', fontWeight: '600' },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '60%',
    backgroundColor: '#000',
    borderRadius: 1,
  },
  filterIcon: { padding: 8, marginLeft: 8 },
  grid: { flex: 1 },
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  gridImage: { width: '100%', height: '100%' },
  overlayIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  durationBox: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  durationText: { color: '#fff', fontSize: 10 },
  bottomBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  plusButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
})
export default Profile
