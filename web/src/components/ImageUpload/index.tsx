import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import ImageDisplay from '../ImageDisplay'

export interface ImageUploadError {
  title: string
  subTitle: string
}
const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -999;
`

const FileUplaodFrame = styled.div`
  display: flex;
  width: 100%;
  transition: opacity 500ms;
`

const NoneImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  border: 2px dashed #aaa;
  justify-content: center;
  align-items: center;
  color: #aaa;
  cursor: pointer;
`
const IconWrapper = styled.span`
  color: #aaa;
  font-size: 1.5em;
`

const ImageDisplayWrapper = styled.div`
  position: relative;
  border: 1px solid #aaa;
`

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  height: 20px;
  width: 20px;
  cursor: pointer;
`
const readFile = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // Read the image via FileReader API and save image result in state.
    reader.onload = function(e: any) {
      // Add the file name to the data URL
      let dataURL = e.target.result
      dataURL = dataURL.replace(';base64', `;name=${file.name};base64`)
      resolve({ file, dataURL })
    }

    reader.readAsDataURL(file)
  })
}

const hasExtension = (fileName: string, extensions: string[]) => {
  const pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$'
  return new RegExp(pattern, 'i').test(fileName)
}

const handleFileUpload = (
  props: ImageExactUploadProps,
  setIsUploaded: any,
  setFile: any
) => async (e: any) => {
  // since we only limit one file...
  const file = e.target.files[0]
  // file validations
  if (!hasExtension(file.name, props.allowedExtensions)) {
    const extsStr = props.allowedExtensions.join(',')
    // handle error
    props.onUploadFail({
      title: 'Image upload validation error',
      subTitle: `invalid filename format! only accept ${extsStr} format!`,
    })
    return
  }

  if (file.size > props.maxFileSize) {
    props.onUploadFail({
      title: 'Image upload validation error',
      subTitle: 'file size has exceeds maximum allowed size!',
    })
    return
  }
  // parse file
  const fileObject = await readFile(file)
  // upload action
  const uploadAction = props.uploadAction
  return uploadAction(file)
    .then((url: string) => {
      setIsUploaded(true)
      // @ts-ignore
      setFile(fileObject.dataURL)
      props.onUploadSuccess(url)
    })
    .catch((err: any) => {
      setIsUploaded(false)
      props.onUploadFail(err)
    })
}

const fadeOutFrame = (eProps: ImageExactUploadProps, frameElem: any) => () => {
  frameElem.current.style.opacity = 0
  // display: none after timeout
  setTimeout(() => {
    frameElem.current.style.display = 'none'
    eProps.onImageRemoved()
  }, 600)
}

const defaultImageUploadProps = {
  maxFileSize: 16 * 1024 * 1024, //16M
  allowedExtensions: ['.jpg', '.jpeg', '.bmp', '.png'],
  uploadAction: (file: string) => {},
  onUploadSuccess: (previewUrl: string) => {},
  onUploadFail: (error: ImageUploadError) => {
    window.alert(error.title + ': ' + error.subTitle)
  },
  onImageRemoved: () => {},
}

export interface ImageUploadProps {
  uploadAction?: Function
  onUploadSuccess?: Function
  onUploadFail?: Function
  onImageRemoved?: Function
  maxFileSize?: number
  allowedExtensions?: string[]
}

interface ImageExactUploadProps {
  uploadAction: Function
  onUploadSuccess: Function
  onUploadFail: Function
  onImageRemoved: Function
  maxFileSize: number
  allowedExtensions: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = props => {
  const frameElem = useRef(null)
  const fileInputElem = useRef(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [file, setFile] = useState()
  const [size, setSize] = useState(0)

  const eProps: ImageExactUploadProps = Object.assign(defaultImageUploadProps, props)
  // readjust size
  useEffect(() => {
    if (frameElem && frameElem.current) {
      const current = frameElem.current as any
      current.style.height = current.clientWidth + 'px'
      setSize(current.clientWidth)
    }
  }, [frameElem])
  return (
    <FileUplaodFrame ref={frameElem}>
      {!isUploaded ? (
        <NoneImageContainer
          onClick={() => {
            if (fileInputElem && fileInputElem.current) {
              const current = fileInputElem.current as any
              current.click()
            }
          }}
        >
          <IconWrapper>
            <Icon name="add" />
          </IconWrapper>
          <FileInput
            type="file"
            name="file"
            ref={fileInputElem}
            onClick={(e: any) => {
              e.target.value = null
            }}
            onChange={handleFileUpload(eProps, setIsUploaded, setFile)}
          />
        </NoneImageContainer>
      ) : (
        <ImageDisplayWrapper>
          <ImageDisplay source={file} size={size} />
          <CloseButtonWrapper onClick={fadeOutFrame(eProps, frameElem)}>
            <Icon name="close" circular inverted size="small" />
          </CloseButtonWrapper>
        </ImageDisplayWrapper>
      )}
    </FileUplaodFrame>
  )
}

export default ImageUpload
