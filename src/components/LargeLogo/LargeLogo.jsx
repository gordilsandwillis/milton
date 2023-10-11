import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Stickyroll from '@stickyroll/react/stickyroll'
import { CSS_VARS, STYLE } from '@stickyroll/react/constants'
import withSizes from 'react-sizes'
import { withHeaderContext } from 'contexts/HeaderContext'
import { animations, colors, mq } from 'styles'
import { set } from 'utils/local-storage'

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
	--scrollValue: ${ ({ scroll }) => scroll };
	pointer-events: none;
	position: absolute;
	bottom: 0;
	z-index: 6;
	height: 0;
	width: 100%;
	height: 100%;
	top: 0;
`

const LogoWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	height: var(--100vh, 100vh);
	padding: 20px 0;
	will-change: transform;
	transform: translate3d(0, calc((-100% + ${ 31 + 20 }px + 20px + 2.6vw) * (1 - var(--scrollValue))), 0);
	${ mq.extraLargeAndBelow } {
		padding: 20px 0;
	}
	${ mq.largerAndBelow } {
		padding: 18px 0;
		// transform: translate3d(0, calc((-100% + ${ 31 + 18 }px + 18px + 3.2vw) * (1 - var(--scrollValue))), 0);
	}
	${ mq.mediumAndBelow } {
		padding: 18px 0;
		// transform: translate3d(0, calc((-100% + ${ 31 + 18 }px + 18px + 6vw) * (1 - var(--scrollValue))), 0);
	}
`

const StyledLogo = styled(Logo)`
	max-width: 100%;
	width: 100%;
	transform-origin: center bottom;
	width: 160px;
	margin-bottom: 2.2vw;
	display: block;
	will-change: transform;
	${ ({ hidden }) => hidden ? `
		opacity: 0;
	` : `` }
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
		color: ${ ({ scroll }) => scroll > 0 ? colors.bgColor : colors.textColor };
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

const FixedLogo = styled.div`
	padding: 20px 0;
	${ mq.extraLargeAndBelow } {
		padding: 20px 0;
	}
	${ mq.largerAndBelow } {
		padding: 18px 0;
	}
	${ mq.mediumAndBelow } {
		padding: 18px 0;
	}
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	display: flex;
	justify-content: center;
	pointer-events: none;
	> div {
		margin: 0;
	}
`

const LargeLogo = ({ className, winWidth, winHeight, headerContext }) => {

	const [scroll, setScroll] = useState(0)
	const toggleHeader = headerContext.toggleHeader

	const headerInvertLevel = .95

	const scrollValue = headerInvertLevel - scroll >= 1 ? 1 : headerInvertLevel - scroll

	return (
		<>
			<FixedLogo>
				<StyledLogo
					winWidth={winWidth}
					scroll={.9 - 1}
					hidden={scroll <= headerInvertLevel}
				/>
			</FixedLogo>
			<Wrapper scroll={scrollValue}>
				<Stickyroll
					pages={1}
					onStart={() => {
						console.log("onStart");
					}}
					onPage={(page, index) => {
						console.log("onPage", page, index);
					}}
					onProgress={(progress, page, index) => {
						setScroll(progress)
						if (progress > headerInvertLevel) {
							// if (!headerContext.collapsed) {
								toggleHeader(true)
							// }
						} else {
							// if (headerContext.collapsed) {
								toggleHeader(false)
							// }
						}
					}}
					onEnd={() => {
						// console.log("onEnd");
					}}
				>
					<LogoWrapper scroll={scrollValue}>
						<StyledLogo
							winWidth={winWidth}
							scroll={scrollValue}
							hidden={scroll > headerInvertLevel}
						/>
					</LogoWrapper>
				</Stickyroll>
			</Wrapper>
		</>
	)
	
	// return (
	// 	<Fragment>
	// 		<Scroller />
	// 		<Wrapper>
	// 			<StyledLogo
	// 				winWidth={winWidth}
	// 			/>
	// 		</Wrapper>
	// 	</Fragment>
	// )

	// return (
	// 	<ScrollPercentage threshold={1} onChange={ (percentage) => {
	// 		if (percentage > .9) {
	// 			toggleHeader(true)
	// 		} else {
	// 			toggleHeader(false)
	// 		}
	// 	} }>
	// 		{({ percentage, ref, entry }) => (
	// 		)}
	// 	</ScrollPercentage>
	// )
}

const sizesToProps = ({ width, height }) => ({
	winWidth: width
})

export default withHeaderContext(withSizes(sizesToProps)(LargeLogo))