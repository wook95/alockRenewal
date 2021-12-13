import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { useTransition, animated } from '@react-spring/native'

interface Props {
  imageUrl: number
  showFadingImages: boolean | undefined
}

const ImageWrapper = styled.View<{ showFadingImages: boolean | undefined }>`
  opacity: ${({ showFadingImages }) => (showFadingImages ? 1 : 0)};
`

const AnimatedImage = styled(animated(Image))`
  position: absolute;
`

const FadingImage = ({ imageUrl, showFadingImages }: Props) => {
  const transitions = useTransition(imageUrl, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
    expires: true,
  })

  return (
    <ImageWrapper showFadingImages={showFadingImages}>
      {transitions((styles, item) => {
        // AnimatedImage에 children을 안 줬다는 내용으로 빨간 줄이 뜨는데 문제없이 구현이 되는 것 같아서 일단 무시했습니다. -성재
        return (
          <AnimatedImage
            source={item}
            style={{
              ...styles,
              transform: [{ translateY: styles.opacity.to([0, 1], [40, 0]) }],
            }}
          />
        )
      })}
    </ImageWrapper>
  )
}

export default FadingImage
