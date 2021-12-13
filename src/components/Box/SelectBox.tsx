// https://www.notion.so/alwaysfun/5d0973437f174321a84dfccc2e6e7764?p=44dd2dab77194d569dc6d36ca8ce6d79
import React from 'react'
import styled from 'styled-components/native'
import { colors } from '~/constants'

import SelectIcon from '~/assets/images/svgs/selectArrow.svg'

interface Iprops {
  goToSelect: () => void
  question?: string
  defaultQuestion?: string
}

const Container = styled.View`
  width: 100%;
`
const TouchBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 13px 20px;
  background-color: ${colors.accent.white};
  border-width: 1px;
  border-radius: 5px;
  border-color: ${colors.grayscale.sixth};
`
const InputText = styled.Text<{ isLight?: boolean }>`
  align-items: center;
  color: ${props =>
    props.isLight ? colors.grayscale.second : colors.grayscale.fourth};
  font-family: NotoSansKR-Medium;
`

// goToSelect : navigation 이동하는 함수
// question : 선택한 질문 표시
/* defaultQuestion : 제일 먼저 나오는 기본 질문. 프롭스로 넘어오지 않을 경우 '질문을 선택해주세요' 출력*/
const SelectBox = (props: Iprops) => {
  const {
    goToSelect,
    question,
    defaultQuestion = '질문을 선택해주세요.',
  } = props
  const hasNotSelected =
    props.question === '' ||
    props.question === undefined ||
    props.question === null
  return (
    <Container>
      <TouchBtn onPress={goToSelect} activeOpacity={1}>
        <InputText
          isLight={hasNotSelected}
          style={{ includeFontPadding: false }}>
          {hasNotSelected ? defaultQuestion : question}
        </InputText>
        <SelectIcon width={6} height={11} />
      </TouchBtn>
    </Container>
  )
}

export default SelectBox
