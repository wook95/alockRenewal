// https://www.notion.so/alwaysfun/SLIDE-UP-d5dd583777734183949b2678affca671

import React from 'react'
import { Platform } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { colors } from '~/constants'

interface Props {
  isVisible: boolean
  children: JSX.Element[] | JSX.Element
  onClose: () => void
  hasTopBar?: boolean
}

const defaultProps = {
  hasTopBar: false,
}

const Container = styled.View`
  position: relative;
  margin-top: auto;
  padding: 40px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.accent.white};
`

const BarWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: -15px;
  height: 5px;
  align-items: center;
`

const Bar = styled.View`
  width: 60px;
  height: 5px;
  border-radius: 100px;
  background-color: ${colors.accent.white};
`

const SlideUpContainer = (props: Props) => {
  const { isVisible, children, onClose, hasTopBar } = props
  return (
    <Modal
      avoidKeyboard
      backdropTransitionOutTiming={0}
      animationOutTiming={800}
      isVisible={isVisible}
      backdropOpacity={0.2}
      onBackdropPress={onClose}
      swipeDirection="down"
      onBackButtonPress={Platform.select({ android: onClose })}
      onSwipeComplete={Platform.select({ ios: onClose })}
      style={{ margin: 0 }}>
      <Container>
        {children}
        {hasTopBar && (
          <BarWrapper>
            <Bar />
          </BarWrapper>
        )}
      </Container>
    </Modal>
  )
}

SlideUpContainer.defaultProps = defaultProps
export default SlideUpContainer
