import { Text } from 'react-native'
import React, { useState } from 'react'

import TabSafeAreaView from '@/components/TabSafeAreaView'
import Attachment from '@/components/Attachment'
import { AttachmentType } from '@/constants/types'
import { Colors } from '@/constants/Colors'

const Create = () => {
  const [attachment, setAttachment] = useState<AttachmentType | null>(null)

  return (
    <TabSafeAreaView>
      <Attachment
        width={'100%'}
        height={400}
        resizeMode="contain"
        mode="reel"
        attachment={attachment}
        btnText="Upload Profile"
        setAttachment={setAttachment}
      />
    </TabSafeAreaView>
  )
}

export default Create
