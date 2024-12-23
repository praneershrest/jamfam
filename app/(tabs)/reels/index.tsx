import React from 'react'
import { setStatusBarStyle } from 'expo-status-bar'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import icon from '@/assets/images/icon.png'
import video from '@/assets/videos/SampleVideo.mp4'
import ProjectReel from '@/components/ProjectReel'
import { ProjectReelProps } from '@/types/Project'

const exampleProjectVid: ProjectReelProps = {
  title: 'song to make plants grow better',
  description:
    'want to use words like green, glacier pure water, and nutrient absorbing roots to make the plant grow better. ',
  needs: ['singer', 'lyricist', 'music producer'],
  snippet: video,
  creator: {
    name: 'Poison Ivy',
    profilepic: icon,
    occupation: 'Singer Songwriter',
  },
}

const Reels = () => {
  setStatusBarStyle('light')
  return (
    <TabSafeAreaView>
      <ProjectReel {...exampleProjectVid} />
    </TabSafeAreaView>
  )
}

export default Reels
