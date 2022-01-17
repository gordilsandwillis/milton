import React from 'react'

import { withShopifyContext } from 'src/contexts/ShopifyContext'

import SEO from "src/components/SEO"
import Header from "src/components/Header"

import CalloutText from 'src/components/CalloutText'
import Furnishings from 'src/components/Furnishings'

const Shop = ({ shopifyContext }) => {

	const { shopifyProducts } = shopifyContext
	const furnitureProducts = shopifyProducts.filter(({ productType }) => productType === 'Furniture')

  return (
    <div>
    	<SEO title="Shop" />
	    <Header
    		hasAtf={false}
    		homepage={false}
    		collapsed={false}
    	/>
    	<CalloutText
				nextTheme="bgColor"
				theme="bgColor"
				alignment="center"
				headline="Shop"
				headlineSize="h2"
			/>
			<Furnishings products={furnitureProducts} />
    </div>
  )
}

export default withShopifyContext(Shop);