import React, { Component } from 'react'
import styled from '@emotion/styled'
import Parallax from 'src/components/Parallax'
import Image from 'src/components/Image'
import tickl from 'tickl'

import { typography, util } from 'src/styles'

const Wrapper = styled.div`
	position: relative;
`

const Images = styled.div`
	transform-style: preserve-3d;
`

const StackedImageWrap = styled(Parallax)`
	position: ${ ({ index }) => index === 0 ? 'relative' : 'absolute' };
	z-index: ${ ({ index, images }) => images.length - index };
	top: 0;
	left: 0;
	// transition: transform 5s cubic-bezier(.06,.83,.1,1);
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
			<Wrapper>
				<Images
					options={{ max : 10, scale : 1, speed : 3000, reverse : true, reset : true }}
					// ref={this.ticklWrap}
				>
				{images.map((image, index) => (
					<StackedImageWrap
						key={index}
						// ref={layer => this.layer[index] = layer}
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
		)
	}
}

export default StackedImages
