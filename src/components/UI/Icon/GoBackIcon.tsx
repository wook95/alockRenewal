import React from 'react'
import styled from 'styled-components/native'

import { RootStackParamList } from '~/screens/RootStackParamList'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import LeftArrowSVG from '~/assets/images/svgs/leftArrow.svg'

const IconSingleContainer = styled.Pressable`
  justify-content: center;
  padding-right: 20px;
`

const GoBackIcon = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'Home'>>()
  return (
    <IconSingleContainer
      onPress={() => {
        if (navigation.canGoBack()) navigation.goBack()
        else navigation.navigate('Home')
      }}>
      <LeftArrowSVG />
    </IconSingleContainer>
  )
}

export default GoBackIcon
