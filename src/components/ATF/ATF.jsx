import React, { Component } from 'react'
import styled from '@emotion/styled'
import Grid from 'src/components/Grid'
import Image from 'src/components/GatsbyImage'
import ScrollEntrance from 'src/components/ScrollEntrance'
import ConditionalRender from 'src/components/ConditionalRender'
import TextLockup from 'src/components/TextLockup'
import ThemeSelector from 'src/components/ThemeSelector'
import withSizes from 'react-sizes'
import { colors, animations, mq } from 'src/styles'
import MobileDetect from 'mobile-detect'
import Video from 'src/components/Video'

const Wrapper = styled(ThemeSelector)`
	position: relative;
	${ ({ media }) => media ? `
		background: ${ colors.black };
		color: ${ colors.bgColor };
	` : `` }
	${ ({ fullHeight, showArrow }) => fullHeight && showArrow ? `
		margin-bottom: -28px;
	` : `` }
`

const AlignmentContainer = styled.div`
	display: flex;
	align-items: ${ ({ vAlignment }) => vAlignment };
	${ ({ fullHeight, winHeight, showArrow }) => fullHeight ? `
		min-height: ${ winHeight };
		padding-top: 7vw;
		padding-bottom: ${ showArrow ? `calc(95px + 65px)` : `7vw`};
	` : `
		min-height: 56.25vw; // 16:9 Ratio
		height: 60vh;
		max-height: 56.25vw;
		padding-top: 7vw;
		padding-bottom: 8vw;
		${ mq.mediumAndBelow } {
			min-height: 100vw;
		}
		${ mq.largerAndUp } {
			max-height: 50vw; // 2:1 Ratio
			height: 70vh;
			min-height: 50vw;
		}
	` }
`

const Content = styled.div`
	width: 100%;
	text-align: ${ ({ hAlignment }) => hAlignment };
`

const Block = styled.div`
	display: block;
	width: 100%;
	position: relative;

	${ ({ background, fullHeight }) => background ? `
		position: absolute;
		height: 100%;
		overflow: hidden;
		z-index: 1;
	` : `` }

	${ ({ content, fullHeight }) => content ? `
		z-index: 3;
	` : `` }
`

const BgImage = styled(Image)`
	height: 100%;
	width: 100%;
	position: relative;
	img {
		object-fit: cover;
		object-position: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`

const ATFLeadDown = styled.div`
	color: ${ ({ color }) => colors[color] };
	position: absolute;
	z-index: 3;
	bottom: 0;
	left: 0;
	right: 0;
	height: 44px;
	display: flex;
	align-items: stretch;
	justify-content: center;
	display: flex;
	border-bottom: 20px solid currentColor;
`

const LeadDownPiece = styled.div`
	width: 100%;
	height: 100%;
	background: currentColor;
	${ ({ side }) => side === 'right' ? `
		border-radius: 44px 0 0 0;
		margin-left: -1px;
	` : `
		border-radius: 0 44px 0 0;
		margin-right: -1px;
	` }
`

const Overlay = styled.div`
	background: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
	opacity: .3;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 30%;
	max-height: 300px;
	min-height: 100px;
	z-index: 3;
`

const ImageOverlay = styled.div`
	background: #000;
	opacity: ${ ({ overlay }) => overlay };
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
`

const VideoContainer = styled.div`
	transition: opacity ${ animations.mediumSpeed } ease-in-out;
	position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
	z-index: -1;
	pointer-events: none;

	> div > div span {
		display: none;
	}

`

const VideoStyled = styled(Video)`
	z-index: -10;
	.rh5v-DefaultPlayer_controls {
    position: absolute;
		bottom: 0;
		display: none;
		visibility: hidden;
    right: 0;
    left: 0;
    height: 0;
	}
`

const Mask = styled.div`

	${ ({ mask }) => (mask === "true" && `
		background: rgba(0,0,0,0.35);
		padding: 2em 0;
		${ mq.largerAndUp } {
			margin: 0 130px;
		}

	`)}

`;

