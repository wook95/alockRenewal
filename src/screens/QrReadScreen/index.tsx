import React from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'

import Background from './BackgroundImage'

const QrScanView = styled.View`
  flex: 1;
`

const QrReadScreen = () => {
  return (
    <QrScanView>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <Background />
    </QrScanView>
  )
}

export default QrReadScreen
