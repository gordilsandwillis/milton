import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'

storiesOf(`Components`, module)
	.add('Header', () => (
		<div style={{ height: '200vh', background: '#ccc' }}>
			<Header/>
		</div>
	))
