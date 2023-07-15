import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, optionsKnob } from '@storybook/addon-knobs'
import ATF from './ATF'
import * as mock from 'mock'

const placeholderHeadline = `the greatest website in the world`
const placeholderTagline = `By Gordils & Willis Inc.`

const hAlignmentOptions = {
	center: 'center',
	left: 'left',
	right: 'right'
}

const vAlignmentOptions = {
	center: 'center',
	top: 'top',
	bottom: 'bottom'
}

const headerSizeOptions = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4'
}

const themeOptions = {
	mainColor: 'mainColor',
	bgColor: 'bgColor',
	white: 'white',
	black: 'black',
	lightGrey: 'lightGrey'
}

const stories = storiesOf(`Blocks/ATF`, module)

stories.addDecorator(withKnobs)

stories.add(`Image`, () => (
	<ATF
		headlineSize={ optionsKnob('Headline Size', headerSizeOptions, 'h2', { display: 'radio' }) }
		headline={text('Headline', placeholderHeadline)}
		text={text('Tagline', placeholderTagline)}
		textAlignment={ optionsKnob('Text Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		hAlignment={ optionsKnob('H-Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		vAlignment={ optionsKnob('V-Alignment', vAlignmentOptions, 'center', { display: 'inline-radio' }) }
		image={{
			large: mock.Placeholder169.fluid.src,
			medium: mock.Placeholder32.fluid.src,
			small: mock.Placeholder34.fluid.src
		}}
		fullHeight={ boolean('Full Height', true) }
		showArrow={ boolean('showArrow', true) }
	/>
)).add(`HTML5 Video`, () => (
	<ATF
		headlineSize={ optionsKnob('Headline Size', headerSizeOptions, 'h2', { display: 'radio' }) }
		headline={text('Headline', placeholderHeadline)}
		text={text('Tagline', placeholderTagline)}
		textAlignment={ optionsKnob('Text Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		hAlignment={ optionsKnob('H-Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		vAlignment={ optionsKnob('V-Alignment', vAlignmentOptions, 'center', { display: 'inline-radio' }) }
		video={{ file: { url: 'https://hightidesite.cdn.prismic.io/hightidesite%2F5d1b0cec-c72d-4b0b-80d7-52588efbd852_about_video.mp4' } }}
		fullHeight={ boolean('Full Height', true) }
		showArrow={ boolean('showArrow', true) }
	/>
)).add(`Embeded Video`, () => (
	<ATF
		headlineSize={ optionsKnob('Headline Size', headerSizeOptions, 'h2', { display: 'radio' }) }
		headline={text('Headline', placeholderHeadline)}
		text={text('Tagline', placeholderTagline)}
		textAlignment={ optionsKnob('Text Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		hAlignment={ optionsKnob('H-Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		vAlignment={ optionsKnob('V-Alignment', vAlignmentOptions, 'center', { display: 'inline-radio' }) }
		video={{ file: { url: 'https://www.youtube.com/watch?v=idV4GQRflHM' } }}
		fullHeight={ boolean('Full Height', true) }
		showArrow={ boolean('showArrow', true) }
	/>
)).add(`Color`, () => (
	<ATF
		headlineSize={ optionsKnob('Headline Size', headerSizeOptions, 'h2', { display: 'radio' }) }
		headline={text('Headline', placeholderHeadline)}
		text={text('Tagline', placeholderTagline)}
		textAlignment={ optionsKnob('Text Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		hAlignment={ optionsKnob('H-Alignment', hAlignmentOptions, 'center', { display: 'inline-radio' }) }
		vAlignment={ optionsKnob('V-Alignment', vAlignmentOptions, 'center', { display: 'inline-radio' }) }
		theme={ optionsKnob('Theme', themeOptions, 'mainColor', { display: 'select' }) }
		fullHeight={ boolean('Full Height', false) }
	/>
))