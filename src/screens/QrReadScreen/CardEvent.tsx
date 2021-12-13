import React from 'react'
import styled from 'styled-components/native'

import { colors, fonts } from '~/constants'

import RightTailArrow from '~/assets/images/svgs/rightTailArrow.svg'

const defaultTextStyle = {
  includeFontPadding: false,
}

const CardEventView = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 67%;
`

const CardImage = styled.Image`
  width: 80px;
  height: 40px;
`

const EventTextView = styled.View`
  margin-left: 16.55px;
`

const AdBox = styled.View`
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 12px;
  background-color: ${colors.grayscale.fourth};
  border-radius: 12px;
`

const AdText = styled.Text`
  color: ${colors.accent.white};
  font-family: ${fonts.roboto.bold};
  font-size: 6px;
`

const EventText = styled.Text`
  color: ${colors.accent.white};
  font-family: ${fonts.notoSansKR.regular};
`

const EventTextBottom = styled.View`
  flex-direction: row;
  align-items: center;
`

const EventArrow = styled(RightTailArrow)`
  margin-left: 5px;
`

const CardEvent = () => {
  return (
    <CardEventView>
      <CardImage source={require('~/assets/images/pngs/Card.png')} />
      <EventTextView>
        <AdBox>
          <AdText style={defaultTextStyle}>AD</AdText>
        </AdBox>
        <EventText style={defaultTextStyle}>보라돌이 카드 신규회원</EventText>
        <EventTextBottom>
          <EventText style={defaultTextStyle}>연회비 캐시백 이벤트</EventText>
          <EventArrow />
        </EventTextBottom>
      </EventTextView>
    </CardEventView>
  )
}

export default CardEvent
