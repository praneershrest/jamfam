import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Href, Link } from 'expo-router'

interface LinkTouchableOpacityProps {
  href: Href<string>
  children: React.JSX.Element
}

const LinkTouchableOpacity = ({ href, children }: LinkTouchableOpacityProps) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity testID="LinkTouchableOpacity-TouchableOpacity">{children}</TouchableOpacity>
    </Link>
  )
}

export default LinkTouchableOpacity
