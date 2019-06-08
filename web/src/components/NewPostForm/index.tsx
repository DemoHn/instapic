import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  ReactNode,
} from 'react'
import styled from 'styled-components'
import { Form, TextArea } from 'semantic-ui-react'
import uuid from 'uuid/v4'
// components
import ImageUpload from '../ImageUpload'

const constants = {
  MAX_UPLOAD_IMAGES: 4,
  MAX_DESC_LENGTH: 200,
}

const MobileDescFrame = styled.div`
  display: flex;
  height: 30px;
  font-size: 15px;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`

const ImagesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  flex-wrap: wrap;
  flex-direction: row;
`

const DescriptionForm: React.FC = (props: any, ref: any) => {
  const [description, setDescription] = useState('')

  useImperativeHandle(ref, () => ({
    getDescription: () => {
      return description
    },
  }))

  return (
    <Form.Field>
      <MobileDescFrame>
        <label>
          <strong>Add Your Feelings...</strong>
        </label>
        <span>{`${description.length} / ${constants.MAX_DESC_LENGTH}`}</span>
      </MobileDescFrame>
      <TextArea
        placeholder="Tell us more"
        style={{ minHeight: 100 }}
        onChange={(e: any) => {
          setDescription(e.target.value)
          e.preventDefault()
        }}
      />
    </Form.Field>
  )
}

interface UploadFormState {
  imageIds: (number | null)[]
  imageNodes: ReactNode[]
  imageKeys: string[]
}

interface UploadFormProps {
  imgColumnItems: number
  uploadAction: (file: any) => Promise<{ id: number; url: string }>
}

class ImageUploadForm extends React.Component<UploadFormProps, UploadFormState> {
  public constructor(props: any) {
    super(props)

    this.state = {
      imageIds: [],
      imageNodes: [],
      imageKeys: [],
    }
    this.renderNewImageNode = this.renderNewImageNode.bind(this)
    this.handleImageRemoved = this.handleImageRemoved.bind(this)
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
  }

  private handleImageRemoved(key: string) {
    return () => {
      const { imageKeys, imageIds, imageNodes } = this.state
      const idx = imageKeys.findIndex(item => item === key)
      // image id
      const cpImageIds = [...imageIds]
      cpImageIds.splice(idx, 1)
      // image key
      const cpImageKeys = [...imageKeys]
      cpImageKeys.splice(idx, 1)
      // image node
      const cpImageNodes = [...imageNodes]
      cpImageNodes.splice(idx, 1)

      this.setState({
        imageIds: cpImageIds,
        imageNodes: cpImageNodes,
        imageKeys: cpImageKeys,
      })
    }
  }

  private handleUploadSuccess(key: string) {
    return (id: number) => {
      const { imageKeys, imageIds } = this.state
      const idx = imageKeys.findIndex(item => item === key)
      const cpImageIds = [...imageIds]
      cpImageIds[idx] = id

      this.setState({
        ...this.state,
        imageIds: cpImageIds,
      })
    }
  }

  private renderNewImageNode(): [string, ReactNode] {
    const { imgColumnItems, uploadAction } = this.props
    const gKey = uuid()

    // styles
    const ImageUploadWrapper = styled.div`
      flex: 0 0 ${100 / imgColumnItems - 3}%
      margin: ${6 / imgColumnItems - 0.1}%;
    `

    const node = (
      <ImageUploadWrapper key={gKey}>
        <ImageUpload
          identifier={gKey}
          uploadAction={uploadAction}
          onUploadSuccess={this.handleUploadSuccess(gKey)}
          onImageRemoved={this.handleImageRemoved(gKey)}
        />
      </ImageUploadWrapper>
    )

    return [gKey, node]
  }

  public componentDidMount() {
    const [newKey, newNode] = this.renderNewImageNode()
    const { imageIds, imageKeys, imageNodes } = this.state
    this.setState({
      imageIds: [...imageIds, null],
      imageKeys: [...imageKeys, newKey],
      imageNodes: [...imageNodes, newNode],
    })
  }

  public componentDidUpdate() {
    const { imageIds, imageKeys, imageNodes } = this.state
    if (
      imageIds.length < constants.MAX_UPLOAD_IMAGES &&
      imageIds[imageIds.length - 1] !== null
    ) {
      const [newKey, newNode] = this.renderNewImageNode()
      this.setState({
        imageIds: [...imageIds, null],
        imageKeys: [...imageKeys, newKey],
        imageNodes: [...imageNodes, newNode],
      })
    }
  }

  public getImageIds() {
    return this.state.imageIds.filter(item => item !== null)
  }

  public render() {
    return (
      <Form.Field>
        <MobileDescFrame>
          <label>
            <strong>Upload images...</strong>
          </label>
          <span>{`1 / ${constants.MAX_UPLOAD_IMAGES}`}</span>
        </MobileDescFrame>

        <ImagesContainer>{this.state.imageNodes}</ImagesContainer>
      </Form.Field>
    )
  }
}

const NewPostForm: React.FC<{
  imgColumnItems: number
  uploadAction: (file: any) => Promise<{ id: number; url: string }>
}> = (props: any, ref: any) => {
  // states
  const imgUploadFormRef = useRef(null)
  const descRef = useRef(null)
  const RefDescriptionForm = forwardRef(DescriptionForm)

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      if (descRef.current && imgUploadFormRef.current) {
        return {
          // @ts-ignore
          description: descRef.current.getDescription(),
          // @ts-ignore
          imageIds: imgUploadFormRef.current.getImageIds(),
        }
      }
      return null
    },
  }))

  return (
    <Form>
      <RefDescriptionForm ref={descRef} />
      <ImageUploadForm {...props} ref={imgUploadFormRef} />
    </Form>
  )
}
export default forwardRef(NewPostForm)
