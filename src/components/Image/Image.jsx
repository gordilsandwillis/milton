import React from 'react'
import styled from '@emotion/styled'
import { mq } from 'styles'

const StyledImage = styled.div`
	
`

const ResponsiveImage = ({ image, small, medium, large, className }) => {
	if (small || medium || large || image) {
		let source = null
		if (image) {
			source = [
				{
					src: image,
					media: `(min-width: 1px)`,
				}
			]
		} else {
			source = [
				{
					src: large,
					media: `(min-width: ${ mq.largeBreakpoint + 1 }px)`,
				},
				{
					src: medium,
					media: `(min-width: ${ mq.mediumBreakpoint + 1 }px)`,
				},
				{
					src: small,
					media: `(min-width: 1px)`,
				}
			]
		}
		return (
			<StyledImage className={className}>
	      <picture>
	      	{source.map((image, index) => (
						<source
							key={image.src}
							srcSet={image.src}
							media={image.media}
						/>
					))}
	        <img
	        	sizes="auto"
	          src={source[0].src}
	          alt=""
	        />
	      </picture>
			</StyledImage>
		)
	} else {
		return false
	}
}

const Image = ({ useMultipleImages, small, medium, large, image, className }) => (
	<ResponsiveImage
		image={image}
		small={small}
		medium={medium}
		large={large}
		className={className}
	/>
)

export {
	ResponsiveImage,
	Image as default
}
