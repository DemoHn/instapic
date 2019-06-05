// based on: https://github.com/echoulen/react-pull-to-refresh
import * as React from 'react'
import DefaultPulldown from './pulldown'
import DefaultRelease from './realease'
import DefaultRefresh from './refresh'
import DefaultBottomEnd from './bottomEnd'

export interface RefreshContainerProps {
  pullDownContent?: JSX.Element
  releaseContent?: JSX.Element
  refreshContent?: JSX.Element
  bottomEndContent?: JSX.Element
  pullDownThreshold: number
  bottomRefreshThreshold: number
  onTopRefresh: () => Promise<any>
  onBottomRefresh: () => Promise<any>
  triggerHeight: number
  startInvisible?: boolean
  backgroundColor?: string
}

export interface RefreshContainerState {
  refreshContainerThresholdBreached: boolean
  bottomThresholdBreached: boolean
  bottomEnd: boolean
  maxPullDownDistance: number
  maxBottomDistance: number
  onRefreshing: boolean
}

export class RefreshContainer extends React.Component<
  RefreshContainerProps,
  RefreshContainerState
> {
  private container: any

  private containerRef(container: any) {
    this.container = container
  }

  private pullDown: any
  private bottomRefresh: any

  private pullDownRef(pullDown: any) {
    this.pullDown = pullDown
    const maxPullDownDistance =
      this.pullDown &&
      this.pullDown.firstChild &&
      this.pullDown.firstChild['getBoundingClientRect']
        ? this.pullDown.firstChild['getBoundingClientRect']().height
        : 0
    this.setState({ maxPullDownDistance })
  }

  private bottomRefreshRef(bottomRefresh: any) {
    this.bottomRefresh = bottomRefresh
    const maxBottomDistance =
      this.bottomRefresh &&
      this.bottomRefresh.firstChild &&
      this.bottomRefresh.firstChild['getBoundingClientRect']
        ? this.bottomRefresh.firstChild['getBoundingClientRect']().height
        : 0
    this.setState({ maxBottomDistance })
  }

  private dragging = false
  private startY = 0
  private currentY = 0

  public constructor(initialProps: RefreshContainerProps) {
    super(initialProps)

    this.state = {
      refreshContainerThresholdBreached: false,
      bottomThresholdBreached: false,
      bottomEnd: false,
      maxPullDownDistance: 0,
      maxBottomDistance: 0,
      onRefreshing: false,
    }

    this.containerRef = this.containerRef.bind(this)
    this.pullDownRef = this.pullDownRef.bind(this)
    this.bottomRefreshRef = this.bottomRefreshRef.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }

  public componentDidMount(): void {
    if (!this.container) {
      return
    }

    this.container.addEventListener('touchstart', this.onTouchStart)
    this.container.addEventListener('touchmove', this.onTouchMove)
    this.container.addEventListener('touchend', this.onEnd)
    this.container.addEventListener('mousedown', this.onTouchStart)
    this.container.addEventListener('mousemove', this.onTouchMove)
    this.container.addEventListener('mouseup', this.onEnd)
    window.addEventListener('scroll', this.onScroll)
  }

  public componentWillUnmount(): void {
    if (!this.container) {
      return
    }

    this.container.removeEventListener('touchstart', this.onTouchStart)
    this.container.removeEventListener('touchmove', this.onTouchMove)
    this.container.removeEventListener('touchend', this.onEnd)
    this.container.removeEventListener('mousedown', this.onTouchStart)
    this.container.removeEventListener('mousemove', this.onTouchMove)
    this.container.removeEventListener('mouseup', this.onEnd)
    window.removeEventListener('scroll', this.onScroll)
  }

  private onTouchStart(e: any) {
    const { triggerHeight = 40 } = this.props
    this.startY = e['pageY'] || e.touches[0].pageY
    this.currentY = this.startY

    const top =
      this.container.getBoundingClientRect().top ||
      this.container.getBoundingClientRect().y ||
      0

    if (this.startY - top > triggerHeight) {
      return
    }

    this.dragging = true
    this.container.style.transition = 'transform 0.2s cubic-bezier(0,0,0.31,1)'
    this.pullDown.style.transition = 'transform 0.2s cubic-bezier(0,0,0.31,1)'
  }

  private onTouchMove(e: any) {
    if (!this.dragging) {
      return
    }

    this.currentY = e['pageY'] || e.touches[0].pageY
    if (this.currentY < this.startY) {
      return
    }

    e.preventDefault()

    if (this.currentY - this.startY >= this.props.pullDownThreshold) {
      this.setState({
        refreshContainerThresholdBreached: true,
      })
    }

    if (this.currentY - this.startY > this.state.maxPullDownDistance) {
      return
    }

    this.container.style.overflow = 'visible'
    this.container.style.transform = `translate(0px, ${this.currentY - this.startY}px)`
    this.pullDown.style.visibility = 'visible'
  }

  private onEnd() {
    this.dragging = false
    this.startY = 0
    this.currentY = 0

    if (!this.state.refreshContainerThresholdBreached) {
      this.pullDown.style.visibility = this.props.startInvisible ? 'hidden' : 'visible'
      this.initContainer()
      return
    }

    this.container.style.overflow = 'visible'
    this.container.style.transform = `translate(0px, ${this.props.pullDownThreshold}px)`
    this.setState(
      {
        onRefreshing: true,
      },
      () => {
        this.props.onTopRefresh().then(() => {
          this.initContainer()
          setTimeout(() => {
            this.setState({
              onRefreshing: false,
              bottomEnd: false,
              refreshContainerThresholdBreached: false,
            })
          }, 200)
        })
      }
    )
  }

  private onScroll() {
    const { bottomRefreshThreshold } = this.props

    // get outer height
    const containerHeight = this.container.clientHeight
    const windowHeight = window.innerHeight
    const scrollHeight = window.scrollY

    // even trigger the breach line
    if (windowHeight + scrollHeight - containerHeight > bottomRefreshThreshold) {
      this.setState({
        bottomThresholdBreached: true,
      })
    }
    if (windowHeight + scrollHeight <= containerHeight) {
      this.setState({
        bottomThresholdBreached: false,
      })
    }

    const { bottomThresholdBreached, bottomEnd } = this.state
    // do nothing when bottomEnd is shown
    if (bottomThresholdBreached && !bottomEnd) {
      this.bottomRefresh.style.visibility = 'visible'
      // call function
      this.props.onBottomRefresh().then(hasMore => {
        this.initContainer()
        setTimeout(() => {
          this.setState({
            bottomThresholdBreached: false,
            bottomEnd: !hasMore,
          })
          if (hasMore) {
            this.bottomRefresh.style.visibility = 'hidden'
          }
        }, 200)
      })
    } else if (!bottomEnd) {
      this.bottomRefresh.style.visibility = 'hidden'
    }
  }
  private initContainer() {
    requestAnimationFrame(() => {
      if (this.container) {
        this.container.style.overflow = 'auto'
        this.container.style.transform = 'none'
      }
    })
  }

  private renderPullDownContent() {
    const { releaseContent, pullDownContent, refreshContent, startInvisible } = this.props
    const { onRefreshing, refreshContainerThresholdBreached } = this.state

    const content = onRefreshing
      ? refreshContent || <DefaultRefresh />
      : refreshContainerThresholdBreached
      ? releaseContent || <DefaultRelease />
      : pullDownContent || <DefaultPulldown />
    const contentStyle: React.CSSProperties = {
      position: 'absolute',
      overflow: 'hidden',
      left: 0,
      right: 0,
      top: 0,
      visibility: startInvisible ? 'hidden' : 'visible',
    }
    return (
      <div id="ptr-pull-down" style={contentStyle} ref={this.pullDownRef}>
        {content}
      </div>
    )
  }

  private renderBottomRefreshContent() {
    const { refreshContent, bottomEndContent } = this.props
    const { bottomEnd } = this.state
    const bottomRefStyle: React.CSSProperties = {
      visibility: 'hidden',
    }
    return (
      <div id="ptr-bottom-refresh" ref={this.bottomRefreshRef} style={bottomRefStyle}>
        {bottomEnd
          ? bottomEndContent || <DefaultBottomEnd />
          : refreshContent || <DefaultRefresh />}
      </div>
    )
  }

  public render() {
    const { backgroundColor } = this.props
    const containerStyle: React.CSSProperties = {
      height: 'auto',
      overflow: 'hidden',
      WebkitOverflowScrolling: 'touch',
      position: 'relative',
      zIndex: 1,
    }

    if (backgroundColor) {
      containerStyle.backgroundColor = backgroundColor
    }
    return (
      <div id="ptr-parent" style={containerStyle}>
        {this.renderPullDownContent()}
        <div id="ptr-container" ref={this.containerRef} style={containerStyle}>
          {this.props.children}
        </div>
        {this.renderBottomRefreshContent()}
      </div>
    )
  }
}

export default RefreshContainer
