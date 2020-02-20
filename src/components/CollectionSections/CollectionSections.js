import React, { Component } from 'react';
import FiftyFifty from 'src/components/FiftyFifty'
import ThumbnailReni from 'src/assets/images/collection-reni.png'
import ThumbnailMatisse from 'src/assets/images/collection-matisse.png'
import { withShopifyContext } from 'src/contexts/ShopifyContext'

const Thumbnails = {
	Reni: ThumbnailReni,
	Matisse: ThumbnailMatisse,
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
						image={{
							fluid: {
								aspectRatio: 1.158,
								src: Thumbnails[collection.title],
								srcSet:'',
								sizes: ''

							}
						}}
						imagePosition={index % 2 ? 'left' : 'right'}
					/>
				)
			}
			return null;
		})

	}
}

export default withShopifyContext(CollectionSections);