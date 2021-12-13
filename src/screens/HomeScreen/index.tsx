import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppContainer, GoBackIcon, MenuIcon } from '~/components'
import { colors, fonts } from '~/constants'
import { View, Pressable, Text } from 'react-native'
import QrReadIcon from '~/assets/images/svgs/qrRead.svg'

interface Props {
  navigation: any
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: ${colors.accent.white};
`

const TestText1 = styled.Text`
  font-size: 32px;
  color: ${colors.grayscale.first};
`

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  height: 50px;
  background-color: #fff;
`

const HeaderText = styled.Text`
  font-size: 20px;
  font-family: ${fonts.notoSansKR.medium};
`

const HomeScreen = (props: Props) => {
  const { navigation } = props

  return (
    <AppContainer>
      <Header>
        <HeaderText>홈</HeaderText>
        <MenuIcon
          onSubmit={() => {
            navigation.push('Menu')
          }}
        />
      </Header>
      <Container>
        <TestText1>메뉴를 눌러주세요😊</TestText1>
      </Container>
    </AppContainer>
  )
}

export default HomeScreen
