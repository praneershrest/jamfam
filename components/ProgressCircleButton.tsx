import { ColorValue, StyleProp, TextInput, TextStyle, View, StyleSheet } from 'react-native'
import React from 'react'
import Svg, { Circle, G } from 'react-native-svg'
import Animated, {
  AnimatedProps,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { s } from 'react-native-size-matters'

import { HexColor } from '@/utils/invert-color'
import { Fonts } from '@/constants/Font'
import { Colors } from '@/constants/Colors'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedText = Animated.createAnimatedComponent(TextInput)

type ProgressCircleButtonProps = {
  /**
   * Size of the circle by radius.
   */
  radius?: number
  /**
   * Duration of the animation to complete in milliseconds.
   */
  duration?: number
  /**
   * Stroke color of the circle.
   */
  stroke?: ColorValue
  /**
   * Stroke width of the circle.
   */
  strokeWidth?: number
  /**
   * Background colour of the circle.
   */
  backgroundColor?: ColorValue
  /**
   * Color interpolation for the circle.
   * First array is the percentage values that represent the index.
   * Second array is the colors that represent the index.
   * The two arrays must have the same length.
   */
  colorInterpolation?: [number[], HexColor[]]
  /**
   * Show custom text in the center of the circle.
   */
  showCustomText?: boolean
  /**
   * Custom text to display in the center of the circle.
   */
  customText?: string
  /**
   * Custom text styles for the custom text.
   */
  customTextStyles?: StyleProp<TextStyle>
  /**
   * Show percentage text in the center of the circle.
   */
  showPercentage?: boolean
  /**
   * Text styles for the percentage text.
   */
  percentageTextStyles?: StyleProp<TextStyle>
  /**
   * Callback function called immediately when a touch is engaged, before onPressOut and onPress.
   */
  onPressIn?: () => void
  /**
   * Callback function called when a touch is released.
   */
  onPressOut?: () => void
  /**
   * Callback function when the animation is completed.
   */
  onCompleted?: () => void
}

/**
 * ProgressCircleButton is an animated component that shows a progress circle on press in.
 *
 * ## Usage
 * ```
 * import * as React from 'react';
 * mport ProgressCircleButton from '@/components/ProgressCircleButton'
 *
 * const MyComponent = () => (
 *   <ProgressCircleButton />
 * );
 * ```
 */
const ProgressCircleButton = ({
  radius = s(100),
  duration = s(1000),
  stroke = Colors.input,
  strokeWidth = s(10),
  backgroundColor = 'transparent',
  colorInterpolation = [
    [0, 50, 100],
    ['yellow', 'orange', 'red'],
  ],
  showCustomText = false,
  customText = '',
  customTextStyles = {},
  showPercentage = false,
  percentageTextStyles = {
    ...Fonts.default.bodySmall,
  },
  onPressIn,
  onPressOut,
  onCompleted,
}: ProgressCircleButtonProps) => {
  const halfCircle = radius + strokeWidth
  const circumference = 2 * Math.PI * radius

  const strokeOffset = useSharedValue(circumference)

  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference) * 100
    return withTiming(number, { duration: duration })
  })

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(percentage.value, colorInterpolation[0], colorInterpolation[1])
  })

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: strokeColor.value,
    }
  })

  const animatedTextPercentage = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}%`,
      color: strokeColor.value,
    }
  }, [percentage, strokeColor]) as AnimatedProps<TextInput>

  const animatedTextColor = useAnimatedProps(() => {
    return {
      color: strokeColor.value,
    }
  }, [strokeColor]) as AnimatedProps<TextInput>

  const handlePressIn = () => {
    strokeOffset.value = 0
    onPressIn && onPressIn()
  }

  const handlePressOut = () => {
    strokeOffset.value = circumference
    onPressOut && onPressOut()
  }

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius,
            backgroundColor: backgroundColor,
            margin: strokeWidth / 2,
          },
        ]}>
        {showPercentage && (
          <AnimatedText
            style={percentageTextStyles}
            defaultValue={'0%'}
            animatedProps={animatedTextPercentage}
            editable={false}
          />
        )}
        {showCustomText && customText.trim() !== '' && (
          <AnimatedText
            style={[
              {
                paddingHorizontal: strokeWidth,
                textAlign: 'center',
              },
              customTextStyles,
            ]}
            multiline={true}
            defaultValue={customText}
            animatedProps={animatedTextColor}
            editable={false}
          />
        )}
      </View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={onCompleted}
        delayLongPress={duration}
        testID="ProgressCircleButton-Svg">
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`} testID="ProgressCircleButton-G">
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            testID="ProgressCircleButton-Circle"
          />
          <AnimatedCircle
            animatedProps={animatedCircleProps}
            cx="50%"
            cy="50%"
            r={radius}
            strokeDasharray={circumference}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap={'round'}
            testID="ProgressCircleButton-AnimatedCircle"
          />
        </G>
      </Svg>
    </View>
  )
}

export default ProgressCircleButton
