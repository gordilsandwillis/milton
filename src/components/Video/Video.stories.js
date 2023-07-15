import React from 'react'
import { storiesOf } from '@storybook/react'
import Video from './Video'
import * as mock from 'mock'

const stories = storiesOf(`Components/Video`, module)
stories.add(`Default`, () => (
	<Video
		coverImage={mock.Placeholder169.fluid.src}
		url='https://www.youtube.com/watch?v=_wUIexMVG9k'
	/>
))
