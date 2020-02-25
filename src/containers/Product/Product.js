import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled'

import { withShopifyContext } from 'src/contexts/ShopifyContext'
import { withModalContext } from 'src/contexts/ModalContext'

import Header from 'src/components/Header'
import TextLockup from 'src/components/TextLockup'
import Grid from 'src/components/Grid'
import Section from 'src/components/Section'
import Image from 'src/components/GatsbyImage'
import ProductThumb from 'src/components/ProductThumb'
import Slideshow from 'src/components/Slideshow'
import Button from 'src/components/Button'
import ProductSpecifications from 'src/components/ProductSpecifications'

import { colors, util, mq } from 'src/styles'
// import { Helmet } from "react-helmet";

const ImgArea = styled.div`
	${ util.responsiveStyles('padding-top', 150, 135, 100, 90) }
	background: ${ colors.white };
	height: 100%;
`

const TextArea = styled.div`
	${ util.responsiveStyles('padding-top', 150, 135, 100, 60) }
	${ util.responsiveStyles('padding-bottom', 150, 135, 100, 60) }
	display: flex;
	align-items: center;
	justify-content: flex-start;
	${ mq.largeAndBelow } {
		justify-content: center;
	}
`

const ProductImage = styled(Image)`
	background: ${ colors.bgColor };
	img {
		object-fit: contain;
	}
`

const ProductInfo = styled(TextLockup)`
	${ mq.largeAndBelow } {
		text-align: center;
		p, h3 {
			margin-left: auto;
			margin-right: auto;
		}
	}
`

const ProductSlideshow = styled(Slideshow)`
	${ util.responsiveStyles('margin-bottom', 150, 135, 100, 60) }
	> div {
		overflow: visible !important;
	}
	.next-button,
	.prev-button {
		${ mq.largeAndBelow } {
			display: block;
		}
		${ mq.mediumAndBelow } {
			display: none;
		}
	}
	.next-button {
		right: 3.6vw;
		transform: translate3d(50%, -50%, 0);
		${ mq.largeAndBelow } {
			right: 7vw;
		}
	}
	.prev-button {
		left: 3.6vw;
		transform: translate3d(-50%, -50%, 0);
		${ mq.largeAndBelow } {
			left: 7vw;
		}
	}
	.slick-dots {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		${ util.responsiveStyles('height', 150, 135, 100, 60) }
	}
`

const BottomButtons = styled(TextLockup)`
	${ util.responsiveStyles('padding-top', 91, 51, 33, 26) }
`

class Product extends Component {
	state = {
		loading: true,
		currentProduct: false,
		currentVariant: false,
		currentCollection: false,
		variantImages: [],
		moreProducts: []
	}

	handleInquireClick = (event) => {
		console.log(this.props)
		const { currentProduct, currentVariant, currentCollection } = this.state
		const { modalContext } = this.props
		modalContext.toggleModal({currentProduct, currentVariant, currentCollection})
	}

	componentDidMount () {
		const { match, shopifyContext } = this.props
		const { shopifyProducts: products, shopifyCollections: collections } = shopifyContext

		if (!products || !collections) {
			return null;
		}

		const productHandle = match.params.product
		const variantId = match.params.variant

		const currentProduct = products.find(product => product.handle === productHandle)
		const currentVariant = currentProduct.variants.find(variant => variant.id === variantId)
		const currentCollection = collections.find( (({ products }) => products.some( product => product.id === currentProduct.id)))
		const variantImages = currentProduct.images.filter( i => currentVariant.title.includes( i.altText ) )
		const collectionProducts = currentCollection.products.filter( product => product.id !== currentProduct.id )
		const moreProducts = collectionProducts.sort(function (a, b) { return 0.5 - Math.random() }).slice(0, 4)

		const productSpecifications = currentProduct.metafields.filter( ({namespace}) => namespace === 'specifications')


		this.setState({
			loading: false,
			currentProduct,
			currentVariant,
			currentCollection,
			variantImages,
			moreProducts,
			productSpecifications
		})
	}

