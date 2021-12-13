import React from 'react'
import styled from 'styled-components/native'
import { BottomBtn } from '~/components'
import OnboardingItem from '~/components/Box/OnboardingItem' //update import route later to ~/constants

interface Props {
  navigation: any
}

const SafeAreaWrapper = styled.SafeAreaView`
  flex: 1;
`

const InquiryConfirmationScreen = (props: Props) => {
  const { navigation } = props

  const goToHome = () => {
    navigation.replace('Main')
  }

  return (
    <>
      <SafeAreaWrapper>
        <OnboardingItem
          topText={'1:1 문의'}
          orangeText={'등록 완료'}
          descriptionLineOne={'문의내용 등록이 완료 되었습니다.'}
          descriptionLineTwo={
            '빠른시일내에 남겨주신 이메일로 답변드리겠습니다.'
          }
          imageUrl={require('../../assets/images/pngs/phoneTouch.png')} //testing
        />
      </SafeAreaWrapper>
      <BottomBtn
        isDisabled={false}
        contents='홈 화면으로 이동'
        onSubmit={goToHome}
      />
    </>
  )
}

export default InquiryConfirmationScreen