class ATF extends Component {
	constructor (props) {
		super(props)
		this.state = {
			videoFailed: false,
		}
	}

	shouldComponentUpdate (prevProps, prevState) {
		const md = new MobileDetect(window.navigator.userAgent)
		if (md.os() === 'iOS' && prevProps.winHeight !== this.props.winHeight) {
			return false
		}

		return true
	}

	playVideo = () => {
		try {
			document.getElementsByTagName('video')[0].play().then(() => {
				this.setState({ videoFailed: false })
			})
		} catch {}
	}

	render () {
		const {
			headline,
			headlineSize,
			text,
			textSize,
			image,
			small,
			medium,
			large,
			video,
			textAlignment,
			hAlignment,
			vAlignment,
			fullHeight,
			buttons,
			winHeight,
			eyebrow,
			showArrow,
			index,
			theme,
			nextTheme,
			overlay,
			mask,
			children,
			additions,
			className
		} = this.props


		const vAlignOptions = {
			bottom: 'flex-end',
			top: 'flex-start',
			baseline: 'baseline',
			center: 'center'
		}

		const hAlignmentGrid = {
			center: '1 [12] 1',
			left: '1 [6] 7',
			right: '7 [6] 1'
		}

		const verticalAligment = vAlignOptions[vAlignment]

		const md = new MobileDetect(window.navigator.userAgent)

		let windowHeight = '100vh'
		if (md.os() === 'iOS') {
			windowHeight = winHeight + 'px'
		}

		return (
			<Wrapper setTheme={theme} media={image || video} fullHeight={fullHeight} showArrow={showArrow} className={className}>
				<Block background winHeight={windowHeight} fullHeight={fullHeight}>
					<ConditionalRender condition={video}>
						<VideoContainer>
							<VideoStyled
								cover={true}
								loop={true}
								playing={true}
								muted={true}
								controls={['PlayPause']}
								url={video && video.file.url}
							/>
						</VideoContainer>
					</ConditionalRender>
					{(!video && image) || small ? (
						<BgImage
							image={image}
							small={small}
							medium={medium}
							large={large}
						/>
					) : false}
					{index === 0 && overlay
						&& (video || image) ? <Overlay /> : false}
					{overlay ? <ImageOverlay overlay={overlay} /> : false}
				</Block>
				<Block content="true" winHeight={windowHeight} fullHeight={fullHeight}>
					<AlignmentContainer vAlignment={verticalAligment} winHeight={windowHeight} fullHeight={fullHeight} showArrow={showArrow}>
						<Content hAlignment={hAlignment}>
							<Grid
								small="1 [12] 1"
								medium="1 [12] 1"
								large={hAlignmentGrid[hAlignment]}
							>
								<ScrollEntrance>
									<Mask mask={mask && mask.toString()}>
										<TextLockup
											theme="bgColor"
											eyebrow={eyebrow}
											alignment={textAlignment}
											headlineSize={headlineSize}
											headlineElement="h1"
											headline={headline}
											text={text}
											textSize={textSize}
											buttons={buttons}
											additions={children && children}
										/>
									</Mask>
								</ScrollEntrance>
							</Grid>
						</Content>
					</AlignmentContainer>
				</Block>

				<ConditionalRender condition={fullHeight && showArrow}>
					<ATFLeadDown color={nextTheme}>
						<LeadDownPiece />
						<LeadDownPiece side="right"/>
					</ATFLeadDown>
				</ConditionalRender>

				{additions}

			</Wrapper>
		)
	}
}

ATF.defaultProps = {
	textAlignment: 'center',
	hAlignment: 'center',
	vAlignment: 'center',
	showArrow: false,
	headlineSize: 'h1',
	textSize: 'body',
	theme: 'black',
	prevTheme: false,
	nextTheme: false,
	overlay: false
}

const sizesToProps = ({ width, height }) => ({
	winWidth: width,
	winHeight: height
})

export default withSizes(sizesToProps)(ATF)
