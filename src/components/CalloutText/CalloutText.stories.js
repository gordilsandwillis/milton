import React from 'react'
import { storiesOf } from '@storybook/react'
import CalloutText from './CalloutText'
import { withKnobs, text, boolean, optionsKnob } from '@storybook/addon-knobs'

const headerSizeOptions = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4'
}

const themeOptions = {
	bgColor: 'bgColor',
	white: 'white',
	black: 'black',
	lightGrey: 'lightGrey'
}

const stories = storiesOf(`Blocks`, module)
stories.add(`Center Aligned Text`, () => (
	<CalloutText
		theme={ optionsKnob('Theme', themeOptions, 'bgColor', { display: 'radio' }) }
		eyebrow={text('Headline', 'The Best Website in the World')}
		headline="Intro statement ipsum dolor sit amet, consectetur adipiscing elit. Quid Zeno? Cave putes quicquam esse verius. Peccata paria. Duo Reges: constructio interrete."
		headlineSize={ optionsKnob('Header Size', headerSizeOptions, 'h3', { display: 'radio' }) }
		text={<p>Intro statement ipsum dolor sit amet, consectetur adipiscing elit. Quid Zeno? Cave putes quicquam esse verius. Peccata paria. Duo Reges: constructio interrete.</p>}
	/>
))
