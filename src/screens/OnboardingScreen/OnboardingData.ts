interface DataProps {
  id: number
  topText: string
  orangeText: string
  extraText?: string
  descriptionLineOne: string
  descriptionLineTwo: string
  imageUrl: number
}

const ONBOARDING_DATA: Array<DataProps> = [
  {
    id: 1,
    topText: '에이락 월렛,',
    orangeText: '안전보관',
    extraText: '하세요.',
    descriptionLineOne: '사용자의 편의성 및 보안성을',
    descriptionLineTwo: '극대화한 개인 금고형 지갑입니다.',
    imageUrl: require('../../assets/images/pngs/coinSafe.png'),
  },
  {
    id: 2,
    topText: '에이락 월렛,',
    orangeText: '자산관리',
    extraText: '하세요.',
    descriptionLineOne: '원하는 자산을 추가 및 관리하고',
    descriptionLineTwo: '자산목록 편집이 가능합니다.',
    imageUrl: require('../../assets/images/pngs/assetManagement.png'),
  },
  {
    id: 3,
    topText: '에이락 월렛,',
    orangeText: '간편거래',
    extraText: '하세요.',
    descriptionLineOne: '내가 가진 자산은 물론 리워드까지',
    descriptionLineTwo: '간편하게 거래할 수 있습니다.',
    imageUrl: require('../../assets/images/pngs/qrCodePayment.png'),
  },
]

export default ONBOARDING_DATA
