import React, { Component } from 'react';
import FiftyFifty from 'src/components/FiftyFifty'
import StackedImages from 'src/components/StackedImages'
import Link from 'src/components/Link'

import LayerReni from 'src/assets/images/collage/Reni/painting/layer-1.png'
import LayerReni2 from 'src/assets/images/collage/Reni/painting/layer-2.png'
import LayerReni3 from 'src/assets/images/collage/Reni/painting/layer-3.png'

import LayerMatisse from 'src/assets/images/collage/Matisse/painting/layer-1.png'
import LayerMatisse2 from 'src/assets/images/collage/Matisse/painting/layer-2.png'
import LayerMatisse3 from 'src/assets/images/collage/Matisse/painting/layer-3.png'

import LayerRousseau from 'src/assets/images/collage/Rousseau/painting/layer-1.png'
import LayerRousseau2 from 'src/assets/images/collage/Rousseau/painting/layer-2.png'
import LayerRousseau3 from 'src/assets/images/collage/Rousseau/painting/layer-3.png'

import LayerHopper from 'src/assets/images/collage/Hopper/painting/layer-1.png'
import LayerHopper2 from 'src/assets/images/collage/Hopper/painting/layer-2.png'
import LayerHopper3 from 'src/assets/images/collage/Hopper/painting/layer-3.png'

import { withShopifyContext } from 'src/contexts/ShopifyContext'

const Images = {
	Hopper: {
		layer1: { src: LayerHopper, width: 617, height: 674 },
		layer2: { src: LayerHopper2, width: 617, height: 674 },
		layer3: { src: LayerHopper3, width: 617, height: 674 },
	},
	Rousseau: {
		layer1: { src: LayerRousseau, width: 617, height: 674 },
		layer2: { src: LayerRousseau2, width: 617, height: 674 },
		layer3: { src: LayerRousseau3, width: 617, height: 674 },
	},
	Reni: {
		layer1: { src: LayerReni, width: 617, height: 674 },
		layer2: { src: LayerReni2, width: 617, height: 674 },
		layer3: { src: LayerReni3, width: 617, height: 674 },

	},
	Matisse: {
		layer1: { src: LayerMatisse, width: 617, height: 588 },
		layer2: { src: LayerMatisse2, width: 617, height: 588 },
		layer3: { src: LayerMatisse3, width: 617, height: 588 },
	}
}

const collectionsConfig = {
	Matisse: {
		published: true,
	},
	Reni: {
		published: true
	},
	Rousseau: {
		published: false
	},
	Hopper: {
		published: false
	}
}



class CollectionSections extends Component {
	state = {
		collections: this.props.shopifyContext.shopifyCollections
	}

	render() {
		const { collections } = this.state
		const { furnitureProducts } = this.props

		if (!collections) {
			return false
		}

		return collections
			.filter(collection => collectionsConfig[collection.title]?.published)
			.reverse()
			.map((collection, index) => {
			if (Images[collection.title]) {
				return (
					<FiftyFifty
						key={collection.id}
						prevTheme="bgColor"
						nextTheme={furnitureProducts ? "bgColor" : "white"}
						theme="bgColor"
						eyebrow="Collection"
						headline={collection.title}
						headlineSize="h2"
						alignment="center"
						text={collection.descriptionHtml}
						buttons={[{ linkType: 'button', label: 'Explore Collection', to: '/collections/' + collection.handle }]}
						imageContent={<Link to={'/collections/' + collection.handle}><StackedImages images={[
							Images[collection.title].layer1,
							Images[collection.title].layer2,
							Images[collection.title].layer3
						]}/></Link>}
						imagePosition={index % 2 ? 'left' : 'right'}
					/>
				)
			}
			return null;
		})

	}
}

export default withShopifyContext(CollectionSections);