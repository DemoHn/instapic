import React, { useCallback, useState } from 'react'
import ImageDisplay from '../ImageDisplay'

export interface SliderProps {
  sources: string[]
}
const Slider: React.FC<SliderProps> = props => {
  const { sources } = props

  // set slider size
  const [size, setSize] = useState(0)
  // set container offset
  const [offset, setOffset] = useState(0)
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
    },
    container: {
      display: 'block',
      height: size + 'px',
      width: sources.length * size + 'px',
      position: 'absolute' as 'absolute',
      top: 0,
      left: offset,
    },
    loader: {
      display: 'flex',
    },
  }
  return (
    <div ref={frameRef} style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.loader}>
          {sources.map(source => (
            <ImageDisplay source={source} size={size} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slider
