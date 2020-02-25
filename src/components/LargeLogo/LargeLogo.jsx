import React, { Component } from 'react'
import styled from '@emotion/styled'
import Logo from 'src/components/Logo'
import { useScrollPercentage, ScrollPercentage } from 'react-scroll-percentage'
import ScrollListener from 'src/components/ScrollListener'
import withSizes from 'react-sizes'
import { useInView } from 'react-intersection-observer'

import { typography, util, animations, colors } from 'src/styles'

const numberMap = (num, outMin, outMax) => {
	let offset = (num - 0) * (outMax - outMin) / (1 - 0) + outMin
	if (!offset) {
		return 0
	} else {
		if (offset >= outMin) {
			return offset.toPrecision(6)
		} else {
			return outMin.toPrecision(6)
		}
		console.log(offset)
	}
}

const calculateScale = (scroll) => {
	let scale = scroll
	if (scroll <= .1) {
		scale = .1
	} else if (scroll >= .95) {
		scale = .95
	}
	return scale
}

const Wrapper = styled.div`
	pointer-events: none;
	position: fixed;
	top: 18px;
	z-index: 5;
	flex-grow: 0;
	flex-shrink: 0;
	width: 100%;
	// background: rgba(0, 0, 0, .5);
	text-align: center;
	padding: 0 0 2.2vw;
	will-change: transform;
	transform-origin: center top;
	transform: scale(${ ({ scroll, winWidth }) => scroll >= 140/(winWidth) ? scroll * .95 : 140/(winWidth) });
`

const StyledLogo = styled(Logo)`
	top: 0;
	left: 0;
	max-width: 100%;
	width: 100%;
	transform: translate3d(0, ${ ({ winWidth, winHeight, scroll }) => scroll >= 0 ? ((winHeight - (winWidth * 0.22)) * scroll) : 0 }px, 0);
	svg {
		display: block;
		transition: color ${ animations.mediumSpeed } ease-in-out;
		color: ${ ({ scroll }) => scroll >= 0 ? colors.bgColor : colors.textColor };
	}
`

const LargeLogo = ({ children, className, posYStart, posYEnd, scrollUnit, rotateStart, rotateEnd, scaleStart, scaleEnd, winWidth, winHeight }) => {
	const [ref, percentage] = useScrollPercentage({ threshold: 1 })
	// const [ref, inView] = useInView({ triggerOnce: false })
	console.log('render logo')

	return (
  	<ScrollListener.Consumer>
  		{({ scrolledToTop, scrollY, pageHeight, pageWidth }) => {
  			return (
					<Wrapper
						ref={ref}
						winWidth={winWidth}
						winHeight={winHeight}
						scroll={1 - scrollY/(winHeight - 100)}
					>
						<StyledLogo
							winWidth={winWidth}
							winHeight={winHeight}
							scroll={1 - scrollY/(winHeight - 200)}
						/>
					</Wrapper>
				)
			}}
		</ScrollListener.Consumer>    
	)
}

const sizesToProps = ({ width, height }) => ({
	winWidth: width,
	winHeight: height
})

export default withSizes(sizesToProps)(LargeLogo)