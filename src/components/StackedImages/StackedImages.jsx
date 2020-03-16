import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Parallax } from 'react-scroll-parallax'

import Image from 'src/components/GatsbyImage'

const Wrapper = styled.div`
	position: relative;
	padding: 4% 0;
`

const Images = styled.div`

`

const Item = styled.div`
	position: ${ ({ index }) => index === 0 ? 'relative' : 'absolute' };
	z-index: ${ ({ index, imageCount }) => imageCount - index };
	top: 0;
	left: 0;
	width: 100%;
	img,
	> div {
		width: 100%;
	}
`

class StackedImages extends Component {
	render () {
		const { images } = this.props

		if (!images) {
			return false
		}

		return (
			<Wrapper>
				<Images>
					{images.map((image, index) => {
	  				let offset1 = 7 * (images.length - (index + 1)) * -1
	  				let offset2 = 7 * (images.length - (index + 1))
	  				if (index % 2) {
	  					offset1 = offset1 * -1
	  					offset2 = offset2 * -1
	  				}
	  				return (
	  					<Item images={images.length} index={index} imageCount={images.length} key={index}>
			  				<Parallax y={[ offset1, offset2 ]}>
			  					<Image image={{
										fluid: {
											aspectRatio: image.width/image.height,
											src: image.src,
											srcSet:'',
											sizes: ''
										}
									}} />
			  				</Parallax>
		  				</Item>
	  				)
	  			})}
				</Images>
			</Wrapper>
		)
	}
}

export default StackedImages
