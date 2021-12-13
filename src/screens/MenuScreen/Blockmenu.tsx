import React from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import { colors, fonts } from '~/constants'

import Wallet from '~/assets/images/svgs/wallet.svg'
import History from '~/assets/images/svgs/history.svg'
import Reward from '~/assets/images/svgs/reward.svg'

const defaultTextStyle = { includeFontPadding: false }

const MenuBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 10px 0;
  background-color: ${colors.primary.medium};
  border-radius: 12px;
  font-size: 16px;
`

const BlockMenus = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const BlockMenuBox = styled.Pressable`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const CenterBlockMenu = styled.Pressable`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-color: ${colors.accent.white};
  border-left-width: 1px;
  border-right-width: 1px;
`

const Menu = styled.Text`
  margin: 0 0 0 10px;
  color: ${colors.accent.white};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 14px;
`

const BlockMenu = () => {
  const navigation: any = useNavigation()

  return (
    <MenuBar>
      <BlockMenus>
        <BlockMenuBox onPress={() => navigation.navigate('Wallet')}>
          <Wallet />
          <Menu style={defaultTextStyle}>지갑</Menu>
        </BlockMenuBox>
      </BlockMenus>
      <BlockMenus>
        <CenterBlockMenu onPress={() => navigation.navigate('Main')}>
          <History />
          <Menu style={defaultTextStyle}>내역</Menu>
        </CenterBlockMenu>
      </BlockMenus>
      <BlockMenus>
        <BlockMenuBox onPress={() => navigation.navigate('Reward')}>
          <Reward />
          <Menu style={defaultTextStyle}>리워드</Menu>
        </BlockMenuBox>
      </BlockMenus>
    </MenuBar>
  )
}

export default BlockMenu
