import React, { useState } from 'react'
import styled from 'styled-components/native'

import { colors, fonts, length } from '~/constants'

import DropdownMenu from './Dropdown'

import CustomerSupport from '~/assets/images/svgs/customerSupport.svg'
import AppSettings from '~/assets/images/svgs/appSettings.svg'
import Arrow from '~/assets/images/svgs/leftArrow.svg'

const defaultTextStyle = { includeFontPadding: false }

const screenHeight = length.DEVICE_HEIGHT

//navigation 임시로 'Main' 설정, 추후 수정 필요
const customerSupport = [
  {
    id: '1',
    title: '서비스 안내',
    navi: 'Main',
  },
  {
    id: '2',
    title: '공지사항',
    navi: 'Main',
  },
  {
    id: '3',
    title: '자주 묻는 질문',
    navi: 'Main',
  },
  {
    id: '4',
    title: '1:1 문의',
    navi: 'Inquiry',
  },
  {
    id: '5',
    title: '개인정보 처리방침',
    navi: 'Main',
  },
  {
    id: '6',
    title: '서비스 이용약관',
    navi: 'Main',
  },
]

//navigation 임시로 'Main' 설정, 추후 수정 필요
const appSettings = [
  {
    id: '1',
    title: '앱 버전 정보',
    navi: 'AppVersionInfo',
  },
  {
    id: '2',
    title: '주소록 관리',
    navi: 'Main',
  },
  {
    id: '3',
    title: '알림 설정',
    navi: 'Main',
  },
  {
    id: '4',
    title: '인증 및 보안',
    navi: 'Main',
  },
  {
    id: '5',
    title: '친구 초대하기',
    navi: 'Main',
  },
]

const SubMenuView = styled.View`
  align-items: center;
  padding: ${screenHeight > 740 ? '20px 0' : '17px 0'};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayscale.sixth};
`

const SubMenuPress = styled.Pressable`
  flex-direction: row;
  align-items: center;
`

const SubMenuHeader = styled.View`
  flex-direction: row;
  align-items: center;
`

const SubMenuHeaderLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const SubMenuText = styled.Text`
  margin-left: 10px;
  color: ${colors.grayscale.third};
  font-family: ${fonts.notoSansKR.bold};
  font-size: 16px;
  text-align: center;
`

const UpperArrow = styled(Arrow)<{ isOpen: boolean[] }>`
  margin-right: 15px;
  transform: rotate(${({ isOpen }) => (isOpen[0] ? '270deg' : '90deg')});
`

const LowerArrow = styled(Arrow)<{ isOpen: boolean[] }>`
  margin-right: 15px;
  transform: rotate(${({ isOpen }) => (isOpen[1] ? '270deg' : '90deg')});
`

const SubMenu = () => {
  const [isOpen, setIsOpen] = useState([true, true])

  function toggleDrop(index: number) {
    const newIsOpen = [...isOpen]
    newIsOpen[index] = !isOpen[index]
    setIsOpen(newIsOpen)
  }

  return (
    <>
      <SubMenuView>
        <SubMenuPress onPress={() => toggleDrop(0)}>
          <SubMenuHeader>
            <SubMenuHeaderLeft>
              <CustomerSupport width={20} height={20} />
              <SubMenuText style={defaultTextStyle}>고객지원</SubMenuText>
            </SubMenuHeaderLeft>
            <UpperArrow isOpen={isOpen} />
          </SubMenuHeader>
        </SubMenuPress>
      </SubMenuView>
      {isOpen[0] && <DropdownMenu data={customerSupport} />}
      <SubMenuView>
        <SubMenuPress onPress={() => toggleDrop(1)}>
          <SubMenuHeader>
            <SubMenuHeaderLeft>
              <AppSettings width={20} height={20} />
              <SubMenuText style={defaultTextStyle}>앱 설정</SubMenuText>
            </SubMenuHeaderLeft>
            <LowerArrow isOpen={isOpen} />
          </SubMenuHeader>
        </SubMenuPress>
      </SubMenuView>
      {isOpen[1] && <DropdownMenu data={appSettings} />}
    </>
  )
}

export default SubMenu
