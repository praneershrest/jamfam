import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { HeaderOptions } from '@react-navigation/elements'

interface CustomHeaderProps extends HeaderOptions {
  title: string
  children: React.JSX.Element
}

const CustomHeader = ({ title, children, ...props }: CustomHeaderProps) => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: title, ...props })
  }, [navigation, title, props])

  return <>{children}</>
}

export default CustomHeader
