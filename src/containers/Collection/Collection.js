import React, { Component, Fragment } from 'react';

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

import LayerReni from 'src/assets/images/collage/Reni/painting/layer-1.png'
import LayerReni2 from 'src/assets/images/collage/Reni/painting/layer-2.png'
import LayerReni3 from 'src/assets/images/collage/Reni/painting/layer-3.png'
import LayerReni4 from 'src/assets/images/collage/Reni/painting/layer-4.png'

import LayerMatisse from 'src/assets/images/collage/Matisse/painting/layer-1.png'
import LayerMatisse2 from 'src/assets/images/collage/Matisse/painting/layer-2.png'
import LayerMatisse3 from 'src/assets/images/collage/Matisse/painting/layer-3.png'
import LayerMatisse4 from 'src/assets/images/collage/Matisse/painting/layer-4.png'

const Images = {
	Reni: {
		layer1: { src: LayerReni, width: 617, height: 674 },
		layer2: { src: LayerReni2, width: 617, height: 674 },
		layer3: { src: LayerReni3, width: 617, height: 674 },
		layer4: { src: LayerReni4, width: 617, height: 674 },
		nextCollectionImage: ReniNextCollectionImage
	},
	Matisse: {
		layer1: { src: LayerMatisse, width: 617, height: 588 },
		layer2: { src: LayerMatisse2, width: 617, height: 588 },
		layer3: { src: LayerMatisse3, width: 617, height: 588 },
		layer4: { src: LayerMatisse4, width: 617, height: 588 },
		nextCollectionImage: MatisseNextCollectionImage
	}
}


class Collection extends Component {
	state = {
		collections: false
	}

	componentDidMount () {
		this.setState({ collections: this.props.shopifyContext.shopifyCollections })
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
									Images[title].layer3,
									Images[title].layer4
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