import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import { ScrollPercentage } from 'react-scroll-percentage'
import withSizes from 'react-sizes'
import { withHeaderContext } from 'contexts/HeaderContext'
import { animations, colors, mq } from 'styles'

const Scroller = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 0;
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
	top: calc(${ 35 + 20 }px + 2.2vw);
	// transform-style: preserve-3d;
	${ mq.extraLargeAndBelow } {
		top: calc(${ 31 + 20 }px + 2.6vw);
	}
	${ mq.largerAndBelow } {
		top: calc(${ 26 + 18 }px + 3.2vw);
	}
	${ mq.mediumAndBelow } {
		top: calc(${ 22 + 20 }px + 6vw);
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
	${ mq.extraLargeAndBelow } {
		width: 140px;
		margin-bottom: 2.6vw;
	}
	${ mq.largerAndBelow } {
		width: 120px;
		margin-bottom: 3.2vw;
	}
	${ mq.mediumAndBelow } {
		width: 100px;
		margin-bottom: 6vw;
	}
	svg {
		display: inline-block;
		vertical-align: top;
		transition: color ${ animations.mediumSpeed } ease-in-out;
		color: ${ ({ scroll }) => scroll >= .1 ? colors.bgColor : colors.textColor };
		transform-origin: center bottom;
		transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/160) * scroll >= 1 ? ((winWidth * .95)/160) * scroll : 1 });
		${ mq.extraLargeAndBelow } {
			transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/140) * scroll >= 1 ? ((winWidth * .95)/140) * scroll : 1 });
		}
		${ mq.largerAndBelow } {
			transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .95)/120) * scroll >= 1 ? ((winWidth * .95)/120) * scroll : 1 });
		}
		${ mq.mediumAndBelow } {
			transform: scale(${ ({ scroll, winWidth }) => ((winWidth * .87)/100) * scroll >= 1 ? ((winWidth * .87)/100) * scroll : 1 });
		}
	}
`

const LargeLogo = ({ className, winWidth, winHeight, headerContext }) => {

	const toggleHeader = headerContext.toggleHeader

	return (
		<ScrollPercentage threshold={1} onChange={ (percentage) => {
			if (percentage > .9) {
				toggleHeader(true)
			} else {
				toggleHeader(false)
			}
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

export default withHeaderContext(withSizes(sizesToProps)(LargeLogo))