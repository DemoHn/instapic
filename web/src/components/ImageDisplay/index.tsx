import React, { useState, useEffect } from 'react'

export interface ImageDisplayProps {
  source: string
  size: number
  backgroundColor?: string
}

export interface ImageSize {
  width: number
  height: number
}

const calculateImageSize = (size: number, target?: HTMLImageElement): ImageSize => {
  if (!target) {
    return {
      width: 0,
      height: 0,
    }
  }
  const originalWidth = target.naturalWidth
  const originalHeight = target.naturalHeight
  const widthRatio = size / originalWidth
  const heightRatio = size / originalHeight
  if (widthRatio < heightRatio) {
    return {
      width: originalWidth * widthRatio,
      height: originalHeight * widthRatio,
    }
  } else {
    return {
      width: originalWidth * heightRatio,
      height: originalHeight * heightRatio,
    }
  }
}

const ImageDisplay: React.FC<ImageDisplayProps> = props => {
  const { source, backgroundColor, size } = props

  // control load image
  const [loadImage, setLoadImage] = useState(false)
  // image elem
  const [imageRef, setImageRef] = useState<HTMLImageElement>()
  // image size
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 })

  // load image after wrapper size is calculated
  useEffect(() => {
    if (size) {
      setLoadImage(true)
    }
  }, [size])
  // define styles
  const styles = {
    wrapper: {
      width: size + 'px',
      height: size + 'px',
      backgroundColor: backgroundColor || 'rgba(220, 220, 220, 0.5)',
      position: 'relative' as 'relative',
    },
    image: {
      position: 'absolute' as 'absolute',
      display: 'block',
      left: (size - imageSize.width) / 2,
      top: (size - imageSize.height) / 2,
      width: imageSize.width,
      height: imageSize.height,
    },
  }
  return (
    <div style={styles.wrapper}>
      {loadImage ? (
        <img
          src={source}
          alt=""
          style={styles.image}
          ref={(node: any) => setImageRef(node)}
          onLoad={() => {
            setImageSize(calculateImageSize(size, imageRef))
          }}
        />
      ) : null}
    </div>
  )
}

export default ImageDisplay
