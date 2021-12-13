import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import FadingImage from '~/screens/OnboardingScreen/FadingImage/FadingImage'
import { colors, fonts, length } from '~/constants'

const { DEVICE_WIDTH, DEVICE_HEIGHT } = length
const defaultTextStyle = { includeFontPadding: false } // android의 디폴트 padding 없애기 위한 style

interface Props {
  topText: string
  orangeText: string
  extraText?: string
  descriptionLineOne: string
  descriptionLineTwo: string
  imageUrl: number // assets 폴더 내 이미지를 require하면 숫자로 주어짐
  imageSwipeAnimation?: Animated.AnimatedInterpolation
  imageSwipeOpacity?: Animated.AnimatedInterpolation
  isAutoScrolling?: boolean
  isFadingImage?: boolean
  showFadingImages?: boolean
}

const ScreenWrapper = styled.View`
  width: ${DEVICE_WIDTH}px;
  padding: 0 20px;
`

const ContentWrapper = styled.View`
  margin-top: ${DEVICE_HEIGHT > 740 ? '80px' : '40px'};
`

const SecondLineWrapper = styled.View`
  flex-direction: row;
`

const DarkText = styled.Text`
  color: ${colors.grayscale.second};
  font-family: ${fonts.notoSansKR.medium};
  font-size: 36px;
`

const OrangeText = styled.Text`
  margin-right: 8px;
  color: ${colors.primary.medium};
  font-family: ${fonts.notoSansKR.black};
  font-size: 36px;
`

const DescriptionWrapper = styled.View`
  margin: 20px 0 40px;
`

const DescriptionText = styled.Text`
  color: ${colors.grayscale.third};
  font-size: ${DEVICE_WIDTH > 375 ? '16px' : '15px'};
  font-family: ${fonts.notoSansKR.medium};
`

/* 
  - 주요 props -
  topText: 헤더의 첫 번째 줄 (검은색 텍스트)
  orangeText: 헤더의 두 번째 줄 (오렌지색 텍스트)
  extraText (선택): 헤더의 두 번째 줄 (검은색 텍스트)
  descriptionLineOne: Description의 첫 번째 줄 (회색 텍스트)
  descriptionLineTwo: Description의 두 번째 줄 (회색 텍스트)
  imageUrl: 이미지의 경로 (assets에 저장해둔 이미지의 경우, 'require()'를 사용하시면 됩니다.)
    예시) require('../../assets/images/pngs/imageName.png')

  - 추가 props -
  (온보딩 스크린 1-1 ~ 1-3 외 화면은 해당사항 없습니다.)
  imageSwipeAnimation: 이미지의 애니메이션
  imageSwipeOpacity: 이미지의 opacity
  isAutoScrolling: 오토스크롤 되고있는지 (boolean)
  isFadingImage: 오토스크롤일 때 렌더되는 crossfading 이미지들인지 (boolean)
  showFadingImages: 오토스크롤일 때 렌더되는 crossfading 이미지들을 보여줄지 (boolean)
*/
const OnboardingItem = ({
  topText,
  orangeText,
  extraText,
  descriptionLineOne,
  descriptionLineTwo,
  imageUrl,
  imageSwipeAnimation,
  imageSwipeOpacity,
  isFadingImage,
  isAutoScrolling,
  showFadingImages,
}: Props) => {
  return (
    <ScreenWrapper>
      <ContentWrapper>
        <DarkText style={defaultTextStyle}>{topText}</DarkText>
        <SecondLineWrapper>
          <OrangeText style={defaultTextStyle}>{orangeText}</OrangeText>
          {extraText && (
            <DarkText style={defaultTextStyle}>{extraText}</DarkText>
          )}
        </SecondLineWrapper>
        <DescriptionWrapper>
          <DescriptionText style={defaultTextStyle}>
            {descriptionLineOne}
          </DescriptionText>
          <DescriptionText style={defaultTextStyle}>
            {descriptionLineTwo}
          </DescriptionText>
        </DescriptionWrapper>
        {isFadingImage && (
          <FadingImage
            imageUrl={imageUrl}
            showFadingImages={showFadingImages}
          />
        )}
        {!isAutoScrolling && !isFadingImage && (
          <Animated.Image
            source={imageUrl}
            style={
              imageSwipeAnimation && {
                transform: [{ translateY: imageSwipeAnimation }],
                opacity: imageSwipeOpacity,
              }
            }
          />
        )}
      </ContentWrapper>
    </ScreenWrapper>
  )
}

export default OnboardingItem
