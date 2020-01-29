import React from 'react'
import { storiesOf } from '@storybook/react'
import ContentfulRichText from './ContentfulRichText'
import { contentfulRichText } from 'src/mock/copy'

const stories = storiesOf(`Components/ContentfulRichText`, module)
stories.add(`Default`, () => (
	<div style={{ padding: '5%' }}>
		<ContentfulRichText richText={contentfulRichText.json}/>
	</div>
))
