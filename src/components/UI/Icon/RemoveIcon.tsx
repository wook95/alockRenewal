import React from 'react'
import styled from 'styled-components/native'

import RecycleBinSvg from '~/assets/images/svgs/header/recycleBin.svg'

interface Props {
  onSubmit: () => void | undefined
}

const IconSingleContainer = styled.Pressable`
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 14px;
  padding-left: 14px;
`

const RemoveIcon = (props: Props) => {
  const { onSubmit } = props
  return (
    <IconSingleContainer onPress={() => onSubmit()}>
      <RecycleBinSvg />
    </IconSingleContainer>
  )
}

export default RemoveIcon
