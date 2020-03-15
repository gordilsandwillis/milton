import React from 'react'
import styled from '@emotion/styled'
// import { useScrollPercentage } from 'react-scroll-percentage'
import { ScrollPercentage } from 'react-scroll-percentage'

const ParallaxStyle = styled.div`
	display: inline-block;
	vertical-align: top;
	${ props => !props.disabled ? `
		transform: 	translate3d(0, ${ props.speed * props.scroll }%, 0);
	` : `` };

`

const Parallax = ({ children, className, posYStart, posYEnd, scrollUnit, rotateStart, rotateEnd, scaleStart, scaleEnd, speed }) => {
	return (
		<ScrollPercentage threshold={0}>
			{({ percentage, ref, entry }) => (
				<ParallaxStyle
					ref={ref}
					speed={speed}
					scroll={percentage.toPrecision(3)}
					// scroll={1}
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
			)}
		</ScrollPercentage>
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
