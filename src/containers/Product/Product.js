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
import { colors, util, mq } from 'src/styles'

// import { Helmet } from "react-helmet";

const ImgArea = styled.div`
	${ util.responsiveStyles('padding-top', 150, 135, 100, 60) }
	${ util.responsiveStyles('padding-bottom', 150, 135, 100, 60) }
	background: ${ colors.white };
`

const TextArea = styled.div`
	${ util.responsiveStyles('padding-top', 150, 135, 100, 60) }
	${ util.responsiveStyles('padding-bottom', 150, 135, 100, 60) }
`

const ProductImage = styled(Image)`
	background: ${ colors.bgColor };
`

const VariantLink = styled(Link)`
	width: 100px;
	${ util.responsiveStyles('width', 80, 60, 60, 50) }
	display: block;
	background: ${ colors.lightGrey };
`

const VariantLinks = styled.div`
	display: flex;
	a {
		margin-left: 12px;
		&:first-child {
			margin-left: 0;
		}
	}
`

class Product extends Component {
	state = {
		products: this.props.shopifyContext.shopifyProducts
	}

	render() {
		// const { products } = this.props.shopifyContext.shopifyProducts

		// if (!products) {
		// 	return false
		// }

		const productHandle = this.props.match.params.product
		const variantId = this.props.match.params.variant

		let filteredProducts = false
		let currentProduct = false
		let currentVariant = false
		let variantImages = []

		if (this.props.shopifyContext.shopifyProducts) {
			let products = this.props.shopifyContext.shopifyProducts
			currentProduct = products.filter( i => productHandle.includes( i.handle ) )[0]
			currentVariant = currentProduct.variants.filter( i => variantId.includes( i.id ) )[0]
			variantImages = currentProduct.images.filter( i => currentVariant.title.includes( i.altText ) )
		} else {
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
					<Grid small="[1]" large="[6] [6]" vAlign="center">
						<ImgArea>
							{variantImages.map((image, index) => {
								return (
									<Grid small="1 [12] 1" large="1 [4] 1" key={currentVariant.id + '-image-' + index}>
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
						</ImgArea>
						<TextArea>
							<Grid small="1 [12] 1" large="1 [4] 1">
								<div>
									<TextLockup
										eyebrow={currentProduct.title}
										headline={currentVariant.title}
										headlineSize="h2"
										text={currentProduct.descriptionHtml}
										alignment="left"
										additions={<div style={{ marginTop: '25px' }}>
											<Button>Inquire</Button>
											{currentProduct.variants.length > 1 && (
												<VariantLinks>
													{currentProduct.variants.map((variant, index) => {
														if (variant.id !== currentVariant.id)
														return (
															<VariantLink to={'/product/' + currentProduct.handle + '/' + variant.id} key={variant.id}>
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

				<Section setTheme="bgColor" nextTheme="bgColor">
					<Grid small="1 [12] 1">
						<h4 style={{ textAlign: 'center' }}><span style={{ textTransform: 'lowercase', fontStyle: 'italic' }}>more</span> Reni</h4>
					</Grid>
				</Section>
				<Section prevTheme="bgColor" setTheme="bgColor">
					<Grid
						small="1 [6] [6] 1"
						medium="1 [3] [3] [3] [3] 1"
						colGap={['3.6vw', '24px', '30px']}
						rowGap={['50px', '70px', '80px']}
					>
						<div>
							<ProductThumb product={currentProduct} variant={currentVariant}/>
						</div>
						<div>
							<ProductThumb product={currentProduct} variant={currentVariant}/>
						</div>
						<div>
							<ProductThumb product={currentProduct} variant={currentVariant}/>
						</div>
						<div>
							<ProductThumb product={currentProduct} variant={currentVariant}/>
						</div>
					</Grid>
				</Section>
			</Fragment>
		);
	}
}

export default withShopifyContext(Product);