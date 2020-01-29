import React from 'react'
import { storiesOf } from '@storybook/react'
import FiftyFifty from './FiftyFifty'
import * as mock from 'src/mock'
import * as mockCopy from 'src/mock/copy'
import { withKnobs, text, boolean, optionsKnob } from '@storybook/addon-knobs'

const imgPositionOptions = {
	left: 'left',
	right: 'right',
	hangLeft: 'hangLeft',
	hangRight: 'hangRight'
}

const themeOptions = {
	bgColor: 'bgColor',
	white: 'white',
	black: 'black',
	lightGrey: 'lightGrey'
}

const headlineSizeOptions = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
}

const stories = storiesOf(`Blocks/FiftyFifty`, module)
stories.add(`Default`, () => (
  <FiftyFifty
  	theme={ optionsKnob('Theme', themeOptions, 'bgColor', { display: 'radio' }) }
		eyebrow={text('Eyebrow', 'What is it?')}
		headline={text('Headline', 'The Best Website in the World')}
		headlineSize={ optionsKnob('Headline Size', headlineSizeOptions, 'h3', { display: 'select' }) }
		text={mockCopy.contentfulRichTextShort}
  	image={{ image: mock.PlaceholderSq.fluid.src }}
  	imagePosition={ optionsKnob('Image Position', imgPositionOptions, 'left', { display: 'radio' }) }
  />
)).add(`With Additions`, () => (
  <FiftyFifty
  	theme={ optionsKnob('Theme', themeOptions, 'bgColor', { display: 'radio' }) }
		eyebrow={text('Eyebrow', 'What is it?')}
		headline={text('Headline', 'The Best Website in the World')}
		headlineSize={ optionsKnob('Headline Size', headlineSizeOptions, 'h3', { display: 'select' }) }
		text={mockCopy.contentfulRichTextShort}
  	image={{ image: mock.PlaceholderSq.fluid.src }}
  	imagePosition={ optionsKnob('Image Position', imgPositionOptions, 'left', { display: 'radio' }) }
  	additions={<div style={{ marginTop: '2em' }}>
  		<ul>
  			<li><p style={{ margin: '.5em' }} className="h6">This is an additional element</p></li>
  			<li><p style={{ margin: '.5em' }} className="h6">For a custom list</p></li>
  			<li><p style={{ margin: '.5em' }} className="h6">Or something unforeseen</p></li>
  		</ul>
  	</div>}
  />
))