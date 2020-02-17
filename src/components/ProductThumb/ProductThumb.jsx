import React from 'react'
import styled from '@emotion/styled'
import Link from 'src/components/Link'
import { typography, colors, util } from 'src/styles'
import Image from 'src/components/GatsbyImage'

const Wrapper = styled(Link)`
	cursor: pointer;
	display: block;
	text-align: center;
`

const ProductTitle = styled.p`
	margin: 0;
`

const ProductPattern = styled.h6`
	${ typography.smallCaps }
	${ util.responsiveStyles('margin-top', 30, 20, 16, 16) }
	margin-bottom: 4px;
`

const ThumbnailImage = styled(Image)`
	background: ${ colors.lightGrey };
`

const ProductThumb = ({ product, variant, className }) => {
	if (!product.images) {
		return false
	}

	return (
	  <Wrapper className={className} to={'/product/' + product.handle + '/' + variant.id}>
			<ThumbnailImage
				image={{
					fluid: {
						aspectRatio: 1,
						src: variant.image.src
					}
				}} 
				alt={product.title}
			/>
			<ProductPattern>{product.title}</ProductPattern>
			<ProductTitle>{variant.title}</ProductTitle>
		</Wrapper>
	)
}

export default ProductThumb
