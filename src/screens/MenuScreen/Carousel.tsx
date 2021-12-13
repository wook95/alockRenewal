import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import { colors, length } from '~/constants'

let intervalId: NodeJS.Timeout

const SCREEN_WIDTH = length.DEVICE_WIDTH
const DELAY_TIME = 2500

//navigation 임시 설정, 추후 수정 필요
const images = [
  {
    id: 0,
    uri: require('~/assets/images/pngs/walletBanner.png'),
    navi: 'Main',
  },
  {
    id: 1,
    uri: require('~/assets/images/pngs/payBanner.png'),
    navi: 'Main',
  },
  {
    id: 2,
    uri: require('~/assets/images/pngs/rewardBanner.png'),
    navi: 'Main',
  },
]

const CarouselContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  margin: 10px 0 20px 0;
  border-radius: 12px;
`

const ImageWrapper = styled.View`
  width: ${SCREEN_WIDTH - 40}px;
  border-radius: 12px;
  overflow: hidden;
`

const Banner = styled.Image`
  width: ${SCREEN_WIDTH - 40}px;
`

const IndicatorView = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  height: 10px;
  bottom: -15px;
`

const Indicator = styled.View`
  width: 6px;
  height: 6px;
  margin: 3px;
  border-radius: 3px;
`

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
  const scrollRef: any = useRef(null)
  const navigation: any = useNavigation()

  const changeIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const nextCurrentIndex: number = Math.round(contentOffsetX / SCREEN_WIDTH)
    setCurrentIndex(nextCurrentIndex)
  }

  const onSlideChange = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1

    setCurrentIndex(newIndex)
    if (!scrollRef?.current) return
    scrollRef?.current.scrollTo({
      animated: true,
      x: (SCREEN_WIDTH - 40) * newIndex,
      y: 0,
    })
  }, [currentIndex])

  const onTouchStart = () => {
    clearInterval(intervalId)
    setIsAutoScrollActive(false)
  }

  const onTouchEnd = () => {
    setIsAutoScrollActive(true)
  }

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, DELAY_TIME)
  }, [onSlideChange])

  useEffect(() => {
    if (!isAutoScrollActive) return

    startInterval()

    return () => {
      clearInterval(intervalId)
    }
  }, [isAutoScrollActive, onSlideChange, startInterval])

  return (
    <>
      <CarouselContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={changeIndex}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          ref={scrollRef}>
          {images.map(image => (
            <Pressable
              key={image.id}
              onPress={() => navigation.navigate(`${image.navi}`)}>
              <ImageWrapper key={image.id}>
                <Banner key={image.id} source={image.uri} />
              </ImageWrapper>
            </Pressable>
          ))}
        </ScrollView>
        <IndicatorView>
          {images.map(image => (
            <Indicator
              key={image.id}
              style={{
                backgroundColor:
                  image.id === currentIndex
                    ? colors.grayscale.second
                    : colors.grayscale.sixth,
              }}
            />
          ))}
        </IndicatorView>
      </CarouselContainer>
    </>
  )
}

export default Carousel
