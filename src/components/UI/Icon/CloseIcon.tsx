import React from 'react'
import styled from 'styled-components/native'

import { RootStackParamList } from '~/screens/RootStackParamList'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import CloseSVG from '~/assets/images/svgs/close.svg'

const IconSingleContainer = styled.Pressable`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
`

const CloseIcon = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'Home'>>()
  return (
    <IconSingleContainer
      onPress={() => {
        if (navigation.canGoBack()) navigation.goBack()
        else navigation.navigate('Home')
      }}>
      <CloseSVG />
    </IconSingleContainer>
  )
}

export default CloseIcon
