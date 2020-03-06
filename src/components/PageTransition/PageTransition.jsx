import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { withRouter } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group'
import { colors } from 'src/styles'

const timeout = 500
const hang = 0

const PageContent = styled.div`
  // transition: opacity ${ timeout }ms ease-in-out;
  display: flex;
  flex-direction: column;
  ${ ({ transitionStatus }) => transitionStatus === 'entering' && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
  ` }
  ${ ({ transitionStatus }) => transitionStatus === 'entered' && `
    opacity: 1;
  ` }
  ${ ({ transitionStatus }) => transitionStatus === 'exiting' && `
    opacity: 0;
    opacity: 1;
  ` }
  ${ ({ transitionStatus }) => transitionStatus === 'exited' && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
  ` }
`

const TransitionOverlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  background: ${ ({ bgColor }) => bgColor };
  ${ ({ overlay, effect }) => effect === 'fade' && `
    transition: opacity ${ timeout }ms ease-in-out;
    opacity: 0;
    ${ overlay && `opacity: 1` }
  ` }
  ${ ({ overlay, effect }) => effect === 'wipeUp' && `
    transition: transform ${ timeout }ms ease-in-out;
    transform-origin: 50% 0%;
    transform: scaleY(0);
    ${ overlay && `
      transform: scaleY(1);
      transform-origin: 50% 100%;
    ` }
  ` }
  ${ ({ overlay, effect }) => effect === 'wipeDown' && `
    transition: transform ${ timeout }ms ease-in-out;
    transform-origin: 50% 100%;
    transform: scaleY(0);
    ${ overlay && `
      transform: scaleY(1);
      transform-origin: 50% 0%;
    ` }
  ` }
  ${ ({ overlay, effect }) => effect === 'wipeRight' && `
    transition: transform ${ timeout }ms ease-in-out;
    transform-origin: 100% 50%;
    transform: scaleX(0);
    ${ overlay && `
      transform: scaleX(1);
      transform-origin: 0% 50%;
    ` }
  ` }
  ${ ({ overlay, effect }) => effect === 'wipeLeft' && `
    transition: transform ${ timeout }ms ease-in-out;
    transform-origin: 0% 50%;
    transform: scaleX(0);
    ${ overlay && `
      transform: scaleX(1);
      transform-origin: 100% 50%;
    ` }
  ` }
`

const transitionColors = [
  colors.bgColor
]

// var overlayColor = transitionColors[Math.floor(Math.random() * transitionColors.length)];

class PageTransition extends React.PureComponent {
  state = {
    overlay: false, // true If you want to transition on page load
    pathname: null,
    overlayColor: transitionColors[0]
  }

  handleEntered = (node, isAppearing) => {
    setTimeout(() => {
      this.setState({ overlay: false })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, hang)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { location } = nextProps
    console.log(nextProps)
    if (location.pathname !== prevState.pathname) { // Use If you want NO transition on page load
      // if (nextProps.location.pathname !== prevState.pathname || !prevState.pathname) { // Use If you want to transition on page load
      // TODO: when going to another product, still transition the page
      const productRouteChange = prevState.pathname ? (prevState.pathname && prevState.pathname.includes('product')) && (location.pathname && location.pathname.includes('product')) : true

      return {
        overlay: prevState.pathname !== null && !productRouteChange, // prevState.pathname If you want NO transition on page load
        pathname: location.pathname,
        overlayColor: transitionColors[Math.floor(Math.random() * transitionColors.length)]
      }
    } else {
      return null
    }
  }

  render () {
    const { children, location } = this.props
    const { overlay } = this.state

    let overlayColor = colors.bgColor
    const transitionEffect = 'fade'

    return (
      <Fragment>
        <TransitionGroup>
          <Transition
            key={location.pathname}
            unmountOnExit={true}
            appear={false}
            timeout={{
              enter: timeout,
              exit: timeout,
            }}
          >
            {status => (
              <PageContent transitionStatus={status}>
                {children}
              </PageContent>
            )}
          </Transition>
        </TransitionGroup>

        <Transition
          in={overlay}
          appear={false} // true If you want to transition on page load
          timeout={{
            enter: timeout,
            exit: timeout
          }}
          onEntered={this.handleEntered}
        >
          {status => (<TransitionOverlay effect={transitionEffect} overlay={overlay} transitionStatus={status} bgColor={overlayColor}/>)}
        </Transition>
      </Fragment>
    )
  }
}

export default withRouter(PageTransition);
