import React from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import CloseBtn from '~/assets/images/svgs/closeCircle.svg'

const CloseCircleBtn = styled.Pressable`
  position: absolute;
  top: 87%;
`

const CloseCircleView = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`

const CloseCircleSvg = styled(CloseBtn)`
  position: absolute;
`

const CloseCircle = () => {
  const navigation: any = useNavigation()

  return (
    <CloseCircleBtn onPress={() => navigation.goBack()}>
      <CloseCircleView>
        <CloseCircleSvg />
      </CloseCircleView>
    </CloseCircleBtn>
  )
}

export default CloseCircle
