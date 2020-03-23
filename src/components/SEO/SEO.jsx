import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { withShopifyContext } from 'src/contexts/ShopifyContext'


const SEO = ({
	description,
	lang,
	meta,
	keywords,
	title: pageTitle,
	shareImage,
	shopifyContext
}) => {
	const { name: siteTitle } = shopifyContext.shop
	return (<Helmet
		title={`${pageTitle} | ${siteTitle}`}
		description={description}
		keywords={keywords.join(`, `)}
	>
		<meta property="og:title" content={`${pageTitle} | ${siteTitle}`} />
		<meta property="og:image" content={shareImage} />
		<meta property="og:description" content={description} />
	</Helmet>)
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	keywords: [],
	description: ``,
	shareImage: ``
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	keywords: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string
}

export default withShopifyContext(SEO)
