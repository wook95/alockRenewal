import React from 'react'
import styled from 'styled-components/native'

import { colors, fonts } from '~/constants'

const defaultTextStyle = {
  includeFontPadding: false,
}

const TextView = styled.View`
  position: absolute;
  align-items: center;
  top: 20%;
`

const QrTextTop = styled.Text`
  color: ${colors.accent.white};
  margin-bottom: 10px;
  font-family: ${fonts.notoSansKR.regular};
  font-size: 18px;
`

const QrTextBottom = styled.Text`
  color: ${colors.accent.white};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 12px;
`

const Text = () => {
  return (
    <TextView>
      <QrTextTop style={defaultTextStyle}>
        QR코드를 스캔해 바로 송금하세요!
      </QrTextTop>
      <QrTextBottom style={defaultTextStyle}>
        #가상자산 송금 #리워드 송금
      </QrTextBottom>
    </TextView>
  )
}

export default Text
