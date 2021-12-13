import React from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { SelectBox, SlideUpContainer, QuestionSelectBtn } from '~/components'

import { colors, fonts } from '~/constants'
import { inquiryTitle } from './inquiryTypeData'

interface Props {
  question: React.ComponentState
  isQuestionModalOpen: React.ComponentState
  openQuestionModal: () => void
  closeQuestionModal: () => void
  selectQuestion: (insertedQuestion: string) => void
}

const InputContainer = styled.View`
  flex: 1;
  margin: 10px 0;
`

const InputTitle = styled.Text`
  margin-bottom: 10px;
  color: ${colors.grayscale.third};
  font-family: ${fonts.notoSansKR.bold};
`
const QuestionListHeader = styled.Text`
  color: ${colors.grayscale.third};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;
  font-family: ${fonts.notoSansKR.bold};
`

const SelectBoxContainer = (props: Props) => {
  const {
    question,
    openQuestionModal,
    isQuestionModalOpen,
    closeQuestionModal,
    selectQuestion,
  } = props
  return (
    <>
      <InputContainer>
        <InputTitle>{'문의유형'}</InputTitle>
        <SelectBox
          goToSelect={openQuestionModal}
          question={question}
          defaultQuestion={'문의유형을 선택해주세요.'}
        />
      </InputContainer>
      <SlideUpContainer
        isVisible={isQuestionModalOpen}
        onClose={closeQuestionModal}
        hasTopBar={false}>
        <FlatList
          data={inquiryTitle}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <QuestionListHeader>질문을 선택하세요</QuestionListHeader>
          }
          renderItem={({ item }) => (
            <QuestionSelectBtn
              selectedTitle={question}
              title={item.content}
              onSelect={selectQuestion}
            />
          )}
        />
      </SlideUpContainer>
    </>
  )
}

export default SelectBoxContainer
