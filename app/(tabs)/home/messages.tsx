import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { s, vs, ms, mvs } from 'react-native-size-matters';

import TabSafeAreaView from '@/components/TabSafeAreaView'
import CustomHeader from '@/components/CustomHeader'

import InboxMessage from '@/components/InboxMessage'

const contacts = [
  {
    uid: '1',
    name: 'Billy Bob',
    content: 'are we still meeting up tomorrowaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    pic: require('../../../assets/images/adaptive-icon.png')
  },
  {
    uid: '2',
    name: 'Sarah Suzy',
    content: 'where\'s my money',
    pic: require('../../../assets/images/splash.png')
  },
  {
    uid: '3',
    name: 'Sarah Suzy',
    content: 'where\'s my money',
    pic: require('../../../assets/images/splash.png')
  },
  {
    uid: '4',
    name: 'Sarah Suzy',
    content: 'where\'s my money',
    pic: require('../../../assets/images/splash.png')
  },
  {
    uid: '5',
    name: 'Sarah Suzy',
    content: 'where\'s my money',
    pic: require('../../../assets/images/splash.png')
  },
  {
    uid: '6',
    name: 'Sarah Suzy',
    content: 'where\'s my money',
    pic: require('../../../assets/images/splash.png')
  },
  {
    uid: '7',
    name: 'Sarah Suzy',
    content: 'where\'s my moneys',
    pic: require('../../../assets/images/splash.png')
  },
  {
    uid: '8',
    name: 'Sarah Suzy',
    content: 'where\'s my money',
    pic: require('../../../assets/images/splash.png')
  },
  {
    uid: '9',
    name: 'Jess Suzy',
    content: 'where\'s my money',
    pic: require('../../../assets/images/splash.png')
  }
]

const requests = [
  {
    uid: '10',
    name: 'Jake Melon',
    pic: require('../../../assets/images/splash.png'),
    content: 'Has requested to follow you'
  },
  {
    uid: '11',
    name: 'Jody Maguire',
    pic: require('../../../assets/images/splash.png'),
    content: 'Has requested to follow you'
  }
]

function MessageRow({ user }) {
  return (
    <TouchableOpacity>
      <InboxMessage source={user.pic} username={user.name} content={user.content}/>
    </TouchableOpacity>
  )
}

const Messages = () => {
  const [messages, setMessages] = useState<boolean>(true)
  const pressMessages = () => setMessages(true)
  const pressRequests = () => setMessages(false)
  
  return (
    <CustomHeader title="Messages">
      <TabSafeAreaView>
        <View style={styles.buttonBar}>
          <TouchableOpacity style={styles.button} onPress={pressMessages}>
            <Text>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pressRequests}>
            <Text>Requests</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
          data={messages ? contacts : requests}
          renderItem={({ item }) => (
            <MessageRow user={item} />
          )}
          keyExtractor={(item) => item.uid}
        />
      </TabSafeAreaView>
    </CustomHeader>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: s(10),
  },
  buttonBar: {
    flexDirection: 'row', 
    justifyContent: 'center',
    padding: s(10),
  }
});

export default Messages
