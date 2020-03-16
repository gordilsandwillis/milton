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
	position: relative;
	z-index: 1;
`

const ThumbnailHoverWrap = styled.div`
	position: absolute;
	z-index: 2;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	transition: opacity .3s ease-in-out;
`

const ThumbnailImageWrapper = styled.div`
	position: relative;
	&:hover {
		.hover-image {
			opacity: 1;
		}
	}
`

const ProductThumb = ({ product, variant, className }) => {
	if (!variant.image) {
		return false
	}

	let variantImages = product.images.filter( i => variant.title.includes( i.altText ) )
	let hoverImage = variantImages[1].src

	return (
		<Wrapper className={className} to={'/product/' + product.handle + '/' + variant.id}>
			<ThumbnailImageWrapper>
				<ThumbnailImage
					image={{
						fluid: {
							aspectRatio: 1,
							src: variant.image.src,
							srcSet:'',
							sizes: ''
						}
					}}
					alt={product.title}
				/>
				<ThumbnailHoverWrap className="hover-image">
					<Image
						image={{
							fluid: {
								aspectRatio: 1,
								src: hoverImage,
								srcSet:'',
								sizes: ''
							}
						}}
					/>
				</ThumbnailHoverWrap>
			</ThumbnailImageWrapper>

			<ProductPattern>{product.title}</ProductPattern>
			<ProductTitle>{variant.title}</ProductTitle>
		</Wrapper>
	)
}


export default ProductThumb
