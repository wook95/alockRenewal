import React, { useState } from 'react'
import styled, { css } from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

import { colors, fonts } from '~/constants'

interface Props {
  selectedTitle: string
  title: string
  description?: string
  onSelect: (title: string) => void
}

interface SelectedProps {
  isSelected: boolean
}

const Container = styled.Pressable<SelectedProps>`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
  width: 100%;
  height: 46px;
  border-radius: 8px;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${colors.accent.white};
          border-width: 2px;
          border-style: solid;
          border-color: ${colors.primary.medium};
        `
      : css`
          background-color: ${colors.grayscale.seventh};
        `}
`

const Title = styled.Text<SelectedProps>`
  margin-left: 10px;
  font-family: ${fonts.notoSansKR.medium};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.7px;

  color: ${({ isSelected }) =>
    isSelected ? colors.primary.medium : colors.grayscale.third};
`

const Description = styled.Text<SelectedProps>`
  margin-left: auto;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.24px;
  font-family: ${fonts.notoSansKR.medium};

  color: ${({ isSelected }) =>
    isSelected ? colors.grayscale.third : colors.grayscale.fourth};
`

const QuestionSelectBtn = (props: Props) => {
  const { selectedTitle, title, description, onSelect } = props

  const isSelected = selectedTitle === title
  const iconColor = isSelected ? colors.primary.medium : colors.grayscale.sixth

  return (
    <Container isSelected={isSelected} onPress={() => onSelect(title)}>
      <Icon name="checkmark-circle" size={20} color={iconColor} />
      <Title isSelected={isSelected}>{title}</Title>
      {description && (
        <Description isSelected={isSelected}>{description}</Description>
      )}
    </Container>
  )
}

export default QuestionSelectBtn
