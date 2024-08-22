import { Text } from 'react-native'
import React, { useState } from 'react'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import Attachment from '@/components/Attachment'
import { AttachmentType } from '@/constants/types'

const Create = () => {
  const [attachment, setAttachment] = useState<AttachmentType | null>(null)

  return (
    <TabSafeAreaView>
      <Attachment width={'100%'} height={200} attachment={attachment} btnText="Upload Audio / Video / Image" setAttachment={setAttachment}/>
    </TabSafeAreaView>
  )
}

export default Create
