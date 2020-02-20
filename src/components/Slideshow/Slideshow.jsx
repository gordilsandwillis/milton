import React, { Component } from 'react'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import { rgba, darken } from 'polished'

import Button from 'src/components/Button'

import { colors, mediaQueries as mq, animations } from 'src/styles'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

// const StyledSlider = styled(Slider)`
// * {transition: height ${ animations.mediumSpeed } ease-in-out;}
// 	.slick-slide > div {
// 		display: flex;
// 		justify-content: center;
// 	}
// `

const SlideshowWrapper = styled.div`
	max-width: 100%;
	overflow: hidden;
`

const Slide = styled.div`
	width: 100%;
`

const NextPrevButton = styled(Button)`
	cursor: pointer;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	margin: 0;
	border: none;
	background: transparent;
	&:hover {
		color: ${ colors.textColor };
		background: transparent;
	}
	color: ${ rgba(colors.textColor, .35) };
	${ ({ position }) => position === 'left' ? `
		left: 20px;
	` : `
		right: 20px;
	`}
	${ mq.largeAndBelow } {
		display: none;
	}
`

const SlideshowDots = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	margin: 0;
	list-style: none;
	li {
		transition: color ${ animations.mediumSpeed } ease-in-out;
		cursor: pointer;
		color: ${ darken(.1, colors.lightGrey) };
		&:hover {
			color: ${ colors.textColor };
		}
		&.slick-active {
			color: ${ colors.textColor };
			opacity: 1;
			pointer-events: none;
		}
	}
`

const SlideshowDot = styled.div`
	padding: 22px 12px;
	span {
		display: block;
		width: 8px;
		height: 8px;
		background: currentcolor;
		border-radius: 50%;
	}
`

class Slideshow extends Component {
	goToNextSlide = () => {
		if (this.slideshow) {
			this.slideshow.slickNext()
		}
	}

	goToPrevSlide = () => {
		if (this.slideshow) {
			this.slideshow.slickPrev()
		}
	}

	render () {
		const {
			children,
			className,
			fade = false
		} = this.props

		const slideshowSettings = {
			dots: true,
			arrows: false,
			infinite: true,
			speed: 750,
			fade: fade,
			autoplay: false,
			autoplaySpeed: 4500,
			pauseOnHover: true,
			centerPadding: 50,
			adaptiveHeight: true,
			appendDots: dots => <SlideshowDots>{dots}</SlideshowDots>,
	    customPaging: i => (
	      <SlideshowDot><span/></SlideshowDot>
	    )
		}

		return (
			<div style={{ position: 'relative' }} className={className}>
				<SlideshowWrapper>
					{children.length > 1 ? (
						<Slider ref={c => (this.slideshow = c)} {...slideshowSettings}>
							{children && children.map((item, index) => (
								<Slide key={index}>{item}</Slide>
							))}
						</Slider>
					) : (
						<Slide>{children}</Slide>
					)}
				</SlideshowWrapper>
				<NextPrevButton shape="circle" className="prev-button" setTheme="bgColor" size="small" onClick={this.goToPrevSlide} position="left"><MdKeyboardArrowLeft size={32}/></NextPrevButton>
				<NextPrevButton shape="circle" className="next-button" setTheme="bgColor" size="small" onClick={this.goToNextSlide} position="right"><MdKeyboardArrowRight size={32}/></NextPrevButton>
			</div>
		)
	}
}

export default Slideshow
