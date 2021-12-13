// https://www.notion.so/alwaysfun/Radius18-9196a3f8c04940138ec5179c27b322c1
import React from 'react'
import styled from 'styled-components/native'
import { colors, fonts } from '~/constants'
import { Platform } from 'react-native'

interface Props {
  backgroundColor?: string | undefined
  borderColor?: string | undefined
  textColor?: string | undefined
  eventContents: string
  onPressBtn: () => void
}

const EventBtnContainer = styled.TouchableOpacity<{
  backgroundColor: string | undefined
  borderColor: string | undefined
}>`
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: 36px;
  margin-left: 10px;
  border-radius: 18px;
  border: 2px solid
    ${({ borderColor }) => borderColor || colors.grayscale.fourth};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.grayscale.fourth};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  shadow-color: ${Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.16)' : 'black'};
  shadow-opacity: 1;
  blur-radius: 6px;
  elevation: 7;
`

const BtnText = styled.Text<{ textColor: string | undefined }>`
  color: ${({ textColor }) => textColor || colors.grayscale.seventh};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 14px;
`

const EventBtn = (props: Props) => {
  const { backgroundColor, borderColor, textColor, eventContents, onPressBtn } =
    props
  return (
    <EventBtnContainer
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onPress={onPressBtn}>
      <BtnText
        textColor={textColor}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ includeFontPadding: false }}>
        {eventContents}
      </BtnText>
    </EventBtnContainer>
  )
}

export default EventBtn
