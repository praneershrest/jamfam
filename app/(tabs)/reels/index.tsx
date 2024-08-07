import { FlatList, View, ViewToken } from 'react-native'

import ProjectPost from '@/components/ProjectPost'
import josh from '@/assets/images/josh.png'
import joyang from '@/assets/images/joyang.png'
import praneer from '@/assets/images/praneer.png'
import { useRef, useState } from 'react'
import project2 from '@/assets/videos/project2.mp4'
import project1 from '@/assets/videos/project1.mp4'
import joyang2 from '@/assets/videos/joyang2.mp4'

const projects = [
  {
    id: '1',
    video: project1,
    pills: ['label1.1', 'label1.2', 'label1.3'],
    title: 'Title 1',
    description: 'Project Description 1',
    creator: {
      name: 'Josh',
      profilepic: josh,
    },
  },
  {
    id: '2',
    video: joyang2,
    pills: ['label2.1', 'label2.2', 'label2.3'],
    title: 'Title 2',
    description: 'Project Description 2',
    creator: {
      name: 'Joyang',
      profilepic: joyang,
    },
  },
  {
    id: '3',
    video: project2,
    pills: ['label3.1', 'label3.2', 'label3.3'],
    title: 'Title 3',
    description: 'Project Description 3',
    creator: {
      name: 'Praneer',
      profilepic: praneer,
    },
  },
]

const Reels = () => {
  const [activeId, setActiveId] = useState(projects[0].id)

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged: ({ changed, viewableItems }: any) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
          setActiveId(viewableItems[0].item.id)
        }
      },
    },
  ])

  return (
    <View>
      <FlatList
        data={projects}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProjectPost project={item} activeProjectId={activeId} />}
      />
    </View>
  )
}

export default Reels
