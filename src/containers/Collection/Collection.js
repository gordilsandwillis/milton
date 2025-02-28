import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga'
import { withShopifyContext } from 'contexts/ShopifyContext'

import Header from 'components/Header'
import ATF from 'components/ATF'
import CalloutText from 'components/CalloutText'
import Grid from 'components/Grid'
import Section from 'components/Section'
import Furnishings from 'components/Furnishings'
import Textiles from 'components/Textiles'
import StackedImages from 'components/StackedImages'
import SEO from 'components/SEO'

import MatisseNextCollectionImage from 'assets/images/matisse-stage.jpg'
import ReniNextCollectionImage from 'assets/images/reni-stage.jpg'

import HopperNextCollectionImage from 'assets/images/hopper-stage.jpg'
import RousseauNextCollectionImage from 'assets/images/rousseau-stage.jpg'
import KeesNextCollectionImage from 'assets/images/kees-close-up.jpg'

import ThumbnailReni from 'assets/images/collage/Reni/reni-layer-1.png'
import ThumbnailReni2 from 'assets/images/collage/Reni/reni-layer-2.png'
import ThumbnailReni3 from 'assets/images/collage/Reni/reni-layer-3.png'

import ThumbnailMatisse from 'assets/images/collage/Matisse/matisse-layer-1.png'
import ThumbnailMatisse2 from 'assets/images/collage/Matisse/matisse-layer-2.png'
import ThumbnailMatisse3 from 'assets/images/collage/Matisse/matisse-layer-3.png'

import LayerRousseau from 'assets/images/collage/Rousseau/rousseau-layer-1.png'
import LayerRousseau2 from 'assets/images/collage/Rousseau/rousseau-layer-2.png'
import LayerRousseau3 from 'assets/images/collage/Rousseau/rousseau-layer-3.png'

import LayerHopper from 'assets/images/collage/Hopper/hopper-layer-1.png'
import LayerHopper2 from 'assets/images/collage/Hopper/hopper-layer-2.png'
import LayerHopper3 from 'assets/images/collage/Hopper/hopper-layer-3.png'

import LayerKees from 'assets/images/collage/Kees/layer-1.png'
import LayerKees2 from 'assets/images/collage/Kees/layer-2.png'
import LayerKees3 from 'assets/images/collage/Kees/layer-3.png'

const Images = {
	Kees: {
		layer1: { src: LayerKees, width: 1200, height: 1200 },
		layer2: { src: LayerKees3, width: 1200, height: 1200 },
		layer3: { src: LayerKees2, width: 1200, height: 1200 },
		nextCollectionImage: KeesNextCollectionImage,
		nextCollectionMask: false,
	},
	Reni: {
		layer1: { src: ThumbnailReni, width: 720, height: 619 },
		layer2: { src: ThumbnailReni2, width: 720, height: 619 },
		layer3: { src: ThumbnailReni3, width: 720, height: 619 },
		nextCollectionImage: ReniNextCollectionImage,
		nextCollectionMask: false,
	},
	Matisse: {
		layer1: { src: ThumbnailMatisse, width: 720, height: 619 },
		layer2: { src: ThumbnailMatisse2, width: 720, height: 619 },
		layer3: { src: ThumbnailMatisse3, width: 720, height: 619 },
		nextCollectionImage: MatisseNextCollectionImage,
		nextCollectionMask: false,
	},
	Hopper: {
		layer1: { src: LayerHopper, width: 720, height: 619 },
		layer2: { src: LayerHopper2, width: 720, height: 619 },
		layer3: { src: LayerHopper3, width: 720, height: 619 },
		nextCollectionImage: HopperNextCollectionImage,
		nextCollectionMask: true,
	},
	Rousseau: {
		layer1: { src: LayerRousseau, width: 720, height: 619 },
		layer2: { src: LayerRousseau2, width: 720, height: 619 },
		layer3: { src: LayerRousseau3, width: 720, height: 619 },
		nextCollectionImage: RousseauNextCollectionImage,
		nextCollectionMask: true,
	},
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
		const furnitureProducts = collectionProducts.filter(({ productType }) => productType !== 'Textiles')

		const { title, description, image, descriptionHtml } = collection

		return (
			<Fragment>
				<SEO title={title} description={description} />
				<Header hasAtf={hasAtf}/>
				{hasAtf ? (
					<div>
						<ATF
							index={0}
							isFirstSection={true}
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

				{textileProducts?.length > 0 && (
					<Textiles products={textileProducts} hasAtf={hasAtf} />
				)}

				{Images[title] && (
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

				<Furnishings products={furnitureProducts} hideTitle={textileProducts?.length < 1} />

				<ATF
					eyebrow="Next Collection"
					headline={nextCollection.title}
					headlineSize="h3"
					mask={Images[nextCollection.title]?.nextCollectionMask}
					text={nextCollection.descriptionHtml}
					image={{
						fluid: {
							aspectRatio: 2,
							// src: nextCollection.image.src,
							src: Images[nextCollection.title]?.nextCollectionImage,
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