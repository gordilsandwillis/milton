import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled'
import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import TextLockup from 'src/components/TextLockup'
import Grid from 'src/components/Grid'
import Section from 'src/components/Section'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import Image from 'src/components/GatsbyImage'
import PlaceholderNewsletterImage from 'src/assets/images/placeholder-newsletter.jpg'
import { withShopifyContext } from 'src/contexts/ShopifyContext'
import ProductThumb from 'src/components/ProductThumb'
import { colors, util, mq, animations } from 'src/styles'
import Slideshow from 'src/components/Slideshow'
import Collapse from 'src/components/Collapse'

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

const VariantLink = styled(Link)`
	width: 100px;
	${ util.responsiveStyles('width', 60, 50, 40, 40) }
	display: block;
	background: ${ colors.lightGrey };
	position: relative;
	cursor: pointer;
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
		border: 1px solid ${ colors.textColor };
		opacity: 0;
		transition: opacity ${ animations.mediumSpeed } ease-in-out;
	}
	&:hover {
		&:after {
			${ ({ active }) => !active ? `
				opacity: .3;
			` : `` }
		}
	}
	${ ({ active }) => active ? `
		pointer-events: none;
		&:after {
			opacity: 1;
		}
	` : `` }
`

const VariantLinks = styled.div`
	display: flex;
	margin-top: 30px;
	a {
		margin-left: 20px;
		&:first-child {
			margin-left: 0;
		}
	}
	${ mq.largeAndBelow } {
		justify-content: center;
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

class Product extends Component {
	state = {
		loading: true,
		currentProduct: false,
		currentVariant: false,
		currentCollection: false,
		variantImages: [],
		moreProducts: []
	}

	componentDidMount () {
		const productHandle = this.props.match.params.product
		const variantId = this.props.match.params.variant

		let currentProduct = false
		let currentVariant = false
		let currentCollection = false
		let variantImages = []
		let collectionProducts = []

		if (this.props.shopifyContext.shopifyProducts) {
			let products = this.props.shopifyContext.shopifyProducts
			let collections = this.props.shopifyContext.shopifyCollections
			currentProduct = products.filter( i => productHandle.includes( i.handle ) )[0]
			currentVariant = currentProduct.variants.filter( i => variantId.includes( i.id ) )[0]
			variantImages = currentProduct.images.filter( i => currentVariant.title.includes( i.altText ) )
			
			console.log(currentProduct)

			collections.forEach(collection => {
				// console.log(collection)
				collection.products.forEach(product => {
					if (currentProduct.id.includes( product.id )) {
						currentCollection = collection
					}
				})
			})

			// Get other products in collection
			currentCollection.products.forEach(product => {
				product.variants.forEach(variant => {
					variant.product = product
					collectionProducts.push(variant)
				})
			})

			const moreProducts = collectionProducts.sort(function (a, b) { return 0.5 - Math.random() }).slice(0, 4)

			this.setState({
				loading: false,
				currentProduct: currentProduct,
				currentVariant: currentVariant,
				currentCollection: currentCollection,
				variantImages: variantImages,
				moreProducts: moreProducts
			})
		}

	}

	render() {
		const {
			loading,
			filteredProducts,
			currentProduct,
			currentVariant,
			currentCollection,
			variantImages,
			moreProducts
		} = this.state

		if (loading) {
			return false
		}

		console.log(currentProduct)

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
										<Grid small="1 [12] 1" medium="2 [10] 2" key={currentVariant.id + '-image-' + index}>
											<ProductImage
												image={{
													fluid: {
														aspectRatio: 1,
														src: image.src
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
										additions={<div style={{ marginTop: '25px' }}>
											<Collapse title="Specifications">Text</Collapse>
											<Button size="large">Inquire</Button>
											{currentProduct.variants.length > 1 && (
												<VariantLinks>
													{currentProduct.variants.map((variant, index) => {
														let active = false
														if (variant.id === currentVariant.id) {
															active = true
														}
														return (
															<VariantLink to={'/product/' + currentProduct.handle + '/' + variant.id} key={variant.id} active={active}>
																<Image
																	image={{
																		fluid: {
																			aspectRatio: 1,
																			src: variant.image.src
																		}
																	}} 
																	alt={currentProduct.title | variant.title}
																/>
															</VariantLink>
														)
													})}
												</VariantLinks>
											)}
										</div>}
									/>
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
						medium="1 [3] [3] [3] [3] 1"
						colGap={['3.6vw', '24px', '30px']}
						rowGap={['50px', '70px', '80px']}
					>
						{moreProducts.map((variant) => (
							<div>
								<ProductThumb product={variant.product} variant={variant}/>
							</div>
						))}
					</Grid>
				</Section>
			</Fragment>
		);
	}
}

export default withShopifyContext(Product);