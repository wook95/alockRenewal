import React from 'react'
import styled from 'styled-components/native'

import HambugerMenuIcon from '~/assets/images/svgs/hamburgerMenu.svg'

interface Props {
  onSubmit: () => void
}

const IconSingleContainer = styled.Pressable`
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 14px;
  padding-left: 15px;
`
const MenuIcon = (props: Props) => {
  const { onSubmit } = props

  return (
    <IconSingleContainer onPress={() => onSubmit()}>
      <HambugerMenuIcon />
    </IconSingleContainer>
  )
}

export default MenuIcon
