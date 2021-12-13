import React from 'react'
import { Linking, Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { AppContainer, EventBtn } from '~/components'
import { colors, fonts } from '~/constants'

const defaultTextStyle = { includeFontPadding: false }

const styles = StyleSheet.create({
  appContainerStyle: {
    justifyContent: 'space-between',
    backgroundColor: colors.grayscale.eighth,
  },
})

interface Props {
  currentVersionNum: string | null
  latestVersionNum: string | null
}

const CurrentVersionInfoWrapper = styled.View`
  align-items: center;
  margin-top: 100px;
`

const AppIcon = styled.Image`
  margin-bottom: 40px;
`

const CurrentVersionText = styled.Text`
  margin-bottom: 5px;
  color: ${colors.grayscale.second};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 16px;
`

const CurrentVersionNumber = styled.Text`
  color: ${colors.grayscale.fourth};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 14px;
`

const LatestVersionInfoWrapper = styled.View<{
  currentVersionNum: string | null
  latestVersionNum: string | null
}>`
  flex-direction: row;
  padding: ${({ currentVersionNum, latestVersionNum }) =>
      currentVersionNum === latestVersionNum ? '24px' : '15px'}
    24px;
  border-radius: 12px;
  background-color: ${colors.accent.white};
  box-shadow: 0px 0px 15px
    ${Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.16)' : colors.accent.black};
  elevation: 7;
`

const LeftTextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const LatestVersionText = styled.Text`
  margin-right: 5px;
  color: ${colors.grayscale.third};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 12px;
`

const LatestVersionNumber = styled.Text`
  color: ${colors.grayscale.third};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 12px;
`

const InUseText = styled.Text`
  color: ${colors.grayscale.second};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 12px;
`

const AppVersionInfoScreen = (props: Props) => {
  const { currentVersionNum, latestVersionNum } = props
  const { bottom } = useSafeAreaInsets()

  const openAppStore = async () => {
    // 현재 구버전 링크들입니다. 한국 앱 스토어가 없는 기기/시뮬레이터에는 웹이 열리고 주소가 유효하지 않다고 뜨기도 합니다.
    // Apple 앱 스토어 링크
    const APPLE_APP_STORE_LINK =
      'itms-apps://itunes.apple.com/kr/app/%EC%97%90%EC%9D%B4%EB%9D%BD-%EC%9B%94%EB%A0%9B-alock-wallet/id1576791642?mt=8'
    // Apple 앱 스토어 웹 링크 (백업)
    const APPLE_APP_STORE_WEB_LINK =
      'https://apps.apple.com/kr/app/%EC%97%90%EC%9D%B4%EB%9D%BD-%EC%9B%94%EB%A0%9B-alock-wallet/id1576791642'
    // Google 플레이 스토어 링크
    const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.alock.wallet'
    // Google 플레이 스토어 웹 링크 (백업)
    const GOOGLE_PLAY_STORE_WEB_LINK =
      'https://play.google.com/store/apps/details?id=com.alock.wallet'

    try {
      if (Platform.OS === 'ios') {
        const isSupported = await Linking.canOpenURL(APPLE_APP_STORE_LINK)
        Linking.openURL(
          isSupported ? APPLE_APP_STORE_LINK : APPLE_APP_STORE_WEB_LINK,
        ).catch(console.error)
      } else {
        const isSupported = await Linking.canOpenURL(GOOGLE_PLAY_STORE_LINK)
        Linking.openURL(
          isSupported ? GOOGLE_PLAY_STORE_LINK : GOOGLE_PLAY_STORE_WEB_LINK,
        ).catch(console.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AppContainer style={styles.appContainerStyle}>
      <>
        <CurrentVersionInfoWrapper>
          <AppIcon source={require('~/assets/images/pngs/appIconMedium.png')} />
          <CurrentVersionText style={defaultTextStyle}>
            현재버전
          </CurrentVersionText>
          <CurrentVersionNumber style={defaultTextStyle}>
            {currentVersionNum}
          </CurrentVersionNumber>
        </CurrentVersionInfoWrapper>
        {latestVersionNum && (
          <LatestVersionInfoWrapper
            currentVersionNum={currentVersionNum}
            latestVersionNum={latestVersionNum}
            style={{ bottom: bottom + 25 }}>
            <LeftTextWrapper>
              <LatestVersionText style={defaultTextStyle}>
                최신버전
              </LatestVersionText>
              <LatestVersionNumber style={defaultTextStyle}>
                {latestVersionNum}
              </LatestVersionNumber>
            </LeftTextWrapper>
            {currentVersionNum === latestVersionNum ? (
              <InUseText style={defaultTextStyle}>사용 중입니다.</InUseText>
            ) : (
              <EventBtn
                backgroundColor={colors.primary.medium}
                borderColor={colors.primary.medium}
                eventContents={'업데이트'}
                onPressBtn={openAppStore}
              />
            )}
          </LatestVersionInfoWrapper>
        )}
      </>
    </AppContainer>
  )
}

export default AppVersionInfoScreen
