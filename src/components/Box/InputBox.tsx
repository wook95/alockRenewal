import React from 'react'
import {
  Keyboard,
  TouchableOpacity,
  TextInputProps,
  Platform,
  TextInput,
} from 'react-native'
import styled from 'styled-components/native'

import { colors } from '~/constants'
import ClearIcon from '~/assets/images/svgs/clearBtn.svg'

interface Props {
  text: string
  setText: (arg0: string) => void
  placeholder?: string
  textInputProps?: TextInputProps
  forwardedRef?: React.Ref<TextInput>
}

const defaultProps = {
  placeholder: '답변을 입력하세요',
}

const InputBoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${colors.grayscale.seventh};
  border-radius: 8px;
`
const InputContainer = styled.View`
  width: 100%;
`
const Input = styled.TextInput`
  height: 46px;
  justify-content: center;
  padding: 13px 20px;
  color: ${colors.accent.black};
  font-family: NotoSansKR-Medium;
  font-size: 14px;
  line-height: 20px;
  ${Platform.select({ android: ' text-align-vertical: top' })}
`
const ClearBtnContainer = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top: -8px;
`

const InputBox = React.forwardRef((props: Props, ref: React.Ref<TextInput>) => {
  const { text, setText, placeholder, textInputProps } = props

  const onReset = () => {
    setText('')
  }
  const onSubmitEditing = () => {
    Keyboard.dismiss()
  }

  return (
    <InputBoxContainer>
      <InputContainer>
        <Input
          placeholder={placeholder}
          placeholderTextColor={colors.grayscale.fourth}
          value={text}
          selectTextOnFocus={false}
          selectionColor={colors.grayscale.fourth}
          onChangeText={setText}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={false}
          {...textInputProps}
          style={[{ includeFontPadding: false }, textInputProps?.style]}
          ref={ref}
        />
      </InputContainer>

      {text ? (
        <ClearBtnContainer onPress={onReset}>
          <ClearIcon />
        </ClearBtnContainer>
      ) : null}
      <TouchableOpacity />
    </InputBoxContainer>
  )
})

InputBox.defaultProps = defaultProps

export default InputBox
