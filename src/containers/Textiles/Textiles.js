import React from 'react';
import ReactGA from 'react-ga'

import { withShopifyContext } from 'src/contexts/ShopifyContext'

import SEO from "src/components/SEO";
import Header from "src/components/Header";

import CalloutText from 'src/components/CalloutText'
import Textiles from 'src/components/Textiles'


const TextilesPage = ({ shopifyContext }) => {

	const { shopifyProducts } = shopifyContext
	const textileProducts = shopifyProducts.filter(({ productType }) => productType === 'Textiles')

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