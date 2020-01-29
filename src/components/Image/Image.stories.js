import React from 'react'
import { storiesOf } from '@storybook/react'
import Image from './Image'
import * as mock from 'src/mock'

const stories = storiesOf(`Components/Image`, module)
stories.add(`Default`, () => (
	<Image image={mock.Placeholder169.fluid.src} />
))

stories.add(`responsive`, () => (
	<Image
		small={mock.Placeholder23.fluid.src}
		medium={mock.PlaceholderSq.fluid.src}
		large={mock.Placeholder169.fluid.src}
	/>
))
