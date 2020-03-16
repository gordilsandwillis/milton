import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const SEO = ({
	description,
	lang,
	meta,
	keywords,
	title,
	shareImage,
	siteSettings
}) => {

	// const host = process.env.HOST

	/*<Helmet>
    <meta charSet="utf-8" />
    <title>{PageTitle + ' | ' + Tagline}</title>
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={PageTitle + ' | ' + Tagline} />
    <meta property="og:description" content={PageDescription} />
    <meta property="og:url" content={URL} />
    <meta property="og:site_name" content={PageTitle} />
    <meta property="og:image" content={shareImage} />
    <meta property="og:image:secure_url" content={URL} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="800" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:description" content={PageDescription} />
    <meta name="twitter:title" content={PageTitle + ' | ' + Tagline} />
    <meta name="twitter:image" content={shareImage} />
  </Helmet>*/

	// return (
	// 	<Helmet
	// 		htmlAttributes={{
	// 			lang,
	// 		}}
	// 		title={title}
	// 		titleTemplate={`%s | ${ site.siteMetadata.title }`}
	// 		meta={[
	// 			{
	// 				name: `viewport`,
	// 				content: `width=device-width, initial-scale=1.0, maximum-scale=1.0`,
	// 			},
	// 			{
	// 				name: `description`,
	// 				content: metaDescription,
	// 			},
	// 			{
	// 				property: `og:title`,
	// 				content: `${ title } | ${ site.siteMetadata.title }`,
	// 			},
	// 			{
	// 				property: `og:type`,
	// 				content: `website`,
	// 			},
	// 			{
	// 				property: `og:image`,
	// 				content: `${ host }${ metaShareImage }`
	// 			},
	// 			{
	// 				property: `og:description`,
	// 				content: metaDescription,
	// 			},
	// 			{
	// 				name: `twitter:image`,
	// 				content: `${ host }${ metaShareImage }`
	// 			},
	// 			{
	// 				name: `twitter:card`,
	// 				content: `summary`,
	// 			},
	// 			{
	// 				name: `twitter:creator`,
	// 				content: site.siteMetadata.author,
	// 			},
	// 			{
	// 				name: `twitter:title`,
	// 				content: `${ title } | ${ site.siteMetadata.title }`,
	// 			},
	// 			{
	// 				name: `twitter:description`,
	// 				content: metaDescription,
	// 			},
	// 		]
	// 			.concat(
	// 				keywords.length > 0
	// 					? {
	// 						name: `keywords`,
	// 						content: keywords.join(`, `),
	// 					}
	// 					: []
	// 			)
	// 			.concat(meta)}
	// 		link={[
	// 			{ rel: 'icon', type: 'image/png', sizes: '32x32', href: contentfulFavicon },
	// 			{ rel: 'apple-touch-icon', type: 'image/png', sizes: '120x120', href: contentfultouchIcon }
	// 		]}
	// 	/>
	// )
	return (<Helmet />)
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

export default SEO
