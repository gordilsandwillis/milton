import React, { Component } from 'react'
import styled from '@emotion/styled'
import Logo from 'src/components/Logo'
import { useScrollPercentage } from 'react-scroll-percentage'
import ScrollListener from 'src/components/ScrollListener'
import withSizes from 'react-sizes'

import { typography, util } from 'src/styles'

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
	position: absolute;
	bottom: 0;
	z-index: 5;
	flex-grow: 0;
	flex-shrink: 0;
	width: 100%;
	background: rgba(0, 0, 0, .5);
	text-align: center;
	padding: 18px 0 2.2vw;
	will-change: transform;
	// transform: scale(${ ({ scroll }) => scroll > .1 ? scroll : .1 });
	transform: scale(${ ({ scroll }) => calculateScale(scroll) });
	${ ({ scroll }) => scroll >= .95 ? `
		transition: transform .3s ease-in-out;
	` : `` }
`

const StyledLogo = styled(Logo)`
	top: 0;
	left: 0;
	max-width: 100%;
	width: 100%;
	transform-origin: center bottom;
	// transform: scale(${ ({ scroll }) => calculateScale(scroll) });
	svg {
		display: block;
		color: red;
	}
`

const LargeLogo = ({ children, className, posYStart, posYEnd, scrollUnit, rotateStart, rotateEnd, scaleStart, scaleEnd, winWidth, winHeight }) => {
	const [ref, percentage] = useScrollPercentage({ threshold: 1 })
	// const { winWidth, winHeight } = this.props
	console.log(percentage)
	return (
		<Wrapper
			ref={ref}
			winWidth={winWidth}
			scroll={1 - percentage.toPrecision(3)}
		>
			<StyledLogo scroll={1 - percentage.toPrecision(3)} winHeight={winHeight} winWidth={winWidth}/>
		</Wrapper>
	)
}

const sizesToProps = ({ width, height }) => ({
	winWidth: width,
	winHeight: height
})

export default withSizes(sizesToProps)(LargeLogo)