import React from 'react'
import styled from 'styled-components/native'
import { colors } from '~/constants'

interface Props {
  isCancel: boolean
  confirmContents: string
  cancelContents?: string
  confirmSubmit: () => void
  cancelSubmit?: () => void
}

const BtnContainer = styled.View<{ isCancel: boolean }>`
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const SelectBtnContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: ${colors.primary.medium};
  border-radius: 15px;
`
const CancelContainer = styled.TouchableOpacity`
  align-items: center;
  width: 100%;
  margin-top: 20px;
`
const SelectBtnCText = styled.Text`
  color: ${colors.accent.white};
  font-family: NotoSansKR-Bold;
  font-size: 18px;
`
const CancelBtnText = styled.Text`
  color: ${colors.grayscale.fourth};
  font-family: NotoSansKR-Medium;
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: ${colors.grayscale.fourth};
`

const CtaLarge = (props: Props) => {
  /*
  isCancel: CTA 대형 버튼의 부정 버튼 여부(boolean)
  confirmContents: 긍정 버튼의 텍스트 값
   cancelContents: 부정 버튼의 텍스트 값
   confirmSubmit: 긍정 버튼의 이벤트 함수
   cancelSubmit: 부정 버튼의 이벤트 함수
  */
  const {
    isCancel,
    confirmContents,
    cancelContents,
    confirmSubmit,
    cancelSubmit,
  } = props
  const defaultTextStyle = { includeFontPadding: false }
  return (
    <BtnContainer isCancel={isCancel}>
      <SelectBtnContainer onPress={confirmSubmit}>
        <SelectBtnCText style={defaultTextStyle}>
          {confirmContents}
        </SelectBtnCText>
      </SelectBtnContainer>
      {/* isCancel props 시, 부정 버튼 비활성화 */}
      {isCancel && (
        <CancelContainer onPress={cancelSubmit}>
          <CancelBtnText style={defaultTextStyle}>
            {cancelContents}
          </CancelBtnText>
        </CancelContainer>
      )}
    </BtnContainer>
  )
}

export default CtaLarge
