import React from 'react'
import { Colors } from '@/constants/Colors'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { VectorIconSize } from '@/constants/Size'

export interface VectorIconProps extends IconProps<string> {
  /**
   * See available icon types at https://icons.expo.fyi/Index
   */
  type?:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'FontAwesome6'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  name: string
  size?: number
  color?: string
}

const VectorIcon = ({
  type = 'MaterialIcons',
  name,
  size = VectorIconSize.default,
  color = Colors.light.icon,
}: VectorIconProps) => {
  switch (type) {
    case 'AntDesign': {
      const AntDesign = require('@expo/vector-icons/AntDesign').default
      return <AntDesign name={name} size={size} color={color} />
    }

    case 'Entypo': {
      const Entypo = require('@expo/vector-icons/Entypo').default
      return <Entypo name={name} size={size} color={color} />
    }

    case 'EvilIcons': {
      const EvilIcons = require('@expo/vector-icons/EvilIcons').default
      return <EvilIcons name={name} size={size} color={color} />
    }

    case 'Feather': {
      const Feather = require('@expo/vector-icons/Feather').default
      return <Feather name={name} size={size} color={color} />
    }

    case 'FontAwesome': {
      const FontAwesome = require('@expo/vector-icons/FontAwesome').default
      return <FontAwesome name={name} size={size} color={color} />
    }

    case 'FontAwesome5': {
      const FontAwesome5 = require('@expo/vector-icons/FontAwesome5').default
      return <FontAwesome5 name={name} size={size} color={color} />
    }

    case 'FontAwesome6': {
      const FontAwesome6 = require('@expo/vector-icons/FontAwesome6').default
      return <FontAwesome6 name={name} size={size} color={color} />
    }

    case 'Fontisto': {
      const Fontisto = require('@expo/vector-icons/Fontisto').default
      return <Fontisto name={name} size={size} color={color} />
    }

    case 'Foundation': {
      const Foundation = require('@expo/vector-icons/Foundation').default
      return <Foundation name={name} size={size} color={color} />
    }

    case 'Ionicons': {
      const Ionicons = require('@expo/vector-icons/Ionicons').default
      return <Ionicons name={name} size={size} color={color} />
    }

    case 'MaterialCommunityIcons': {
      const MaterialCommunityIcons = require('@expo/vector-icons/MaterialCommunityIcons').default
      return <MaterialCommunityIcons name={name} size={size} color={color} />
    }

    case 'MaterialIcons': {
      const MaterialIcons = require('@expo/vector-icons/MaterialIcons').default
      return <MaterialIcons name={name} size={size} color={color} />
    }

    case 'Octicons': {
      const Octicons = require('@expo/vector-icons/Octicons').default
      return <Octicons name={name} size={size} color={color} />
    }

    case 'SimpleLineIcons': {
      const SimpleLineIcons = require('@expo/vector-icons/SimpleLineIcons').default
      return <SimpleLineIcons name={name} size={size} color={color} />
    }

    case 'Zocial': {
      const Zocial = require('@expo/vector-icons/Zocial').default
      return <Zocial name={name} size={size} color={color} />
    }

    default: {
      const MaterialIcons = require('@expo/vector-icons/MaterialIcons').default
      return <MaterialIcons name={name} size={size} color={color} />
    }
  }
}

export default VectorIcon
