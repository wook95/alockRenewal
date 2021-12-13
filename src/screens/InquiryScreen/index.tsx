import React, { useRef, useState } from 'react'
import {
  ScrollView,
  Platform,
  Image,
  TextInput,
  TextInputProps,
} from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { GoBackIcon, MenuIcon, BottomBtn, InputBox } from '~/components'
import { colors, fonts } from '~/constants'
import SubmitModalContainer from './SubmitModalContainer'
import SelectBoxContainer from './SelectBoxContainer'
import { useNavigation } from '@react-navigation/native'

interface StateBundleType {
  text: React.ComponentState
  setText:
    | React.Dispatch<React.SetStateAction<string>>
    | ((arg0: string) => void)
}
interface StateBundle {
  username: StateBundleType
  phoneNumber: StateBundleType
  email: StateBundleType
  inquiryContents: StateBundleType
  [props: string]: any
}

interface InputData {
  textInputProps: TextInputProps
  [props: string]: any
}

const INPUT_DATA: InputData[] = [
  {
    title: '이름',
    text: 'username',
    textInputProps: {
      placeholder: '문의하시는분 성함을 입력하세요.',
    },
  },
  {
    title: '연락처',
    text: 'phoneNumber',
    textInputProps: {
      placeholder: '전화번호를 입력하세요.',
      keyboardType: 'number-pad',
      maxLength: 13,
      returnKeyType: 'done',
    },
  },
  {
    title: '이메일',
    text: 'email',
    textInputProps: {
      placeholder: '답변받을 메일 주소를 입력해주세요.',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      autoCorrect: false,
      autoCompleteType: 'email',
    },
  },
  {
    title: '문의내용',
    text: 'inquiryContents',
    textInputProps: {
      placeholder: '문의내용을 입력해주세요.',
      style: { height: 200 },
      multiline: true,
    },
  },
]

const sortPhoneNumber = (value: string) => {
  if (!value) {
    return ''
  }
  value = value.replace(/[^0-9]/g, '')
  const result: string[] = []
  let restNumber = ''
  // 지역번호와 나머지 번호로 나누기
  if (value.startsWith('02')) {
    // 서울 02 지역번호
    result.push(value.substr(0, 2))
    restNumber = value.substring(2)
  } else if (value.startsWith('1')) {
    // 지역 번호가 없는 경우
    // 1xxx-yyyy
    restNumber = value
  } else {
    // 나머지 3자리 지역번호
    // 0xx-yyyy-zzzz
    result.push(value.substr(0, 3))
    restNumber = value.substring(3)
  }

  if (restNumber.length === 7) {
    // 7자리만 남았을 때는 xxx-yyyy
    result.push(restNumber.substring(0, 3))
    result.push(restNumber.substring(3))
  } else {
    result.push(restNumber.substring(0, 4))
    result.push(restNumber.substring(4))
  }
  return result.filter(val => val).join('-')
}

const defaultTextStyle = Platform.select({
  android: { includeFontPadding: false },
})

const Container = styled(SafeAreaView)<{ edges: string[] }>`
  flex: 1;
  background-color: #f8f9fa;
`

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`

const Header = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 0 5px;
  padding-top: 10px;
`
const LogoImage = styled.View`
  flex: 1;
`

const Title = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  padding: 0 20px;
`

const TitleText = styled.View`
  flex: 4.5;
`

const TitleStrong = styled.Text`
  color: #495057;
  font-size: 24px;
  font-family: ${fonts.notoSansKR.black};
`

const TitleNormal = styled.Text`
  color: #495057;
  font-size: 24px;
  font-family: ${fonts.notoSansKR.medium};
