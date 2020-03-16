import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled'
import { FaPinterest } from 'react-icons/fa'

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
import SEO from 'src/components/SEO'
import ProductSpecifications from 'src/components/ProductSpecifications'

import { colors, util, mq } from 'src/styles'

const ImgArea = styled.div`
	${ util.responsiveStyles('padding-top', 150, 135, 100, 90) }
	background: ${ colors.white };
	height: 100%;
`

const InquireButton = styled(Button)`
	${ util.responsiveStyles('margin-top', 32, 26, 24, 24) }
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
	z-index: 1;
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

const PinItButton = styled.a`
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 12px;
	z-index: 2;
	transition: opacity .3s ease-in-out, transform .2s ease-in-out;
	opacity: 0;
	border-radius: 50%;
	color: ${ colors.white };
	background: transparent;
	&:hover {
		color: ${ colors.white };
		background: transparent;
		transform: scale(1.3);
	}
	svg {
		display: block;
	}
`

const SlideWrap = styled.div`
	position: relative;
	&:hover {
		.pin-it-button {
			opacity: 1;
		}
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

	handleInquireClick = (event) => {
		const { currentProduct, currentVariant, currentCollection } = this.state
		const { modalContext } = this.props
		modalContext.toggleModal({currentProduct, currentVariant, currentCollection, buttonLabel: 'Send Inquiry'})
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
		let variantImages = currentProduct.images.filter( i => currentVariant.title.includes( i.altText ) )
		const collectionProducts = currentCollection.products.filter( product => product.id !== currentProduct.id )
		const moreProducts = collectionProducts.sort(function (a, b) { return 0.5 - Math.random() }).slice(0, 4)

		const productSpecifications = currentProduct.metafields.filter( ({namespace}) => namespace === 'specifications')

		if (!variantImages || variantImages.length === 0) {
			variantImages = [currentVariant.image]
		}

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

		console.log(currentProduct)

		return (
			<Fragment>
				<SEO title={`${currentVariant.title} ${currentProduct.title}`} description={currentProduct.description} />
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
											<SlideWrap>
												<PinItButton
													className="pin-it-button"
													target="_blank"
													onClick={(event) => { event.preventDefault(); window.open("http://pinterest.com/pin/create/button/?url=" + window.location.href + "&media=" + image.src + '&description=' + currentProduct.title + '|' + currentVariant.title, 'mywin', 'left=20,top=20,width=600,height=600,toolbar=1,resizable=0'); return false; }}
													href={"http://pinterest.com/pin/create/button/?url=" + window.location.href + "&media=" + image.src + '&description=' + currentProduct.title + ' | ' + currentVariant.title}
												><FaPinterest size={24}/></PinItButton>
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
											</SlideWrap>
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
										{productSpecifications ? (
											<ProductSpecifications
												keys={['width', 'care', 'content', 'performance']}
												specifications={productSpecifications}
												variants={currentProduct.variants}
												currentProduct={currentProduct}
												currentVariant={currentVariant}
											/>
										) : false}
										<InquireButton
											onClick={this.handleInquireClick}
											size="large"
										>
										Inquire
										</InquireButton>
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
						medium="1 [3] [3] [3] [3] 1"
						colGap={['3.6vw', '24px', '30px']}
						rowGap={['50px', '70px', '80px']}
					>
						{moreProducts.map((product) => (
							<div key={product.id}>
								<ProductThumb
									product={product}
									variant={product.variants[0]}
								/>
							</div>
						))}
					</Grid>
					<Grid
						small="1 [12] 1"
					>
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
					</Grid>
				</Section>
			</Fragment>
		);
	}
}

export default withShopifyContext(withModalContext(Product));