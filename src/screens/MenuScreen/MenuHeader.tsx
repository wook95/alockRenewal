import React from 'react'
import styled from 'styled-components/native'
import { colors, fonts } from '~/constants'

const defaultTextStyle = { includeFontPadding: false }

const Header = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`
const HeaderText = styled.Text`
  flex: 1;
  color: ${colors.accent.black};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 18px;
`

const MenuHeader = () => {
  return (
    <Header>
      <HeaderText style={defaultTextStyle}>메뉴</HeaderText>
    </Header>
  )
}

export default MenuHeader