`
const Contents = styled.View`
  padding: 20px;
  margin-top: 40px;
  background-color: ${colors.accent.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px 0px 15px #868e9629;
`

const ContentDescriptionBox = styled.View`
  margin-bottom: 10px;
`

const ContentsDescription = styled.Text`
  margin-bottom: 6px;
  color: #868e96;
  font-size: 12px;
  font-family: ${fonts.notoSansKR.medium};
  letter-spacing: -0.6px;
`

const InputContainer = styled.View`
  flex: 1;
  margin: 10px 0;
`

const InputTitle = styled.Text`
  margin-bottom: 10px;
  color: ${colors.grayscale.third};
  font-family: ${fonts.notoSansKR.bold};
`

const InquiryScreen = () => {
  const navigation = useNavigation()
  const [questionKind, setQuestionKind] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [inquiryContents, setInquiryContents] = useState('')
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const stateBundle: StateBundle = {
    username: {
      text: username,
      setText: setUsername,
    },
    phoneNumber: {
      text: phoneNumber,
      setText: (text: string) => {
        setPhoneNumber(sortPhoneNumber(text))
      },
    },
    email: {
      text: email,
      setText: setEmail,
    },
    inquiryContents: {
      text: inquiryContents,
      setText: setInquiryContents,
    },
  }

  const scrollRef = useRef<ScrollView>(null)
  const refInput: Array<React.RefObject<TextInput>> = []
  refInput[0] = useRef(null)
  refInput[1] = useRef(null)
  refInput[2] = useRef(null)
  refInput[3] = useRef(null)
  const openQuestionModal = () => setIsQuestionModalOpen(true)
  const closeQuestionModal = () => setIsQuestionModalOpen(false)
  const openSubmitModal = () => setIsSubmitModalOpen(true)
  const closeSubmitModal = () => setIsSubmitModalOpen(false)

  const selectQuestion = (insertedQuestion: string) => {
    setQuestionKind(insertedQuestion)
    closeQuestionModal()
    if (!scrollRef?.current || !refInput[0]?.current) return
    scrollRef?.current.scrollTo({ x: 0, y: 350, animated: true })
    refInput[0].current.focus()
  }

  const isValid =
    questionKind &&
    username &&
    phoneNumber?.length > 9 &&
    /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(email) &&
    inquiryContents
      ? true
      : false

  const scrollToMultiline = () => {
    if (!scrollRef?.current) return
    scrollRef?.current.scrollTo({ x: 0, y: 550, animated: true })
  }

  return (
    <Container edges={['top']}>
      <StyledKeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}>
        <ScrollView ref={scrollRef}>
          <Header>
            <GoBackIcon />
            <MenuIcon
              onSubmit={() => {
                navigation.push('Menu')
              }}
            />
          </Header>
          <Title>
            <LogoImage>
              <Image source={require('~/assets/images/pngs/message.png')} />
            </LogoImage>
            <TitleText>
              <TitleStrong style={defaultTextStyle}>1:1문의</TitleStrong>
              <TitleNormal style={defaultTextStyle}>
                내용을 입력해주세요.
              </TitleNormal>
            </TitleText>
          </Title>
          <Contents>
            <ContentDescriptionBox>
              <ContentsDescription style={defaultTextStyle}>
                * 문의를 남겨주시면 빠른 시일내에 답변을 드립니다.
              </ContentsDescription>
              <ContentsDescription style={defaultTextStyle}>
                * 등록하신 메일을 통해 답변을 드리니 정확하게 입력해주세요.
              </ContentsDescription>
            </ContentDescriptionBox>
            <SelectBoxContainer
              question={questionKind}
              isQuestionModalOpen={isQuestionModalOpen}
              closeQuestionModal={closeQuestionModal}
              openQuestionModal={openQuestionModal}
              selectQuestion={selectQuestion}
            />
            {INPUT_DATA.map((input, index) => {
              return (
                <InputContainer key={input.title}>
                  <InputTitle>{input.title}</InputTitle>
                  <InputBox
                    text={stateBundle[input.text].text}
                    setText={stateBundle[input.text].setText}
                    textInputProps={{
                      onSubmitEditing: () => {
                        if (refInput.length - 1 === index) return
                        refInput[index + 1].current?.focus()
                      },
                      onFocus: () => {
                        if (refInput.length - 1 === index) scrollToMultiline()
                      },
                      ...input.textInputProps,
                    }}
                    ref={refInput[index]}
                  />
                </InputContainer>
              )
            })}
          </Contents>
          <BottomBtn
            contents='다음'
            isDisabled={!isValid}
            onSubmit={() => {
              openSubmitModal()
            }}
          />
        </ScrollView>
        <SubmitModalContainer
          onClose={closeSubmitModal}
          visible={isSubmitModalOpen}
        />
      </StyledKeyboardAvoidingView>
    </Container>
  )
}

export default InquiryScreen
