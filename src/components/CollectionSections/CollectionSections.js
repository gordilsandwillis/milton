import React, { Component } from 'react';
import FiftyFifty from 'components/FiftyFifty'
import StackedImages from 'components/StackedImages'
import Link from 'components/Link'

import LayerReni from 'assets/images/collage/Reni/painting/layer-1.png'
import LayerReni2 from 'assets/images/collage/Reni/painting/layer-2.png'
import LayerReni3 from 'assets/images/collage/Reni/painting/layer-3.png'

import LayerMatisse from 'assets/images/collage/Matisse/painting/layer-1.png'
import LayerMatisse2 from 'assets/images/collage/Matisse/painting/layer-2.png'
import LayerMatisse3 from 'assets/images/collage/Matisse/painting/layer-3.png'

import LayerRousseau from 'assets/images/collage/Rousseau/painting/layer-1.png'
import LayerRousseau2 from 'assets/images/collage/Rousseau/painting/layer-2.png'
import LayerRousseau3 from 'assets/images/collage/Rousseau/painting/layer-3.png'

import LayerHopper from 'assets/images/collage/Hopper/painting/layer-1.png'
import LayerHopper2 from 'assets/images/collage/Hopper/painting/layer-2.png'
import LayerHopper3 from 'assets/images/collage/Hopper/painting/layer-3.png'

import LayerRavenna from 'assets/images/collage/Ravenna/layer-1.png'
import LayerRavenna2 from 'assets/images/collage/Ravenna/layer-2.png'
import LayerRavenna3 from 'assets/images/collage/Ravenna/layer-3.png'

import LayerKees from 'assets/images/collage/Kees/layer-1.png'
import LayerKees2 from 'assets/images/collage/Kees/layer-2.png'
import LayerKees3 from 'assets/images/collage/Kees/layer-3.png'

import { withShopifyContext } from 'contexts/ShopifyContext'

const Images = {
	Kees: {
		title: 'Kees',
		description: 'Kees is our first print fabric; a vibrant and luscious floral that will transport you to the whimsical design of 1940’s Italy, with a touch of glamour from the Hollywood Regency era all wrapped up with a punch.',
		layer1: { src: LayerKees, width: 1200, height: 1200 },
		layer2: { src: LayerKees3, width: 1200, height: 1200 },
		layer3: { src: LayerKees2, width: 1200, height: 1200 },
	},
	Ravenna: {
		published: true,
		title: 'Ravenna',
		description: 'Ravenna is our first print fabric; a vibrant and luscious floral that will transport you to the whimsical design of 1940’s Italy, with a touch of glamour from the Hollywood Regency era all wrapped up with a punch.',
		link: '/product/ravenna/Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDI1NTk2ODc3MjE3NA==',
		layer1: { src: LayerRavenna, width: 617, height: 674 },
		layer2: { src: LayerRavenna2, width: 617, height: 674 },
		layer3: { src: LayerRavenna3, width: 617, height: 674 },
	},
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
	Kees: {
		published: true,
	},
	Ravenna: {
		published: true,
	},
	Matisse: {
		published: true,
	},
	Reni: {
		published: true
	},
	Rousseau: {
		published: true
	},
	Hopper: {
		published: true
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
		
		const filteredCollections = collections.filter(collection => collectionsConfig[collection.title]?.published)

		return (
			<>
				{filteredCollections
					.reverse()
					.map((collection, index) => {
					if (Images[collection.title]) {
						const hasFirstItem = Images['Ravenna'].published
						let chooseSide = index % 2 ? 'left' : 'right'
						// if (hasFirstItem) {
						// 	chooseSide = index % 2 ? 'right' : 'left'
						// }
						if (index === 0) {
							chooseSide = 'left'
						}
						return (
							<>
								{(index === 1 && Images['Ravenna'].published) && (
									<FiftyFifty
										prevTheme={"bgColor"}
										nextTheme={"bgColor"}
										theme="bgColor"
										eyebrow="New Fabric"
										headline={Images['Ravenna'].title}
										headlineSize="h2"
										alignment="center"
										text={Images['Ravenna'].description}
										buttons={[{ linkType: 'button', label: 'Explore', to: Images['Ravenna'].link }]}
										imageContent={
											<Link label={Images['Ravenna'].title} to={Images['Ravenna'].link}>
												<StackedImages images={[
													Images['Ravenna'].layer1,
													Images['Ravenna'].layer2,
													Images['Ravenna'].layer3
												]}/>
										</Link>}
										imagePosition={'right'}
									/>
								)}
								<FiftyFifty
									key={collection.id}
									prevTheme="bgColor"
									// nextTheme={furnitureProducts ? "bgColor" : "white"}
									nextTheme={index + 1 === filteredCollections.length ? false : "bgColor"}
									theme="bgColor"
									eyebrow="Collection"
									headline={collection.title}
									headlineSize="h2"
									alignment="center"
									text={collection.descriptionHtml}
									buttons={[{ linkType: 'button', label: 'Explore Collection', to: '/collections/' + collection.handle }]}
									imageContent={
										<Link label={collection.title} to={'/collections/' + collection.handle}>
											<StackedImages images={[
												Images[collection.title].layer1,
												Images[collection.title].layer2,
												Images[collection.title].layer3
											]}/>
									</Link>}
									imagePosition={chooseSide}
								/>
							</>
						)
					}
					return null;
				})}
			</>
		)

	}
}

export default withShopifyContext(CollectionSections);