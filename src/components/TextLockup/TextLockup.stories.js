import React from 'react'
import { storiesOf } from '@storybook/react'
import TextLockup from './TextLockup'
import { withKnobs, text, boolean, optionsKnob } from '@storybook/addon-knobs'

const AlignmentOptions = {
	center: 'center',
	left: 'left',
	right: 'right'
}

const stories = storiesOf(`Components/TextLockup`, module)
stories.add(`Default`, () => (
	<TextLockup
		theme="darkBrown"
		eyebrow="Wah-Nee Is the Greatest"
		alignment={ optionsKnob('Alignment', AlignmentOptions, 'center', { display: 'inline-radio' }) }
		headline="Intro statement ipsum dolor sit amet, consectetur adipiscing elit. Quid Zeno? Cave putes quicquam esse verius. Peccata paria. Duo Reges: constructio interrete."
		text={<p>Intro statement ipsum dolor sit amet, consectetur adipiscing elit. Quid Zeno? Cave putes quicquam esse verius. Peccata paria. Duo Reges: constructio interrete.</p>}
	/>
))
