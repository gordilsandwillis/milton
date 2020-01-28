import React from 'react'
import { storiesOf } from '@storybook/react'
import ContentfulRichText from './ContentfulRichText'

const stories = storiesOf(`Components/ContentfulRichText`, module)
stories.add(`Default`, () => (
	<ContentfulRichText />
))
