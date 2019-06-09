import React, { useCallback, useState } from 'react'
import { Icon } from 'semantic-ui-react'
import ImageDisplay from '../ImageDisplay'
import Tip from './tip'
import _ from 'lodash'

export interface SliderProps {
  sources: string[]
  index?: number
}

const Slider: React.FC<SliderProps> = props => {
  const { sources, index } = props
  const initialIndex = _.isNil(index) ? 0 : index
  // set slider size
  const [size, setSize] = useState(0)
  // set index
  const [currentIndex, setIndex] = useState(initialIndex)

  const frameRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setSize(node.getBoundingClientRect().width)
    }
  }, [])

  const styles = {
    wrapper: {
      width: '100%',
      height: size + 'px',
      position: 'relative' as 'relative',
      overflow: 'hidden',
      zIndex: 1,
    },
    leftControl: {
      position: 'absolute' as 'absolute',
      left: 10,
      top: size / 2 - 14,
      zIndex: 2,
      cursor: 'pointer',
      height: 28,
      width: 28,
      borderRadius: 14,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    rightControl: {
      position: 'absolute' as 'absolute',
      right: 10,
      top: size / 2 - 14,
      zIndex: 2,
      cursor: 'pointer',
      height: 28,
      width: 28,
      borderRadius: 14,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    container: {
      display: 'block',
      height: size + 'px',
      width: sources.length * size + 'px',
      position: 'absolute' as 'absolute',
      top: 0,
      left: -1 * currentIndex * size,
      transition: 'left 350ms',
      zIndex: 0,
    },
    tip: {
      position: 'absolute' as 'absolute',
      right: 10,
      top: 10,
      zIndex: 2,
    },
    loader: {
      display: 'flex',
    },
  }

  return (
    <div ref={frameRef} style={styles.wrapper}>
      {currentIndex > 0 ? (
        <div
          style={styles.leftControl}
          onClick={() => {
            setIndex(currentIndex - 1)
          }}
        >
          <Icon circular name="chevron left" />
        </div>
      ) : null}
      {currentIndex < sources.length - 1 ? (
        <div
          style={styles.rightControl}
          onClick={() => {
            setIndex(currentIndex + 1)
          }}
        >
          <Icon circular name="chevron right" />
        </div>
      ) : null}
      {sources.length > 1 ? (
        <div style={styles.tip}>
          <Tip current={currentIndex + 1} total={sources.length} />
        </div>
      ) : null}
      <div style={styles.container}>
        <div style={styles.loader}>
          {sources.map((source, index) => (
            <ImageDisplay key={index} source={source} size={size} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider
