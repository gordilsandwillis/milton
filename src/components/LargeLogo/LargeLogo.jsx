import React, { Component } from 'react'
import styled from '@emotion/styled'
import Logo from 'src/components/Logo'
import { useScrollPercentage, ScrollPercentage } from 'react-scroll-percentage'
import ScrollListener from 'src/components/ScrollListener'
import withSizes from 'react-sizes'

import { typography, util, animations, colors, mq } from 'src/styles'

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
	position: sticky;
	// position: absolute;
	bottom: 0;
	top: 0px;
	z-index: 5;
	height: 0;
	top: ${ 35 + 23 }px;
	${ mq.extraLargeAndBelow } {
		height: 0;
		top: ${ 31 + 22 }px;
	}
	${ mq.largerAndBelow } {
		height: 0;
		top: ${ 26 + 20 }px;
	}
	${ mq.mediumAndBelow } {
		height: 0;
		top: ${ 22 + 20 }px;
	}
	flex-grow: 0;
	flex-shrink: 0;
	width: 100%;
	background: rgba(0, 0, 0, .5);
	text-align: center;
	will-change: transform;
`

const StyledLogo = styled(Logo)`
	position: absolute;
	left: 0;
	bottom: 0;
	max-width: 100%;
	width: 100%;
	transform-origin: center bottom;
	transform: scale(${ ({ scroll, winWidth }) => scroll * .95 >= 160/(winWidth) ? scroll * .95 : 160/(winWidth) }) translate3d(0, ${ ({ scroll }) => scroll > 0 ? -2.2 : 0 }vw, 0);
	${ mq.extraLargeAndBelow } {
		transform: scale(${ ({ scroll, winWidth }) => scroll * .95 >= 140/(winWidth) ? scroll * .95 : 140/(winWidth) }) translate3d(0, ${ ({ scroll }) => scroll > 0 ? -2.2 : 0 }vw, 0);
	}
	${ mq.largerAndBelow } {
		transform: scale(${ ({ scroll, winWidth }) => scroll * .9 >= 120/(winWidth) ? scroll * .9 : 120/(winWidth) }) translate3d(0, ${ ({ scroll }) => scroll > 0 ? -1 : 0 }vw, 0);
		bottom: ${ ({ scroll }) => 4 * scroll }vw;
	}
	${ mq.mediumAndBelow } {
		transform: scale(${ ({ scroll, winWidth }) => scroll * .87 >= 100/(winWidth) ? scroll * .87 : 100/(winWidth) }) translate3d(0, ${ ({ scroll }) => scroll > 0 ? -1.2 : 0 }vw, 0);
		bottom: ${ ({ scroll }) => 7 * scroll }vw;
	}
	svg {
		display: block;
		transition: color ${ animations.mediumSpeed } ease-in-out;
		color: ${ ({ scroll }) => scroll >= .1 ? colors.bgColor : colors.textColor };
	}
`

const Context = React.createContext('scroll-context');

const LargeLogo = ({ className, winWidth, winHeight, toggleHeaderCollapse }) => {

	return (
		<ScrollPercentage onChange={ (percentage) => {
			console.log(percentage)
			if (percentage > .9) {
				toggleHeaderCollapse(true)
			} else {
				toggleHeaderCollapse(false)
			}
		} }>
			{({ percentage, ref, entry }) => (
				<Wrapper
					ref={ref}
					scroll={1 - percentage.toPrecision(3)}
				>
					<StyledLogo
						winWidth={winWidth}
						winHeight={winHeight}
						scroll={1 - percentage.toPrecision(3)}
					/>
				</Wrapper>
			)}
		</ScrollPercentage>
	)
}

const sizesToProps = ({ width, height }) => ({
	winWidth: width,
	winHeight: height
})

export default withSizes(sizesToProps)(LargeLogo)