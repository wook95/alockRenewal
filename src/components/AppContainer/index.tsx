import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { colors } from '~/constants'
interface Props {
  style?: StyleProp<ViewStyle> | undefined
  children?: JSX.Element | JSX.Element[]
}

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${colors.accent.white};
`

const AppContainer = (props: Props) => {
  /*
  style: 추가 style 작성,
  children: 하위 컴포넌트 
  */
  const { style, children } = props
  return (
    <Container style={{ ...(style as Record<string, unknown>) }}>
      {children}
    </Container>
  )
}

export default AppContainer
