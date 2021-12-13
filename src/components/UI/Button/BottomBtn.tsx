import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { colors, fonts } from '~/constants'

interface Props {
  isDisabled: boolean
  contents: string
  onSubmit: () => void
}

// iOS 하단의 safe-area 값인 14px 추가
const BtnContainer = styled.Pressable<{
  disabled: boolean
}>`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${Platform.select({ ios: '86px', android: '72px' })};
  padding-bottom: ${Platform.select({ ios: '14px', android: '0px' })};
  background-color: ${props =>
    props.disabled ? colors.grayscale.fifth : colors.primary.medium};
`
const BtnText = styled.Text`
  color: ${colors.accent.white};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 18px;
`

const BottomBtn = (props: Props) => {
  /* 
  isDisabled: 버튼의 활성 / 비활성 상태 값(boolean)
  contents: 버튼의 텍스트 값
  onSubmit: 버튼의 수행 이벤트 함수
  */
  const { isDisabled, contents, onSubmit } = props

  return (
    <BtnContainer disabled={isDisabled} onPress={() => onSubmit()}>
      <BtnText>{contents}</BtnText>
    </BtnContainer>
  )
}

export default BottomBtn
