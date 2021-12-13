import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VersionCheck from 'react-native-version-check'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { RootStackParamList } from '~/screens/RootStackParamList'

import MainTabScreen from './MainTabScreen'

import {
  InitialSplashScreen,
  InquiryConfirmationScreen,
  InquiryScreen,
  MenuScreen,
  QrReadScreen,
  AppVersionInfoScreen,
  OnboardingScreen,
} from '~/screens'

const ALREADY_LAUNCHED = 'alreadyLaunched'
const SPLASH_DURATION = 3150
const Stack = createNativeStackNavigator<RootStackParamList>()

const MainNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)
  const [currentVersionNum, setCurrentVersionNum] = useState<string | null>(
    null,
  )
  const [latestVersionNum, setLatestVersionNum] = useState<string | null>(null)

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem(ALREADY_LAUNCHED)
      if (value == null) {
        // 처음 앱을 여는 경우
        AsyncStorage.setItem(ALREADY_LAUNCHED, 'true')
        setTimeout(() => setIsFirstLaunch(true), SPLASH_DURATION)
      } else {
        // 전에 앱을 열어본 경우
        setTimeout(() => setIsFirstLaunch(false), SPLASH_DURATION)
      }
    } catch (error) {
      console.error('checkOnboarding Error', error)
    }
  }

  useEffect(() => {
    checkOnboarding()
  }, [])

  useEffect(() => {
    const currVerNum = `${VersionCheck.getCurrentVersion()}.${VersionCheck.getCurrentBuildNumber()}` // 예) '1.0' + '.' + '1' = '1.0.1'

    /* setTimeout을 사용하여 백엔드 요청을 흉내낸 코드입니다. 백엔드 연동시 getLatestVersionInfo 함수를 지우시고 
    graphQL 혹은 react-native-version-check library의 함수로 최신버전 정보(x.x.x)를 요청하는 코드로 대체하시면
    되겠습니다. 정보를 받고와서 setLatestVersionNum로 값을 저장하셔야 합니다. -성재 */
    const getLatestVersionInfo = async () => {
      const MOCK_LATEST_VERSION_NUMBER = '1.4.1' // temp 변수
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLatestVersionNum(MOCK_LATEST_VERSION_NUMBER)
    }

    setCurrentVersionNum(currVerNum)
    getLatestVersionInfo()
  }, [])

  const StyledSafeAreaView = styled(SafeAreaView)<{ edges: string[] }>`
    flex: 1;
  `

  if (isFirstLaunch === null) {
    return <InitialSplashScreen />
  }
  return (
    // <StyledSafeAreaView edges={['top']}>
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'Onboarding' : 'Main'}
      screenOptions={{
        headerShown: false,
        // headerShadowVisible: false,
        // headerBackVisible: false,
      }}>
      <Stack.Screen name='Main' component={MainTabScreen} />
      <Stack.Screen name='Onboarding' component={OnboardingScreen} />
      <Stack.Screen name='AppVersionInfo'>
        {() => (
          <AppVersionInfoScreen
            currentVersionNum={currentVersionNum}
            latestVersionNum={latestVersionNum}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name='Menu' component={MenuScreen} />
      <Stack.Screen name='QrRead' component={QrReadScreen} />
      <Stack.Screen name='Inquiry' component={InquiryScreen} />
      <Stack.Screen
        name='InquiryConfirmation'
        component={InquiryConfirmationScreen}
      />
    </Stack.Navigator>
    // </StyledSafeAreaView>
  )
}

export default MainNavigator
