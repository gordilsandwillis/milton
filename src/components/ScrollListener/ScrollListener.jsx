import React from 'react'
import _ from 'lodash'
import { passiveListener } from 'src/utils/feature-detect'
import * as wndw from 'src/utils/wndw'

const defaultValue = {
  scrolledToTop: true,
  scrolledToBottom: false,
  pageHeight: 0,
  pageWidth: 0,
  scrollY: 0,
  hasScrolled: false,
  scrolledUp: false,
  doScroll: _.noop,
}

const { Provider, Consumer } = React.createContext(defaultValue)

class ScrollListener extends React.Component {
  static Consumer = Consumer;

  state = defaultValue

  componentDidMount () {
    this.observe()
    this.resizeHandler()
    window.addEventListener('resize', this.resizeHandler)
  }

  componentWillUnmount () {
    this.unobserve()
    window.removeEventListener('resize', this.resizeHandler)
  }

  resizeHandler = () => {
    const pageHeight = document.body.clientHeight
    const pageWidth = document.body.clientWidth
    if (this.state.pageHeight !== pageHeight) {
      this.setState({ pageHeight: pageHeight })
    }
    if (this.state.pageWidth !== pageWidth) {
      this.setState({ pageWidth: pageWidth })
    }
  }

  _scrollHandler = () => {
    const newScrollY = Math.max(
      0,
      wndw.scrollY()
    )

    const { pageHeight } = this.state

    const delta = newScrollY - this.lastScrollY
    this.lastScrollY = newScrollY

    if (this.state.ignoreScroll || isNaN(delta) || this.state.ignoreScroll) {
      return
    }

    const scrolledUp = delta < 0

    if (delta === 0) {
      return
    }

    const newState = {}
    if (this.state.scrolledUp !== scrolledUp) {
      newState.scrolledUp = scrolledUp
    }

    if (!this.state.hasScrolled && this.lastScrollY > 0) {
      newState.hasScrolled = true
    }

    if (newScrollY === 0 && !this.state.scrolledToTop) {
      newState.scrolledToTop = true
    } else {
      newState.scrolledToTop = false
    }

    newState.scrolledToBottom = newScrollY >= pageHeight - window.innerHeight * 1.2
    newState.scrollY = newScrollY

    this.setState(newState)
  }

  // scrollHandler = _.throttle(this._scrollHandler, 100);
  scrollHandler = this._scrollHandler;

  observe = () => {
    window.addEventListener('scroll', this.scrollHandler, passiveListener() ? { passive: true } : false)
  }

  unobserve = () => {
    window.removeEventListener('scroll', this.scrollHandler, passiveListener() ? { passive: true } : false)
  }

  doScroll = (targetY, duration = 500) => {
    return new Promise(resolve => {
      // Tell scroll listener to ignore until we're done scrolling
      this.setState({
        ignoreScroll: true
      }, () => {
        // ignore flag set, now start scrolling
        wndw.scrollTo(targetY, duration).then(
          () => {
            resolve()
            window.setTimeout(() => {
              // scroll complete
              // use timeout to add buffer before re-enabling scroll listening
              // to handle timing edge cases
              this.setState({
                ignoreScroll: false
              })
            },
            100
            )
          })
      })
    })
  }

  render () {
    const {
      scrolledToTop,
      scrolledToBottom,
      scrollY,
      scrolledUp,
      hasScrolled,
      pageHeight,
      pageWidth
    } = this.state

    const { children } = this.props

    return (
      <Provider
        value={{
          scrolledToTop,
          scrolledToBottom,
          scrollY,
          scrolledUp,
          hasScrolled,
          pageHeight,
          pageWidth,
          doScroll: this.doScroll,
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default ScrollListener
