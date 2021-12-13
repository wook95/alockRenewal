import React from 'react'
import { Platform, Pressable } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '~/constants'
import { HomeScreen, WalletScreen, RewardScreen } from '~/screens'
import { MenuIcon } from '~/components'

import HomeIcon from '~/assets/images/svgs/home.svg'
import QrReadIcon from '~/assets/images/svgs/qrRead.svg'
import RewardOffIcon from '~/assets/images/svgs/rewardOff.svg'
import RewardOnIcon from '~/assets/images/svgs/rewardOn.svg'
import WalletOffIcon from '~/assets/images/svgs/walletOff.svg'
import WalletOnIcon from '~/assets/images/svgs/walletOn.svg'
import { useNavigation } from '@react-navigation/native'

const StyledSafeAreaView = styled(SafeAreaView)<{ edges: string[] }>`
  flex: 1;
  background-color: #fff;
`

const Tab = createBottomTabNavigator()

const defaultScreenOption = {
  headerShadowVisible: false,
  headerShown: false,
  tabBarStyle: {
    minHeight: 72,
    paddingTop: 12,
    paddingBottom: Platform.select({ ios: 26 }),
    justifyContent: 'center',
    backgroundColor: colors.primary.medium,
    paddingLeft: '8%',
    paddingRight: '8%',
  },
}

const tabBarLabelStyle = {
  fontSize: 10,
  fontFamily: 'NotoSansKR-Bold',
  color: colors.accent.white,
  paddingBottom: Platform.select({ android: 12 }),
  includeFontPadding: false,
}

const MainTabScreen = () => {
  const navigation = useNavigation()
  return (
    <StyledSafeAreaView edges={['top']}>
      <Tab.Navigator
        screenOptions={defaultScreenOption}
        initialRouteName='Home'>
        <Tab.Screen
          name='Wallet'
          component={WalletScreen}
          options={{
            tabBarLabel: '지갑',
            tabBarLabelStyle,
            tabBarIcon: ({ focused }) => {
              return <>{focused ? <WalletOnIcon /> : <WalletOffIcon />}</>
            },
          }}
        />
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: '',
            tabBarLabelStyle,
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  {focused ? (
                    <>
                      <Pressable
                        disabled={!focused}
                        style={[
                          { position: 'absolute' },
                          // { backgroundColor: '#000' },
                          { top: 20 },
                          { width: 45 },
                          { height: 45 },
                          { zIndex: 100 },
                        ]}
                        onPress={() => {
                          navigation.navigate('QrRead')
                        }}>
                        <QrReadIcon
                          style={[{ position: 'absolute' }]}
                          width={48}
                          height={48}
                        />
                      </Pressable>
                    </>
                  ) : (
                    <HomeIcon
                      width={48}
                      height={48}
                      style={[
                        { width: 1 },
                        { height: 1 },
                        { zIndex: -200 },
                        { position: 'absolute' },
                        { top: -30 },
                      ]}
                    />
                  )}
                </>
              )
            },
          }}
        />
        <Tab.Screen
          name='Reward'
          component={RewardScreen}
          options={{
            tabBarLabel: '리워드',
            tabBarLabelStyle,
            tabBarIcon: ({ focused }) => (
              <>{focused ? <RewardOnIcon /> : <RewardOffIcon />}</>
            ),
          }}
        />
      </Tab.Navigator>
    </StyledSafeAreaView>
  )
}

export default MainTabScreen
