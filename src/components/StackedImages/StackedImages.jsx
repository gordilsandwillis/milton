import React, { Component } from 'react'
import styled from '@emotion/styled'
import Image from 'src/components/Image'
import { ScrollPercentage } from 'react-scroll-percentage'

const Wrapper = styled.div`
	position: relative;
	padding: 30px 0;
`

const Images = styled.div`
	transform-style: preserve-3d;
`

const StackedImageWrap = styled.div`
	position: ${ ({ index }) => index === 0 ? 'relative' : 'absolute' };
	z-index: ${ ({ index, images }) => images.length - index };
	top: 0;
	left: 0;
	// transition: transform 5s cubic-bezier(.06,.83,.1,1);
	width: 100%;
	img,
	> div {
		width: 100%;
	}

	${ props => !props.disabled ? `
		transform: 	translate3d(0, ${ props.speed * props.scroll }%, 0);
	` : `` };
`

const speeds = [
	-10,
	10,
	5,
	-5
]

class StackedImages extends Component {
	// constructor(props) {
 //    super(props);
 //    this.ticklWrap = React.createRef();
 //    this.layer = [];
 //  }

 //  componentDidMount () {
 //  	if (this.ticklWrap && this.ticklWrap.current) {
 //  		console.log(this.layer[0])
	//     tickl(this.ticklWrap.current, [
	//       [this.layer[0], .07],
	//       [this.layer[1], .14],
	//       [this.layer[2], .21],
	//       [this.layer[3], .28],
	//     ])
 //  	}
 //  }

	render () {
		const { images } = this.props

		if (!images) {
			return false
		}

		return (
			<ScrollPercentage threshold={0}>
				{({ percentage, ref, entry }) => (
					<Wrapper ref={ref}>
						<Images>
						{images.map((image, index) => (
							<StackedImageWrap
								key={index}
								scroll={percentage}
								index={index}
								images={images}
								posYStart={5 * (index + 1)}
								posYEnd={-5 * (index + 1)}
								speed={speeds[index]}
								scrollUnit="%">
								<Image image={image} />
							</StackedImageWrap>
						))}
						</Images>
					</Wrapper>
				)}
			</ScrollPercentage>
		)
	}
}

export default StackedImages
