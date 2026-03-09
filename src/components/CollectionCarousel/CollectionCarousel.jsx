import React from 'react';
import styled from '@emotion/styled'
import { withShopifyContext } from 'contexts/ShopifyContext'
import Section from 'components/Section'
import Grid from 'components/Grid'
import ProductThumb from 'components/ProductThumb'
import ScrollEntrance from 'components/ScrollEntrance'
import { mq, colors } from 'styles'
import Slideshow from 'components/Slideshow'

const OutterWrapper = styled(ScrollEntrance)`
	max-width: 100%;
	overflow: hidden;
	padding: 0 10vw;
`

const SlideshowWrapper = styled.div`
	.slick-slider,
	.slick-track,
	.slick-list {
		overflow: visible;
	}
	> div {
		margin: 0 -10px;
		.slick-slide {
			padding: 0 10px;
		}
	}
`

const SlideshowEl = styled(Slideshow)`
	overflow: visible !important;
	> div {
		overflow: visible !important;
	}
`

const CollectionCarousel = ({
	hasAtf,
	shopifyContext,
	collectionHandle
}) => {
	if (!collectionHandle) {
		return false
	}
	
	const { shopifyCollections } = shopifyContext
	const collection = shopifyCollections.filter(({ handle }) => handle === collectionHandle)
	const products = collection[0]?.products

	if (!products || products.length < 1) {
		return false
	}

  return (
    <Section
    	prevTheme="bgColor"
    	setTheme="bgColor"
    	nextTheme={false}
			padded={hasAtf ? true : 'bottom'}
    >
			<OutterWrapper>
				<SlideshowWrapper>
					<SlideshowEl
						fade={false}
						arrows={true}
						slidesToShow={4}
						autoplay={true}
						arrowsUnder={true}
						dots={false}
						responsive={[
							{
								breakpoint: 1500,
								settings: {
									slidesToShow: 3
								}
							},
							{
								breakpoint: 600,
								settings: {
									slidesToShow: 2
								}
							},
							{
								breakpoint: 500,
								settings: {
									slidesToShow: 1
								}
							}
						]}
					>
						{products.map((product, index) => (
							<div key={product.id}>
								<ProductThumb product={product} variant={product?.variants[0]} />
							</div>
						))}
					</SlideshowEl>
				</SlideshowWrapper>
			</OutterWrapper>
    </Section>
  )
}

export default withShopifyContext(CollectionCarousel);