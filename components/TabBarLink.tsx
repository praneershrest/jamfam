import { Pressable } from 'react-native'
import React from 'react'
import { Href, Link } from 'expo-router'

interface TabBarLinkIconProps {
  href: Href<string>
  children: React.JSX.Element
}

const TabBarLink = ({ href, children }: TabBarLinkIconProps) => {
  return (
    <Link href={href} asChild>
      <Pressable>{children}</Pressable>
    </Link>
  )
}

export default TabBarLink
