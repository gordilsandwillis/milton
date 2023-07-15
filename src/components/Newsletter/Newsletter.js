import React from 'react'
import styled from '@emotion/styled'
import ATF from 'components/ATF'
import NewsletterForm from 'components/NewsletterForm'

import PlaceholderNewsletterImage from 'assets/images/matisse-stage.jpg'

const NewsletterBlock = styled(ATF)`
	p {
		max-width: 20em !important;
	}
`

const Newsletter = () => (
	<NewsletterBlock
		headline="Stay Up to Date"
		headlineSize="h3"
		text="Receive updates about new collections and furnishings."
		textSize="bodyMedium"
		overlay=".1"
		image={{
			fluid: {
				aspectRatio: 2,
				src: PlaceholderNewsletterImage,
				srcSet: '',
				sizes: ''
			}
		}}
	>
		<NewsletterForm/>
	</NewsletterBlock>
)

export default Newsletter
