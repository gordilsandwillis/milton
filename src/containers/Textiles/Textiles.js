import React from 'react';

import { withShopifyContext } from 'contexts/ShopifyContext'

import SEO from "components/SEO";
import Header from "components/Header";

import CalloutText from 'components/CalloutText'
import Textiles from 'components/Textiles'


const TextilesPage = ({ shopifyContext }) => {
	const { shopifyCollections } = shopifyContext
	const textileCollection = shopifyCollections.filter(({ handle }) => handle === 'textiles')[0]
	const textileProducts = textileCollection.products

  return (
    <div>
    	<SEO title="Textiles" />
    	<Header
    		hasAtf={false}
    		homepage={false}
    		collapsed={false}
    	/>
    	<CalloutText
				nextTheme="bgColor"
				theme="bgColor"
				alignment="center"
				headline="Textiles"
				headlineSize="h2"
			/>
			<Textiles products={textileProducts} hasAtf={false} />
    </div>
  )
}

export default withShopifyContext(TextilesPage);