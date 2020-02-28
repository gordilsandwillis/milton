import React from 'react'
import { storiesOf } from '@storybook/react'
import ContactForm from './ContactForm'

storiesOf(`Components`, module)
	.add('ContactForm', () => (
		<div>
			<ContactForm/>
		</div>
	))
