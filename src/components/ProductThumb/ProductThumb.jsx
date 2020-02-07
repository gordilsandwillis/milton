import React from 'react'
import styled from '@emotion/styled'
import Link from 'src/components/Link'
import { typography, colors } from 'src/styles'
import Image from 'src/components/GatsbyImage'

const Wrapper = styled(Link)`
	cursor: pointer;
	display: block;
`

const ProductTitle = styled.p`
	margin: 0;
`

const ProductPattern = styled.h6`
	${ typography.smallCaps }
	margin-top: 16px;
	margin-bottom: 4px;
`

const ThumbnailImage = styled(Image)`
	background: ${ colors.lightGrey };
`

const ProductThumb = ({ product, pattern, className }) => {
	if (!product.image) {
		return false
	}

	return (
	  <Wrapper className={className} to={'/product/' + pattern.handle + '?color=' + product.id}>
			<ThumbnailImage
				image={{
					fluid: {
						aspectRatio: 1,
						src: product.image.src
					}
				}} 
				alt={product.title}
			/>
			<ProductPattern>{pattern.title}</ProductPattern>
			<ProductTitle>{product.title}</ProductTitle>
		</Wrapper>
	)
}

export default ProductThumb
