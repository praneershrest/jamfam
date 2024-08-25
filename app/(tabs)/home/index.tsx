import { Dimensions, Text } from 'react-native'
import React from 'react'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import Card from '@/components/Card/Card'

const Home = () => {
  return (
    <TabSafeAreaView>
        <Card width={Dimensions.get('window').width} height={150} color="lightblue" title="Project A" description="Project A description"></Card>
        <Card width={Dimensions.get('window').width} height={150} color="lightyellow" title="Project B" description="Project B description"></Card>
        <Card width={Dimensions.get('window').width} height={150} color="white" title="Project C" description="Project C description"></Card>
    </TabSafeAreaView>
  )
}

export default Home
