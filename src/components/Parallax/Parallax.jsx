import React from 'react'
import styled from '@emotion/styled'
import { useScrollPercentage } from 'react-scroll-percentage'

const parallaxOffset = (num, outMin, outMax) => {
	// return (num - in_min) * (outMax - outMin) / (in_max - in_min) + outMin
	let offset = (num - 0) * (outMax - outMin) / (1 - 0) + outMin
	if (!offset) {
		return 0
	} else {
		return offset
	}
}

const ParallaxStyle = styled.div`
	display: inline-block;
	vertical-align: top;
	${ props => !props.disabled ? `
		transform: 	translate3d(0, ${ parallaxOffset(props.scroll, props.posYStart, props.posYEnd) }${ props.scrollUnit }, 0)
								rotate(${ parallaxOffset(props.scroll, props.rotateStart, props.rotateEnd) }deg)
								scale(${ parallaxOffset(props.scroll, props.scaleStart, props.scaleEnd) })` : `` };
`

const Parallax = ({ children, className, posYStart, posYEnd, scrollUnit, rotateStart, rotateEnd, scaleStart, scaleEnd }) => {
	const [ref, percentage] = useScrollPercentage({ threshold: 0 })
	return (
		<ParallaxStyle
			ref={ref}
			scroll={percentage.toPrecision(3)}
			className={className}
			posYStart={posYStart}
			posYEnd={posYEnd}
			rotateStart={rotateStart}
			rotateEnd={rotateEnd}
			scaleStart={scaleStart}
			scaleEnd={scaleEnd}
			scrollUnit={scrollUnit}
		>
			{children}
		</ParallaxStyle>
	)
}

Parallax.defaultProps = {
	posYStart: 0,
	posYEnd: 0,
	rotateStart: 0,
	rotateEnd: 0,
	scaleStart: 1,
	scaleEnd: 1,
	scrollUnit: 'px'
}

export default Parallax
