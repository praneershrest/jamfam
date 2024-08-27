import { useIsFocused } from '@react-navigation/native'
import { StatusBar, StatusBarProps } from 'expo-status-bar'

const FocusAwareStatusBar = (props: StatusBarProps) => {
  return useIsFocused() ? <StatusBar {...props} /> : undefined
}

export default FocusAwareStatusBar
