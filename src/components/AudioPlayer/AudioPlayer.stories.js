import React from 'react'
import { storiesOf } from '@storybook/react'
import AudioPlayer from './AudioPlayer'

const stories = storiesOf(`Components/AudioPlayer`, module)
stories.add(`Default`, () => (
	<AudioPlayer
		file={{ source_url: 'https://freesound.org/data/previews/478/478939_9497060-lq.mp3' }}
	/>
))
