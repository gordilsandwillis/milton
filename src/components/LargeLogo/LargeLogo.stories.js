import React from 'react'
import { storiesOf } from '@storybook/react'
import LargeLogo from './LargeLogo'

storiesOf(`Components`, module)
	.add('LargeLogo', () => (
		<div>
			<LargeLogo/>
		</div>
	))
