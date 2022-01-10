import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga'
import { withShopifyContext } from 'src/contexts/ShopifyContext'

import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import Grid from 'src/components/Grid'
import Section from 'src/components/Section'
import Furnishings from 'src/components/Furnishings'
import Textiles from 'src/components/Textiles'
import StackedImages from 'src/components/StackedImages'
import SEO from 'src/components/SEO'

import MatisseNextCollectionImage from 'src/assets/images/matisse-stage.jpg'
import ReniNextCollectionImage from 'src/assets/images/reni-stage.jpg'

import ThumbnailReni from 'src/assets/images/collage/Reni/reni-layer-1.png'
import ThumbnailReni2 from 'src/assets/images/collage/Reni/reni-layer-2.png'
import ThumbnailReni3 from 'src/assets/images/collage/Reni/reni-layer-3.png'

import ThumbnailMatisse from 'src/assets/images/collage/Matisse/matisse-layer-1.png'
import ThumbnailMatisse2 from 'src/assets/images/collage/Matisse/matisse-layer-2.png'
import ThumbnailMatisse3 from 'src/assets/images/collage/Matisse/matisse-layer-3.png'


const Images = {
	Reni: {
		layer1: { src: ThumbnailReni, width: 720, height: 619 },
		layer2: { src: ThumbnailReni2, width: 720, height: 619 },
		layer3: { src: ThumbnailReni3, width: 720, height: 619 },
		nextCollectionImage: ReniNextCollectionImage
	},
	Matisse: {
		layer1: { src: ThumbnailMatisse, width: 720, height: 619 },
		layer2: { src: ThumbnailMatisse2, width: 720, height: 619 },
		layer3: { src: ThumbnailMatisse3, width: 720, height: 619 },
		nextCollectionImage: MatisseNextCollectionImage
	}
}


class Collection extends Component {
	state = {
		collections: false
	}

	componentDidMount () {
		this.setState({ collections: this.props.shopifyContext.shopifyCollections })
		if (process.env.NODE_ENV === 'production') {
	    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING);
			ReactGA.pageview(window.location.pathname + window.location.search);
		}
	}

	render() {
		const { collections } = this.state

		if (!collections) {
			return false
		}

		const collectionHandle = this.props.match.params.id
		const collection = collections.find(({handle}) => handle === collectionHandle)
		const collectionIndex = collections.findIndex(({handle}) => handle === collectionHandle)
		const nextIndex = (collectionIndex + 1) % collections.length
		const nextCollection = collections[nextIndex]
		const collectionProducts = collection.products
		const hasAtf = collection.image && collection.image.src

		const textileProducts = collectionProducts.filter(({ productType }) => productType === 'Textiles')
		const furnitureProducts = collectionProducts.filter(({ productType }) => productType === 'Furniture')

		const { title, description, image, descriptionHtml } = collection

		return (
			<Fragment>
				<SEO title={title} description={description} />
				<Header hasAtf={hasAtf}/>
				{hasAtf ? (
					<div>
						<ATF
							index={0}
							image={{
								fluid: {
									aspectRatio: 2,
									src: image.src,
									srcSet: '',
									sizes: ''
								}
							}}
							overlay={false}
						/>
						<CalloutText
							nextTheme="bgColor"
							theme="bgColor"
							alignment="center"
							headline={title}
							text={descriptionHtml}
							headlineSize="h2"
						/>
					</div>
				) : (
					<CalloutText
						prevTheme="bgColor"
						nextTheme="bgColor"
						theme="bgColor"
						alignment="center"
						headline={title}
						text={descriptionHtml}
						headlineSize="h2"
					/>
				)}

				<Textiles products={textileProducts} hasAtf={hasAtf} />

				{furnitureProducts && furnitureProducts.length > 0 && (
					<Section>
						<Grid small="2 [10] 2" medium="4 [6] 4" larger="9 [10] 9" extraLarge="5 [4] 5">
							<div>
								<StackedImages images={[
									Images[title].layer1,
									Images[title].layer2,
									Images[title].layer3
								]}/>
							</div>
						</Grid>
					</Section>
				)}

				<Furnishings products={furnitureProducts} />

				<ATF
					eyebrow="Next Collection"
					headline={nextCollection.title}
					headlineSize="h3"
					text={nextCollection.descriptionHtml}
					image={{
						fluid: {
							aspectRatio: 2,
							// src: nextCollection.image.src,
							src: Images[nextCollection.title].nextCollectionImage,
							srcSet: '',
							sizes: ''
						}
					}}
					buttons={[{
						linkType: 'button',
						label: 'Explore Collection',
						to: `/collections/${nextCollection.handle}`
					}]}
				/>
			</Fragment>
		);
	}
}

export default withShopifyContext(Collection);