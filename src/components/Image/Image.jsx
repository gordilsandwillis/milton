import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image/withIEPolyfill'
import { mq } from 'src/styles'

const StyledImage = styled(Img)`
	${ ({ fluid }) => `
		> div {
			${ fluid && fluid[1] && `
				${ mq.largeAndBelow } {
					padding-bottom: ${ 100.0 / fluid[1].aspectRatio }% !important;
				}
			` }
			${ fluid && fluid[2] && `
				${ mq.mediumAndBelow } {
					padding-bottom: ${ 100.0 / fluid[2].aspectRatio }% !important;
				}
			` }
		}
	` }
`

const ResponsiveImage = ({ image, small, medium, large, className }) => {
	if (small || medium || large || image) {
		let source = null
		if (image) {
			source = image.fluid
		} else {
			source = [
				{
					...large.fluid,
					media: `(min-width: ${ mq.largeBreakpoint + 1 }px)`,
				},
				{
					...medium.fluid,
					media: `(min-width: ${ mq.mediumBreakpoint + 1 }px)`,
				},
				{
					...small.fluid,
					media: `(min-width: 1px)`,
				}
			]
		}
		return (
			<StyledImage
				className={className}
				fluid={source}
				placeholderStyle={{ display: 'none' }}
				durationFadeIn={1000}
				// objectFit="cover"
				// objectPosition="50% 50%"
			>
				<div style={{ boxShadow: '-14px 16px 5px 5px green' }}/>
			</StyledImage>
		)
	} else {
		return false
	}
}

const Image = ({ useMultipleImages, small, medium, large, image, className }) => (
	<ResponsiveImage
		image={!useMultipleImages && image}
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
