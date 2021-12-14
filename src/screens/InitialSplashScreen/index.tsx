import React, { useRef, useEffect } from 'react'
import { Image, StatusBar, Animated, Easing } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import { colors } from '~/constants'

const DARK_ORANGE = '#F08602'
const LIGHT_ORANGE = '#F7A602'

const BackgroundView = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: 0 40px;
`

const LogoImage = styled(Animated.View)`
  flex: 1;
  position: relative;
  bottom: -20px;
  justify-content: flex-end;
`

const Paragraph = styled(Animated.Text)`
  padding-bottom: 20px;
  color: ${colors.accent.white};
  font-size: 24px;
  font-family: NotoSansKR-Medium;
  letter-spacing: -1.2px;
`

const Title = styled(Animated.Text)`
  flex: 1;
  color: ${colors.accent.white};
  font-family: NotoSansKR-Medium;
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -0.72px;
  z-index: 1;
`

const TitleImage = styled.View`
  margin: 0 auto 28px;
`
const BackGroundImage = styled(Animated.Image)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const InitialSplashScreen = () => {
  const risingFontAnimation = useRef(new Animated.Value(0)).current
  const iconAnimation = useRef(new Animated.Value(0)).current
  const opacityAnimation = useRef(new Animated.Value(0)).current

  const upwardAnimation = {
    transform: [
      {
        translateY: risingFontAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -45],
        }),
      },
    ],
  }

  const upAndDownAnimationIcon = {
    transform: [
      {
        translateY: iconAnimation,
      },
    ],
  }

  const fadeInAnimationBackground = {
    opacity: opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 0.8],
    }),
  }

  const fadeInAnimationIcon = {
    opacity: opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.05, 1],
    }),
  }

  const fadeInAnimation = {
    opacity: opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(risingFontAnimation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
        delay: 200,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
        delay: 200,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(iconAnimation, {
        toValue: -100,
        useNativeDriver: true,
        duration: 500,
        delay: 200,
        easing: Easing.out(Easing.ease),
      }),
    ]).start(() => {
      Animated.timing(iconAnimation, {
        toValue: -74,
        useNativeDriver: true,
        duration: 1000,
        delay: 600,
        easing: Easing.out(Easing.ease),
      }).start(() => {
        Animated.timing(opacityAnimation, {
          toValue: -2,
          useNativeDriver: true,
          duration: 400,
          delay: 600,
        }).start()
      })
    })
  }, [risingFontAnimation, opacityAnimation, iconAnimation])

  return (
    <>
      <StatusBar backgroundColor={LIGHT_ORANGE} barStyle="light-content" />
      <BackgroundView colors={[LIGHT_ORANGE, DARK_ORANGE]}>
        <LogoImage style={[upAndDownAnimationIcon, fadeInAnimationIcon]}>
          <Image
            source={require('../../assets/images/pngs/appIconLight.png')}
          />
        </LogoImage>
        <Paragraph style={[upwardAnimation, fadeInAnimation]}>{`개인 금고형
전자지갑,`}</Paragraph>
        <Title style={[upwardAnimation, fadeInAnimation]}>에이락 월렛</Title>
        <TitleImage>
          <Image
            source={require('../../assets/images/pngs/companyLetter.png')}
          />
        </TitleImage>
      </BackgroundView>
      <BackGroundImage
        source={require('~/assets/images/pngs/phone.png')}
        style={fadeInAnimationBackground}
      />
    </>
  )
}

export default InitialSplashScreen
