import { MaterialIcons } from '@expo/vector-icons'
import { type IconProps } from '@expo/vector-icons/build/createIconSet'
import { type ComponentProps } from 'react'

export function TabBarIcon({
  size,
  style,
  ...props
}: IconProps<ComponentProps<typeof MaterialIcons>['name']>) {
  return <MaterialIcons size={size || 28} style={style} {...props} />
}
