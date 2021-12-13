import React from 'react'
import styled from 'styled-components/native'

import Logo from '~/assets/images/svgs/logo.svg'

import CardEvent from './CardEvent'
import Camera from './CameraView'
import CloseCircle from './CloseCircle'
import Text from './Text'

const BackgroundImage = styled.ImageBackground`
  flex: 1;
`

const QrScanView = styled.View`
  flex: 1;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

const LogoSvg = styled(Logo)`
  position: absolute;
  top: 7%;
  left: 20px;
`

const Background = () => {
  return (
    <BackgroundImage
      source={require('~/assets/images/pngs/qrScan.png')}
      resizeMode='cover'>
      <QrScanView>
        <LogoSvg />
        <Text />
        <Camera />
        <CardEvent />
        <CloseCircle />
      </QrScanView>
    </BackgroundImage>
  )
}

export default Background
