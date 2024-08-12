import { Pressable } from 'react-native'
import React, { Children, useState } from 'react'
import { Href, Link } from 'expo-router'

import { Colors } from '@/constants/Colors'

interface TabBarLinkIconProps {
  href: Href<string>
  children: React.JSX.Element
}

const TabBarLink = ({ href, children }: TabBarLinkIconProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const pressedChildren = Children.map(children, (child) =>
    React.cloneElement(child, {
      color: Colors.light.tabIconDefault,
    }),
  )

  return (
    <Link href={href} asChild>
      <Pressable onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
        {isPressed ? pressedChildren : children}
      </Pressable>
    </Link>
  )
}

export default TabBarLink
