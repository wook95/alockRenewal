import React from 'react'
import { FlatList, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import { colors, fonts, length } from '~/constants'

interface Props {
  data: {
    id: string
    title: string
    navi: string
  }[]
}

const screenHeight = length.DEVICE_HEIGHT

const defaultTextStyle = { includeFontPadding: false }

const Dropdown = styled.View`
  padding: 10px 24px;
  background-color: ${colors.grayscale.eighth};
`

const Menus = styled.View`
  flex-direction: row;
  width: 50%;
`

const MenusText = styled.Text`
  padding: ${screenHeight > 740 ? '12px 0' : '9px 0'};
  color: ${colors.grayscale.second};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 16px;
`

const DropdownMenu = (props: Props) => {
  const navigation: any = useNavigation()
  const { data } = props
  return (
    <Dropdown>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({ item }) => (
          <Menus>
            <Pressable onPress={() => navigation.navigate(`${item.navi}`)}>
              <MenusText style={defaultTextStyle}>{item.title}</MenusText>
            </Pressable>
          </Menus>
        )}
        keyExtractor={item => item.id}
      />
    </Dropdown>
  )
}

export default React.memo(DropdownMenu)
