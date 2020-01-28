import React from 'react'
import { storiesOf } from '@storybook/react'
import Grid from 'src/components/Grid'
import { colors } from 'src/styles'
import Input from './Input'

const inputs = [
	{
		label: 'Label',
		// placeholder: 'Placeholder',
		description: 'Default Input'
	},
	{
		label: 'Label',
		placeholder: 'Placeholder',
		icon: 'person',
		theme: 'mainColor',
		description: 'Dark theme with icon'
	},
	{
		label: false,
		placeholder: 'Placeholder',
		icon: 'phone',
		iconPosition: 'right',
		theme: 'mainColor',
		description: "iconPosition: 'right'"
	},
	{
		emojiIcon: true,
		icon: '☎️',
		placeholder: 'Call a lawyer',
		description: 'emojiIcon prop for emojis'
	},
	{
		size: 'tiny',
		icon: 'search',
		placeholder: 'Search...',
		description: 'size: tiny'
	},
	{
		size: 'small',
		icon: 'search',
		placeholder: 'Search...',
		description: 'size: small'
	},
	{
		size: 'large',
		icon: 'search',
		placeholder: 'Search...',
		description: 'size: large'
	},
]

const stories = storiesOf(`Components/Input`, module)
stories.add(`Default`, () => (
	<div style={{ padding: '5%', background: colors.lightGrey }}>
		<Grid
			small="[1]"
			medium="[1] [1]"
			large="[1] [1] [1]"
			colGap={['2px', '2px', '20px']}
			rowGap={['2px', '2px', '20px']}
		>
			{inputs.map(input => (
				<div style={{ padding: '4rem 2.5rem', background: colors.bgColor, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'stretch' }}>
					<Input
						size={input.size}
						label={input.label}
						placeholder={input.placeholder}
						icon={input.icon}
						emojiIcon={input.emojiIcon}
						iconPosition={input.iconPosition}
						theme={input.theme}
						loading={input.loading}
						error={input.error}
						disabled={input.disabled}
					/>
					<figcaption className="small" style={{ margin: 0, position: 'absolute', top: '10px', left: '12px', color: colors.lightTextColor }}>{input.description}</figcaption>
				</div>
			))}
		</Grid>
	</div>
))
