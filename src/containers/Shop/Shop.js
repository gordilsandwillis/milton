import React from 'react'

import { withShopifyContext } from 'contexts/ShopifyContext'

import SEO from "components/SEO"
import Header from "components/Header"

import CalloutText from 'components/CalloutText'
import Furnishings from 'components/Furnishings'

const Shop = ({ shopifyContext }) => {

	const { shopifyCollections } = shopifyContext
	const allProducts = shopifyCollections.filter(collection => collection.title === 'Shop')[0].products

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
			<Furnishings products={allProducts} hideTitle={true} />
    </div>
  )
}

export default withShopifyContext(Shop);