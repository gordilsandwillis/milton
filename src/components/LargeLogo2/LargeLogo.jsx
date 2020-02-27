import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import Logo from 'src/components/Logo'
import { ScrollPercentage } from 'react-scroll-percentage'
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

const Scroller = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	z-index: 4;
	pointer-events: none;
`

const Wrapper = styled.div`
	pointer-events: none;
	position: sticky;
	bottom: 0;
	z-index: 5;
	height: 0;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	top: calc(${ 35 + 23 }px + 2.2vw);
	transform-style: preserve-3d;
	${ mq.extraLargeAndBelow } {
		top: calc(${ 31 + 22 }px + 2.2vw);
	}
	${ mq.largerAndBelow } {
		top: calc(${ 26 + 20 }px + 2.2vw);
	}
	${ mq.mediumAndBelow } {
		top: calc(${ 22 + 20 }px + 2.2vw);
	}
	width: 100%;
	text-align: center;
	will-change: transform;
	height: 0;
`

const StyledLogo = styled(Logo)`
	max-width: 100%;
	width: 100%;
	transform-origin: center bottom;
	width: 160px;
	margin-bottom: 2.2vw;
	// transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .955)/160) * scroll >= 1 ? ((winWidth * .955)/160) * scroll : 1 });
	// transform: scale(${ ({ scroll, winWidth }) => scroll * .95 >= 160/(winWidth) ? scroll * .95 : 160/(winWidth) }) translateY(${ ({ scroll }) => scroll > 0 ? -2.2 : 0 }vw);
	// ${ mq.extraLargeAndBelow } {
	// 	width: 140
	// }
	// ${ mq.largerAndBelow } {
	// 	width: 120
	// }
	// ${ mq.mediumAndBelow } {
	// 	width: 100
	// }
	svg {
		display: inline-block;
		vertical-align: top;
		transition: color ${ animations.mediumSpeed } ease-in-out;
		color: ${ ({ scroll }) => scroll >= .1 ? colors.bgColor : colors.textColor };
		transform-origin: center bottom;
		transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/160) * scroll >= 1 ? ((winWidth * .95)/160) * scroll : 1 });
		${ mq.extraLargeAndBelow } {
			color: red;
			// transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/140) * scroll >= 1 ? ((winWidth * .95)/140) * scroll : 1 });
			transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/160) * scroll >= 1 ? ((winWidth * .95)/160) * scroll : 1 });
		}
		${ mq.largerAndBelow } {
			transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/120) * scroll >= 1 ? ((winWidth * .95)/120) * scroll : 1 });
		}
		${ mq.mediumAndBelow } {
			transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/100) * scroll >= 1 ? ((winWidth * .95)/100) * scroll : 1 });
		}
	}
`

const Context = React.createContext('scroll-context');

const LargeLogo = ({ className, winWidth, winHeight, toggleHeaderCollapse }) => {

	return (
		<ScrollPercentage threshold={1} onChange={ (percentage) => {
			// if (percentage > .9) {
			// 	toggleHeaderCollapse(true)
			// } else {
			// 	toggleHeaderCollapse(false)
			// }
		} }>
			{({ percentage, ref, entry }) => (
				<Fragment>
					<Scroller ref={ref}/>
					<Wrapper>
						<StyledLogo
							winWidth={winWidth}
							scroll={1 - percentage}
						/>
					</Wrapper>
				</Fragment>
			)}
		</ScrollPercentage>
	)
}

const sizesToProps = ({ width, height }) => ({
	winWidth: width
})

export default withSizes(sizesToProps)(LargeLogo)