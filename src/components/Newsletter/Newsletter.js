import React from 'react'

import ATF from 'src/components/ATF'
import Input from 'src/components/Input'
import Grid from 'src/components/Grid'

import PlaceholderNewsletterImage from 'src/assets/images/Ethridge-2002100158.jpg'

const Newsletter = () => (
	<ATF
		headline="Stay Updated"
		headlineSize="h3"
		text="Sign up to be the first to know about new collections, events, and sample sales."
		image={{
			fluid: {
				aspectRatio: 2,
				src: PlaceholderNewsletterImage,
				srcSet: '',
				sizes: ''
			}
		}}
	>
		<Grid
			small="1 [12] 1"
			medium="2 [6] 2"
			large="4 [6] 4"
		>
			<Input
				size="large"
				placeholder="Enter Email"
				icon="arrow_forward"
				iconPosition="right"
				theme="transparent"
			/>
		</Grid>
	</ATF>
)

export default Newsletter
