import React from 'react'
import { Linking } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import styled from 'styled-components/native'

import LeftTop from '~/assets/images/svgs/leftTop.svg'
import RightTop from '~/assets/images/svgs/rightTop.svg'
import LeftBottom from '~/assets/images/svgs/leftBottom.svg'
import RightBottom from '~/assets/images/svgs/rightBottom.svg'

const onSuccess = (e: { data: string }) => {
  Linking.openURL(e.data).catch(err => console.error('An error occured', err))
}

const CameraView = styled.View`
  position: absolute;
  height: 216px;
  width: 216px;
  top: 30%;
  overflow: hidden;
`

const LeftTopSvg = styled(LeftTop)`
  position: absolute;
  opacity: 0.9;
`

const LeftBottomSvg = styled(LeftBottom)`
  position: absolute;
  top: 188px;
  opacity: 0.9;
`

const RightTopSvg = styled(RightTop)`
  position: absolute;
  top: 0px;
  left: 188px;
  opacity: 0.9;
`

const RightBottomSvg = styled(RightBottom)`
  position: absolute;
  top: 188px;
  left: 188px;
  opacity: 0.9;
`

const CornerBorder = styled.View`
  position: relative;
  width: 216px;
  height: 216px;
`

const BorderedCamera = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  top: 8px;
  left: 8px;
  overflow: hidden;
`

const Camera = () => {
  return (
    <CameraView>
      <BorderedCamera>
        <QRCodeScanner onRead={onSuccess} reactivate={true} />
      </BorderedCamera>
      <CornerBorder>
        <LeftTopSvg />
        <LeftBottomSvg />
        <RightTopSvg />
        <RightBottomSvg />
      </CornerBorder>
    </CameraView>
  )
}

export default Camera
