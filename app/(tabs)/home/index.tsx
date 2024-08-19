import { Text, ImageSourcePropType, View, StyleSheet } from 'react-native'
import React from 'react'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import * as Avatar from '@/components/Avatar'
import icon from '@/assets/images/icon.png'
import splash from '@/assets/images/splash.png'
import { Colors } from '@/constants/Colors'

const Home = () => {
  const handleOnError = () => {
    return (
      <Avatar.Icon
        color="#3df"
        icon={{ name: 'dog', type: 'MaterialCommunityIcons', color: 'yellow' }}
      />
    )
  }

  return (
    <TabSafeAreaView>
      <Text>Home</Text>
      <View style={styles.container}>
        <Avatar.Text label="JF" />
        <Avatar.Text label="JF" size={25} backgroundColor={Colors.light.tabIconSelected} />
        <Avatar.Text
          label="JF"
          size={100}
          backgroundColor={Colors.white}
          labelColor={Colors.light.tint}
        />
      </View>
      <View style={styles.container}>
        <Avatar.Icon
          color="#945"
          icon={{ name: 'dog', type: 'MaterialCommunityIcons', color: 'yellow' }}
          size={200}
        />
        <Avatar.Icon
          color="#ff9"
          icon={{ name: 'meh', type: 'AntDesign', color: 'brown' }}
          size={80}
        />
        <Avatar.Icon color="navy" icon={{ name: 'bug', type: 'Entypo', color: 'red' }} size={40} />
      </View>
      <View style={styles.container}>
        <Avatar.Image source={icon} size={120} />
        <Avatar.Image source={splash} size={120} />
        <Avatar.Image
          size={120}
          source={{
            uri: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExejcxcmI2cmJmaXF5aGN4ejVsb3BmaGhhYWpldmppMWM3NzJibDhhaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.gif',
          }}
        />
      </View>
    </TabSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
})

export default Home
