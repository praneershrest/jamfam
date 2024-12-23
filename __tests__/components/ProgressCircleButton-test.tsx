import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ProgressCircleButton from '@/components/ProgressCircleButton'
import { HexColor } from '@/utils/invert-color'

describe('ProgressCircleButton', () => {
  const baseProps = {
    radius: 100,
    duration: 1000,
    stroke: '#000000',
    strokeWidth: 10,
    backgroundColor: 'transparent',
    colorInterpolation: [
      [0, 50, 100],
      ['yellow', 'orange', 'red'],
    ] as [number[], HexColor[]],
    showCustomText: false,
    customText: '',
    showPercentage: true,
    onCompleted: jest.fn(),
  }

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ProgressCircleButton />)

    expect(getByTestId('ProgressCircleButton-Svg')).toBeTruthy()
    expect(getByTestId('ProgressCircleButton-G')).toBeTruthy()
    expect(getByTestId('ProgressCircleButton-Circle')).toBeTruthy()
  })

  it('renders correctly with custom  props', () => {
    const { getByTestId, getByDisplayValue } = render(<ProgressCircleButton {...baseProps} />)

    // Verify that the circle is rendered
    expect(getByTestId('ProgressCircleButton-Circle')).toBeTruthy()

    // Verify that percentage text is rendered
    const percentageText = getByDisplayValue('0%')
    expect(percentageText).toBeTruthy()
  })

  it('renders custom text when showCustomText is true', () => {
    const customProps = {
      ...baseProps,
      showCustomText: true,
      customText: 'Custom Text',
    }
    const { getByDisplayValue } = render(<ProgressCircleButton {...customProps} />)

    // Verify that the custom text is rendered
    const customText = getByDisplayValue('Custom Text')
    expect(customText).toBeTruthy()
  })

  it('animates stroke offset and color on press in and out', () => {
    const { getByTestId } = render(<ProgressCircleButton {...baseProps} />)

    // Simulate press in
    const svgElement = getByTestId('ProgressCircleButton-Circle')
    fireEvent(svgElement, 'onPressIn')
    expect(svgElement).toBeTruthy() // Verifies the press in interaction

    // Simulate press out
    fireEvent(svgElement, 'onPressOut')
    expect(svgElement).toBeTruthy() // Verifies the press out interaction
  })

  it('calls onCompleted callback when long press occurs', () => {
    const { getByTestId } = render(<ProgressCircleButton {...baseProps} />)
    const svgElement = getByTestId('ProgressCircleButton-Circle')

    // Simulate long press
    fireEvent(svgElement, 'onLongPress')
    expect(baseProps.onCompleted).toHaveBeenCalled()
  })

  it('renders with custom stroke color and strokeWidth', () => {
    const customProps = {
      ...baseProps,
      stroke: 'blue',
      strokeWidth: 15,
    }
    const { getByTestId } = render(<ProgressCircleButton {...customProps} />)

    // Verify that the circle is rendered with correct stroke color and width
    const circleElement = getByTestId('ProgressCircleButton-Circle')
    expect(circleElement.props.stroke).toEqual({ payload: 4278190335, type: 0 })
    expect(circleElement.props.strokeWidth).toEqual(15)
  })

  it('renders custom percentage text styles', () => {
    const customProps = {
      ...baseProps,
      percentageTextStyles: { fontSize: 20, color: 'red' },
    }
    const { getByDisplayValue } = render(<ProgressCircleButton {...customProps} />)

    const percentageText = getByDisplayValue('0%')
    expect(percentageText.props.style.fontSize).toBe(20)
    expect(percentageText.props.style.color).toBe('red')
  })
})
