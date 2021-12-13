import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppContainer from '~/components/AppContainer'
import BlockMenu from './Blockmenu'
import Carousel from './Carousel'
import SubMenu from './SubMenu'
import { fonts } from '~/constants'
import { MenuIcon, GoBackIcon } from '~/components'

const StyledSafeAreaView = styled(SafeAreaView)<{ edges: string[] }>`
  flex: 1;
  background-color: #fff;
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

const MenuScreen = () => {
  return (
    <StyledSafeAreaView edges={['top']}>
      <AppContainer>
        <Header>
          <HeaderText>메뉴</HeaderText>
          <GoBackIcon />
        </Header>
        <>
          <BlockMenu />
          <Carousel />
          <SubMenu />
        </>
      </AppContainer>
    </StyledSafeAreaView>
  )
}

export default MenuScreen
