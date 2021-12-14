import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import DotsIndicator from './DotsIndicator/DotsIndicator'
import { BottomBtn, OnboardingItem } from '~/components'
import { colors, length } from '~/constants'
import DATA from './OnboardingData'

// 여러 곳에서 같은 interval/timeout을 clear/reset 할 수 있게 interval, timeout 변수들을 선언
let intervalId: NodeJS.Timeout
let timeoutId: NodeJS.Timeout
const { DEVICE_WIDTH } = length
const INTERVAL_TIME = 1400 // auto scroll interval 시간(ms)

interface Props {
  navigation: any // 추후에 구체적인 타입을 주시면 감사하겠습니다.
}

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.grayscale.eighth};
`

const AnimatingImageWrapper = styled.View<{ topInset: number }>`
  position: absolute;
  top: ${({ topInset }) => topInset}px;
  z-index: 1;
`

const OnboardingScreen = ({ navigation }: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [showFadingImages, setShowFadingImages] = useState(true)
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollRef: any = useRef(null) // 추후에 구체적인 타입을 주시면 감사하겠습니다.

  const { top } = useSafeAreaInsets()

  // auto scroll 함수
  const onAutoScroll = useCallback(() => {
    const newIndex =
      currentSlideIndex === DATA.length - 1 ? 0 : currentSlideIndex + 1
    setCurrentSlideIndex(newIndex)
    scrollRef.current.scrollTo({
      animated: false,
      x: DEVICE_WIDTH * newIndex,
    })
  }, [currentSlideIndex])

  // auto scroll interval 실행 함수
  const startInterval = useCallback(() => {
    intervalId = setInterval(onAutoScroll, INTERVAL_TIME)
  }, [onAutoScroll])

  useEffect(() => {
    if (!isAutoScrolling) return
    startInterval()
    return () => clearInterval(intervalId)
  }, [isAutoScrolling, startInterval])

  // 유저가 화면에 터치를 hold하는 동안 auto scroll 일시 정지
  const onTouchStart = () => {
    clearInterval(intervalId)
    clearTimeout(timeoutId)
    setIsAutoScrolling(false)
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        setShowFadingImages(false)
      }, 25)
    } else {
      setShowFadingImages(false) // android
    }
  }

  // 유저가 화면에 손을 떼는 순간 auto scroll 다시 시작
  const onTouchEnd = () => {
    timeoutId = setTimeout(() => {
      setIsAutoScrolling(true)
      setShowFadingImages(true)
    }, INTERVAL_TIME)
  }

  // 유저가 swipe 해서 다음 슬라이드에 멈출 때 실행되는 함수
  const onManualScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / DEVICE_WIDTH)
    setCurrentSlideIndex(newIndex)
  }

  // '시작하기' 버튼 클릭 시 '온보딩-2 약관동의'로 이동.
  const goToTermsAndConditions = () => {
    clearTimeout(timeoutId)
    navigation.replace('Main') //Android의 'back' 버튼을 클릭 시 온보딩-1로 못 돌아가게 .replace를 사용
  }

  return (
    <>
      <SafeAreaContainer>
        <AnimatingImageWrapper pointerEvents={'none'} topInset={top}>
          <OnboardingItem
            topText={' '}
            orangeText={' '}
            extraText={' '}
            descriptionLineOne={' '}
            descriptionLineTwo={' '}
            imageUrl={DATA[currentSlideIndex].imageUrl}
            isAutoScrolling={isAutoScrolling}
            isFadingImage
            showFadingImages={showFadingImages}
          />
        </AnimatingImageWrapper>
        <Animated.ScrollView
          bounces={false}
          horizontal
          onMomentumScrollEnd={onManualScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onScrollEndDrag={Platform.select({ android: onTouchEnd })} //android로 swipe시 onTouchEnd이 실행안돼서 추가함
          pagingEnabled
          ref={scrollRef}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {DATA.map((item, index) => {
            const imageSwipeAnimation = scrollX.interpolate({
              inputRange: [
                DEVICE_WIDTH * (index - 1),
                DEVICE_WIDTH * index,
                DEVICE_WIDTH * (index + 1),
              ],
              outputRange: [40, 0, 40],
              extrapolate: 'clamp',
            })
            const imageSwipeOpacity = scrollX.interpolate({
              inputRange: [
                DEVICE_WIDTH * (index - 1),
                DEVICE_WIDTH * index,
                DEVICE_WIDTH * (index + 1),
              ],
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            })

            return (
              <OnboardingItem
                key={item.id}
                topText={item.topText}
                orangeText={item.orangeText}
                extraText={item.extraText}
                descriptionLineOne={item.descriptionLineOne}
                descriptionLineTwo={item.descriptionLineTwo}
                imageUrl={item.imageUrl}
                imageSwipeAnimation={imageSwipeAnimation}
                imageSwipeOpacity={imageSwipeOpacity}
                isAutoScrolling={isAutoScrolling}
                showFadingImages={showFadingImages}
              />
            )
          })}
        </Animated.ScrollView>
        <DotsIndicator currentSlideIndex={currentSlideIndex} data={DATA} />
      </SafeAreaContainer>
      <BottomBtn
        isDisabled={false}
        contents={'시작하기'}
        onSubmit={goToTermsAndConditions}
      />
    </>
  )
}

export default OnboardingScreen
