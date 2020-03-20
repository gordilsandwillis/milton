import React from 'react'
import { storiesOf } from '@storybook/react'
import NewsletterForm from './NewsletterForm'

storiesOf(`Components`, module)
	.add('NewsletterForm', () => (
		<div>
			<NewsletterForm/>
		</div>
	))
