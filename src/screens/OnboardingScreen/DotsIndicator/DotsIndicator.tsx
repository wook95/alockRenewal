import React from 'react'
import styled from 'styled-components/native'
import { length } from '~/constants'
import SliderDot from './SliderDot/SliderDot'

const { DEVICE_WIDTH, DEVICE_HEIGHT } = length

interface DotsIndicatorProps {
  currentSlideIndex: number
  data: {
    id: number
    topText: string
    orangeText: string
    extraText?: string
    descriptionLineOne: string
    descriptionLineTwo: string
    imageUrl: number
  }[]
}

const StyledDotsIndicator = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
  bottom: ${DEVICE_HEIGHT > 740 ? 69 : 50}px;
  left: ${DEVICE_WIDTH / 2 - 30}px;
`
const DotsIndicator = (props: DotsIndicatorProps) => {
  const { currentSlideIndex, data } = props

  return (
    <StyledDotsIndicator pointerEvents={'none'}>
      {data.map((_, index) => {
        return (
          <SliderDot
            key={index.toString()}
            currentSlideIndex={currentSlideIndex}
            dotIndex={index}
            isCurrentSlide={currentSlideIndex === index}
          />
        )
      })}
    </StyledDotsIndicator>
  )
}

export default DotsIndicator
