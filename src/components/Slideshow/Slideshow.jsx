import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import { rgba, darken } from 'polished'

import Button from 'components/Button'

import { colors, mediaQueries as mq, animations } from 'styles'
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
	margin: 0;
	border: none;
	background: transparent;
	${ ({ arrowsUnder, position }) => !arrowsUnder ? `
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		${ position === 'left' ? `
			left: 20px;
		` : `
			right: 20px;
		`}
	` : ``}
	&:hover {
		color: ${ colors.textColor };
		background: transparent;
	}
	color: ${ rgba(colors.textColor, .35) };
	${ mq.largeAndBelow } {
		// display: none;
	}
`

const SlideshowDots = styled.ul`
	min-width: 100%;
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
	${ mq.mediumAndBelow } {
		padding: 22px 8px;
	}
	span {
		display: block;
		width: 6px;
		height: 6px;
		background: currentcolor;
		transform: rotate(45deg);
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
			fade = false,
			slidesToShow = 1,
			autoplay = false,
			responsive = [],
			dots = true,
			arrowsUnder = false
		} = this.props

		const slideshowSettings = {
			dots: dots,
			arrows: false,
			infinite: true,
			speed: 750,
			fade: fade,
			autoplay: autoplay,
			autoplaySpeed: 4500,
			pauseOnHover: true,
			centerPadding: 50,
			centerMode: false,
			adaptiveHeight: true,
			slidesToShow: slidesToShow || 1,
			responsive: responsive,
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
				{children.length > 1 && (
					<div style={arrowsUnder ? { width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '40px' } : {}}>
						<NextPrevButton arrowsUnder={arrowsUnder} shape="circle" className="prev-button" setTheme="bgColor" size="small" onClick={this.goToPrevSlide} position="left"><MdKeyboardArrowLeft size={32}/></NextPrevButton>
						<NextPrevButton arrowsUnder={arrowsUnder} shape="circle" className="next-button" setTheme="bgColor" size="small" onClick={this.goToNextSlide} position="right"><MdKeyboardArrowRight size={32}/></NextPrevButton>
					</div>
				)}
			</div>
		)
	}
}

export default Slideshow
