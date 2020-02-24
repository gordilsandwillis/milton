import React, { Component } from 'react';
import FiftyFifty from 'src/components/FiftyFifty'
import StackedImages from 'src/components/StackedImages'

import ThumbnailReni from 'src/assets/images/collage/Reni/reni-layer-1.png'
import ThumbnailReni2 from 'src/assets/images/collage/Reni/reni-layer-2.png'
import ThumbnailReni3 from 'src/assets/images/collage/Reni/reni-layer-3.png'
import ThumbnailReni4 from 'src/assets/images/collage/Reni/reni-layer-4.png'

import ThumbnailMatisse from 'src/assets/images/collage/Matisse/matisse-layer-1.png'
import ThumbnailMatisse2 from 'src/assets/images/collage/Matisse/matisse-layer-2.png'
import ThumbnailMatisse3 from 'src/assets/images/collage/Matisse/matisse-layer-3.png'
import ThumbnailMatisse4 from 'src/assets/images/collage/Matisse/matisse-layer-4.png'

import { withShopifyContext } from 'src/contexts/ShopifyContext'

const Thumbnails = {
	Reni: [
		ThumbnailReni,
		ThumbnailReni2,
		ThumbnailReni3,
		ThumbnailReni4
	],
	Matisse: [
		ThumbnailMatisse,
		ThumbnailMatisse2,
		ThumbnailMatisse3,
		ThumbnailMatisse4
	]
}

class CollectionSections extends Component {
	state = {
		collections: this.props.shopifyContext.shopifyCollections
	}

	render() {
		const { collections } = this.state

		if (!collections) {
			return false
		}

		return collections.map((collection, index) => {
			if (collection.products.length > 0) {
				return (
					<FiftyFifty
						key={collection.id}
						prevTheme="bgColor"
						nextTheme="white"
						theme="bgColor"
						eyebrow="Collection"
						headline={collection.title}
						headlineSize="h2"
						alignment="center"
						text={collection.description}
						buttons={[{ linkType: 'button', label: 'Explore Collection', to: '/collections/' + collection.handle }]}
						imageContent={<StackedImages images={[
							Thumbnails[collection.title][0],
							Thumbnails[collection.title][1],
							Thumbnails[collection.title][2],
							Thumbnails[collection.title][3]
						]}/>}
						imagePosition={index % 2 ? 'left' : 'right'}
					/>
				)
			}
			return null;
		})

	}
}

export default withShopifyContext(CollectionSections);