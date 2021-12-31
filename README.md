# 에이락 월렛 ALock Wallet (Lite)

- [에이락 월렛](https://www.alock.co.kr/)은 가상자산 리워드 서비스를 제공하는 앱으로, Ionic 5 기반 앱을 React Native로 개선하는 프로젝트에 참여하였습니다.
- 실제 앱 개발 프로젝트는 아직 진행 중이며, 본 repository는 인턴 3명이 4주간 작업한 내용을 결합한 lite 버전입니다.
- 기간 : 2021.11.15 ~ 2021.12.09
- 인원 : 3명

<br/>

## :computer: 사용 기술 및 개발 환경

|       분류       |   사용 언어 혹은 기술   |
| :--------------: | :---------------------: |
|       언어       |       **TypeScript**        |
|      프론트엔드       |       **React Native**, **React Navigation**, **React Hooks**, **Styled Components**  |
|   런타임 환경    |         **Node.js**         |
|   버전관리 툴    |    **Git, GitHub**    |
|       IDE        |   **Visual Studio Code**    |
| 커뮤니케이션       | **Slack, Notion**           |
|      그 외       | **ESLint, Prettier, Babel** |

<br/>

## 👨‍👩‍👧‍👦 Team

- [이욱창](https://github.com/wook95) : Splash(스플래시) & Inquiry(1:1 문의 등록) 스크린 구현
- [김지현](https://github.com/jihnk) : Menu(메뉴) & QrRead(QR 코드 스캔) 스크린 구현
- [이성재](https://github.com/sjhanslee) : Onboarding(온보딩), AppVersionInfo(앱 버전 정보) & InquiryConfirmation(1:1 문의 등록 완료) 스크린 및 OnboardingItem 컴포넌트 구현


<br/>

## 📑 직접 구현한 기능



### 1. Splash Screen (스플래시)

- `react-native-splash-screen` 라이브러리와 ios, android 네이티브로 처음 등장하는 배경을 만들어 구현
- animated를 이용해 3단계로 애니메이션을 구성

### 2. Inquiry Screen (1:1 문의 등록)

- UX를 고려하여 ref를 이용해 자동 focusing 기능 구현
- react-native-modal 라이브러리를 이용해 입력한 내용이 맞는지 한번 더 확인



<br/>

## 트러블 슈팅 

### 1. 애니메이션이 들어간 스플래시 스크린
 - react native로 애니메이션이 들어간 스플래쉬는 구현이 어려워, 스플래쉬인 척 하는 스크린을 만드는것으로 결정
 - ios, android 둘 다 네이티브로 최초의 이미지 만들어줌. 만
 - animated의 여러 메소드를 쓰고(parallel등 ), 콜백을 활용해 애니메이션의 순서 정함


### 2. 1:1 문의 스크린
- 실제 기기를 연결했을때 placeholder가 나오지 않는 버그:<br>`placeholderTextColor="#adb5bd"` 설정
- 리액트 프롭스 간 순서 문제:<br>  `TextInputProps` 의 프로퍼티로 넘긴 style 때문에, 그 전에 선언해논 프롭스 `includeFontPadding` 이 적용되 지 않아서, 순서를 바꿔주었다. (안드로이드의 text는 기본 패딩이 적용되어 해당 프롭스 필요)  
-  scrollTo 속성이 없어서 에러나는 ref:<br>  ref를 innerRef에도 담아보고, forwardRef를 써서 넘겼는데 자꾸 나오는
    `Ref.current.scrollTo is not a function` → scrollView의 ref 붙이고 ref를 변경하는 함수만 넘겨서 해결 → 
    ref.current가 스크롤뷰, 뷰, 텍스트인풋에서 다르게 나타남
- 키보드 사이즈에 따라 백그라운드의 색이 보이는 문제 발생: <br>
    [Android-Splash-Screen-구현](https://velog.io/@pish11010/Android-Splash-Screen-%EA%B5%AC%ED%98%84)을 보았을때 MainActivity에서 Theme을 복구를 안해주어서 나타났던 문제. 한번도 써보지 않았던 기술이라 하더라도
    그냥 되었다고 기뻐하는 정도를 넘어 제대로 구현해야한다고 생각함.
    
    ```java
    @Override
      public void onCreate(Bundle savedInstanceState){
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
      }
    ```
    
- onEndEditing vs onSubmitEditing 헷갈리던 함수:  
    공식문서에선, 수정이 끝났을때와 제출이 되었을때라고 되어있는데, 똑같아보여서 실험해봄<br>
    (키보드가 닫히지 않았을때) 키보드의 done(엔터) 버튼을 누르면 onSubmitEditing이 발생
    인풋창이 블러되었을때. 즉 수정이 끝났을때 온 서밋에디팅 발생   
    
- 인풋간 자동 focusing을 위해 많이 썼던 fowardRef 정리
    ```jsx
    forwardRef
    
    //1 익스포트 하는곳에서 묶어주고, props에서 forwardedRef로 받아옴!
     export default React.forwardRef((props: Props, ref: React.Ref<TextInput>) => {
       return <InputBox {...props} forwardedRef={ref} />
     })
    const {forwardedRef} = props
    <컴포넌트 ref={forwardedRef} />
    
    //2 처음부터 forwardRef로 묶어줌, 두번째 변수에 있는 이름으로 ref 사용
    const InputBox = React.forwardRef((props: Props, ref: React.Ref<TextInput>) => {
    ```
 
<br/>

## 📑 팀 구현 기능 상세

### 1. 공통 구현 사항

- `OnboardingItem`
  - 온보딩 및 각 "완료" 스크린에 사용되는 카드 컴포넌트를 가변적으로 구현

### 2. Onboarding Screen (온보딩)

- 자동, 수동 스크롤 가능한 온보딩 스크린 구현
- 자동 스크롤 시 `react-spring`을 활용한 crossfading 이미지 구현
- 수동 스크롤 시 `Animated` API의 interpolation을 활용한 이미지 구현
- `AsyncStorage`를 사용하여 앱 첫 launch 시에만 보이게 설계

### 3. Menu Screen (메뉴)

- `react-navigation` 라이브러리를 이용한 스크린 이동 구현
- `react-native-share` API를 활용한 공유기능 구현
- `<ScrollView>`를 활용한 배너 캐러셀 구현
- `<FlatList>`를 활용한 dropdown 메뉴 구현
- Submenu와 dropdown을 컴포넌트화하여 toggle 기능 구현

### 4. QR Code Scan Screen (QR 코드 스캔)

- `react-native-qrcode-scanner` 라이브러리를 활용한 QR 코드 스캔 화면 구현
- `react-navigation` 라이브러리를 이용한 스크린 이동 구현
- `<ImageBackground>`를 활용하여 View 구현


### 5. Inquiry Confirmation Screen (1:1 문의 등록 완료)

- `OnboardingItem`을 활용한 등록 완료 스크린 구현

### 6. App Version Info Screen (앱 버전 정보)

- `react-native-version-check` 라이브러리를 통해 사용 중인 앱 버전과 최신 앱 버전을 비교
- 두 버전이 다를 시 OS에 따라 Apple App Store 혹은 Google Play Store로 이동하는 '업데이트' 버튼을 조건부 렌더링으로 구현
- Device에 Store 앱이 없을 시 웹 스토어로 이동하게끔 예외처리

<br/>

## ※ References

- 본 repository는 [(주)에이락](https://a-fun.co.kr/)에 사전 허가를 받은 후에 만들었습니다. 이 코드를 활용하여 상업적인 이득을 취하거나 무단으로 배포할 경우에는 법적으로 문제 될 수 있습니다.
