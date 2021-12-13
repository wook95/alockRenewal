import React from 'react'
import { useNavigation } from '@react-navigation/core'
import styled from 'styled-components/native'
import { Image } from 'react-native'
import { CtaLarge, ModalContainer } from '~/components'
import { colors } from '~/constants'

interface Props {
  onClose: () => void
  visible: React.ComponentState
}

const Header = styled.Text`
  margin: 10px 0;
  color: ${colors.grayscale.second};
  font-size: 24px;
  font-family: NotoSansKR-Bold;
`
const Content = styled.Text`
  color: ${colors.grayscale.third};
  font-family: NotoSansKR-Medium;
`

const VerticalMarginContent = styled(Content)`
  margin: 10px 0 30px;
`

const SubmitModalContainer = (props: Props) => {
  const navigator = useNavigation()
  const { onClose, visible } = props

  return (
    <ModalContainer modalVisible={visible} onClose={onClose}>
      <Image source={require('~/assets/images/pngs/bangDocument.png')} />
      <Header style={{ includeFontPadding: false }}>입력내용 확인 안내</Header>
      <Content style={{ includeFontPadding: false }}>
        입력하신 연락처 및 이메일을 통해
      </Content>
      <Content style={{ includeFontPadding: false }}>
        문의내용에 대한 답변을 드립니다.
      </Content>
      <VerticalMarginContent style={{ includeFontPadding: false }}>
        입력하신 내용이 정확한가요?
      </VerticalMarginContent>
      <CtaLarge
        isCancel={true}
        confirmContents={'완료'}
        confirmSubmit={() => {
          console.log('회원 문의 입력 완료, 추후 통신 코드 삽입 예정')
          onClose()
          navigator.replace('InquiryConfirmation')
        }}
        cancelContents={'다시 입력'}
        cancelSubmit={onClose}
      />
    </ModalContainer>
  )
}

export default SubmitModalContainer
