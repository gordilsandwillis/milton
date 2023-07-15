import React from 'react'

import { withShopifyContext } from 'contexts/ShopifyContext'

import SEO from "components/SEO"
import Header from "components/Header"

import CalloutText from 'components/CalloutText'
import Furnishings from 'components/Furnishings'

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
			<Furnishings products={furnitureProducts} hideTitle={true} />
    </div>
  )
}

export default withShopifyContext(Shop);