	render() {
		const {
			loading,
			currentProduct,
			currentVariant,
			currentCollection,
			variantImages,
			moreProducts,
			productSpecifications
		} = this.state

		if (loading) {
			return false
		}

		return (
			<Fragment>
				{/*<Helmet>
	        <meta charSet="utf-8" />
	        <title>{PageTitle + ' | ' + Tagline}</title>
	        <meta property="og:locale" content="en_US" />
			    <meta property="og:type" content="website" />
			    <meta property="og:title" content={PageTitle + ' | ' + Tagline} />
			    <meta property="og:description" content={PageDescription} />
			    <meta property="og:url" content={URL} />
			    <meta property="og:site_name" content={PageTitle} />
			    <meta property="og:image" content={shareImage} />
			    <meta property="og:image:secure_url" content={URL} />
			    <meta property="og:image:width" content="1200" />
			    <meta property="og:image:height" content="800" />
			    <meta name="twitter:card" content="summary_large_image" />
			    <meta name="twitter:description" content={PageDescription} />
			    <meta name="twitter:title" content={PageTitle + ' | ' + Tagline} />
			    <meta name="twitter:image" content={shareImage} />
		    </Helmet>*/}
				<div>
					<Header placeholder={false}/>
					<Grid small="[1]" large="[7] [7]" vAlign="center">
						<ImgArea>
							<ProductSlideshow fade={true}>
								{variantImages.map((image, index) => {
									return (
										<Grid
											small="1 [12] 1"
											medium="2 [10] 2"
											key={currentVariant.id + '-image-' + index}
										>
											<ProductImage
												image={{
													fluid: {
														aspectRatio: 1,
														src: image.src,
														srcSet: '',
														sizes: ''
													}
												}}
												alt={currentProduct.title | currentVariant.title}
											/>
										</Grid>
									)
								})}
							</ProductSlideshow>
						</ImgArea>
						<TextArea>
							<Grid small="1 [12] 1" medium="2 [10] 2" larger="1 [4] 2">
								<div>
									<ProductInfo
										eyebrow={currentProduct.title + ' • ' + currentCollection.title}
										headline={currentVariant.title}
										headlineSize="h4"
										text={currentProduct.descriptionHtml}
										textSize="body"
										alignment="left"
										transitionIn={false}
									>
										<ProductSpecifications
											keys={['width', 'care', 'content', 'performance']}
											specifications={productSpecifications}
											variants={currentProduct.variants}
											currentProduct={currentProduct}
											currentVariant={currentVariant}
										/>
										<Button
											onClick={this.handleInquireClick}
											size="large"
										>
										Inquire
										</Button>
									</ProductInfo>
								</div>
							</Grid>
						</TextArea>
					</Grid>
				</div>

				<Section setTheme="lightGrey" nextTheme="lightGrey">
					<Grid small="1 [12] 1">
						<h4 style={{ textAlign: 'center' }}><span style={{ textTransform: 'lowercase', fontStyle: 'italic' }}>more</span> {currentCollection.title}</h4>
					</Grid>
				</Section>
				<Section prevTheme="lightGrey" setTheme="lightGrey">
					<Grid
						small="1 [6] [6] 1"
						medium="2 [3] [3] [3] 2"
						colGap={['3.6vw', '24px', '30px']}
						rowGap={['50px', '70px', '80px']}
					>
						{moreProducts.map((product) => (
							<div key={product.id}>
								<ProductThumb product={product} variant={product.variants[0]}/>
							</div>
						))}
					</Grid>
					<BottomButtons
						buttons={[
							{
								linkType: 'button',
								label: `${currentCollection.title} Collection`,
								to: `/collections/${currentCollection.handle}`
							},
							{
								linkType: 'button',
								label: 'All Collections',
								to: '/collections'
							}
						]}
					/>
				</Section>
			</Fragment>
		);
	}
}

export default withShopifyContext(withModalContext(Product));