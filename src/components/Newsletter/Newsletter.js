import React from 'react'
import styled from '@emotion/styled'
import ATF from 'src/components/ATF'
import MailchimpSignup from 'src/components/MailchimpSignup'
import { colors, util } from 'src/styles'

import PlaceholderNewsletterImage from 'src/assets/images/Ethridge-2002100158.jpg'

const NewsletterBlock = styled(ATF)`
	p {
		max-width: 20em !important;
	}
`

const NewsletterForm = styled(MailchimpSignup)`
	color: ${ colors.bgColor };
	${ util.responsiveStyles('margin-top', 36, 30, 24, 24) }
	position: relative;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
	label {
		color: ${ colors.bgColor };
	}
	input.input {
		background: transparent;
		border-color: ${ colors.bgColor };
		color: ${ colors.bgColor };
		&:hover,
		&:focus {
			background: transparent;
			border-color: ${ colors.bgColor };
		}
	}
	button {
		position: absolute;
		right: 0;
		top: 0;
	}
`

const Newsletter = () => (
	<NewsletterBlock
		headline="Stay Updated"
		headlineSize="h3"
		text="Sign up to be the first to know about new collections, events, and sample sales."
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
		<NewsletterForm
			size="large"
			theme="transparent"
			buttonTheme="transparent"
			label="Enter Email"
		/>
	</NewsletterBlock>
)

export default Newsletter
