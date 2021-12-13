/*
editor:
description:
소스 예제:https://www.notion.so/alwaysfun/Modal-fb3860b0c89645fcbac5d427beb79495
*/

import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { colors } from '~/constants'
interface Props {
  modalVisible: boolean
  onClose: () => void
  children?: JSX.Element | JSX.Element[]
}

const ModalContents = styled.View`
  align-items: center;
  padding: 40px;
  border-radius: 26px;
  background-color: ${colors.accent.white};
`

const ModalContainer = (props: Props) => {
  /*
  modalVisible: Modal 창의 visible(boolean),
  children: Modal 창 내의 렌더링 관리(ex.아이콘, 버튼)
  */

  const { modalVisible, children, onClose } = props
  return (
    <Modal
      style={[
        { justifyContent: 'flex-end' },
        { position: 'relative' },
        { top: -60 },
      ]}
      isVisible={modalVisible}
      animationIn="slideInUp"
      onBackdropPress={onClose}
      backdropOpacity={0.2}
      swipeDirection="down"
      onBackButtonPress={Platform.select({ android: onClose })}
      onSwipeComplete={Platform.select({ ios: onClose })}>
      <ModalContents>{children}</ModalContents>
    </Modal>
  )
}

export default ModalContainer
