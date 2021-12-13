import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { useTransition, animated } from '@react-spring/native'
import { colors } from '~/constants'

interface SliderDotProps {
  currentSlideIndex: number
  dotIndex: number
  isCurrentSlide: boolean
}

/* DotWrapper 관련 CSS가 지저분해 보이는데, 어두운 색의 dot에서 연한 dot으로 바뀔 때 dot의 위치를 고려해서 추가했습니다. 
align-items을 주석처리한 뒤에 밑에 transitions 변수의 duration을 올리시면 차이점을 느끼실 수 있을 것 같습니다. (특히 손으로 swipe할 때) 
(duration은 항상 OnboardingScreen의 INTERVAL_TIME보다 작아야합니다.) */
const DotWrapper = styled.View<{ currentSlideIndex: number; dotIndex: number }>`
  align-items: ${({ currentSlideIndex, dotIndex }) =>
    dotIndex === 0
      ? 'flex-start'
      : dotIndex === 2
      ? 'flex-end'
      : currentSlideIndex === 0
      ? 'flex-end'
      : currentSlideIndex === 2
      ? 'flex-start'
      : 'center'};
`

const AnimatedDot = styled(animated(View))<{ isSelected: boolean }>`
  height: 10px;
  width: ${({ isSelected }) => (isSelected ? 20 : 10)}px;
  border-radius: ${({ isSelected }) => (isSelected ? 6 : 5)}px;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.grayscale.third : colors.grayscale.sixth};
`

const SliderDot = (props: SliderDotProps) => {
  const { currentSlideIndex, dotIndex, isCurrentSlide } = props

  const transitions = useTransition(isCurrentSlide, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: {
      position: 'absolute',
      opacity: 0,
      backgroundColor: colors.grayscale.fourth,
    },
    config: { duration: 150 },
    expires: true,
  })

  return (
    <DotWrapper currentSlideIndex={currentSlideIndex} dotIndex={dotIndex}>
      {transitions((styles, item) => {
        // AnimatedDot에 children을 안 줬다는 내용으로 빨간 줄이 뜨는데 문제없이 구현이 되는 것 같아서 일단 무시했습니다. -성재
        return <AnimatedDot isSelected={item} style={{ ...styles }} />
      })}
    </DotWrapper>
  )
}

export default SliderDot
