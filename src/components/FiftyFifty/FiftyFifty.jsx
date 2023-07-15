import React from 'react'
import Section from 'components/Section'
import Grid from 'components/Grid'
import ConditionalRender from 'components/ConditionalRender'
import Image from 'components/GatsbyImage'
import TextLockup from 'components/TextLockup'
import ScrollEntrance from 'components/ScrollEntrance'

const FiftyFifty = ({
	theme,
	prevTheme,
	nextTheme,
	eyebrow,
	headline,
	headlineSize,
	text,
	imagePosition,
	image,
	video,
	buttons,
	additions,
	alignment,
	imageContent,
	children,
	vAlign,
	gridSpacing,
	textSize
}) => {

	let gridSetup = {
		small: '1 [12] 1',
		medium: '1 [6] 1 [5] 1',
		large: '1 [6] 1 [5] 1',
		extraLarge: '1 [6] 1 [5] 1',
		imagePosition: 'ltr',
		textGrid: '[1]'
	}

	if (gridSpacing === 'even' && imagePosition === 'right') {
		gridSetup = {
			small: '1 [12] 1',
			medium: '2 [11] 2 [11] 2',
			large: '2 [11] 2 [11] 2',
			extraLarge: '2 [11] 2 [11] 2',
			imagePosition: 'rtl',
			textGrid: '[1]'
		}
	} else if (gridSpacing === 'even') {
		gridSetup = {
			small: '1 [12] 1',
			medium: '2 [11] 2 [11] 2',
			large: '2 [11] 2 [11] 2',
			extraLarge: '2 [11] 2 [11] 2',
			imagePosition: 'ltr',
			textGrid: '[1]'
		}
	} else if (imagePosition === 'right') {
		gridSetup = {
			small: '1 [12] 1',
			medium: '1 [6] 1 [5] 1',
			large: '1 [6] 1 [5] 1',
			extraLarge: '1 [6] 1 [5] 1',
			imagePosition: 'rtl',
			textGrid: '[1]'
		}
	} else if (imagePosition === 'hangLeft') {
		gridSetup = {
			small: '[13] 1',
			medium: '[7] 1 [5] 1',
			large: '[7] 1 [5] 1',
			extraLarge: '[7] 1 [5] 1',
			imagePosition: 'ltr',
			textGrid: '[12] 1'
		}
	} else if (imagePosition === 'hangRight') {
		gridSetup = {
			small: '[13] 1',
			medium: '[7] 1 [5] 1',
			large: '[7] 1 [5] 1',
			extraLarge: '[7] 1 [5] 1',
			imagePosition: 'rtl',
			textGrid: '[12] 1'
		}
	}

	return (
		<Section
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
		>
			<Grid
				small={gridSetup.small}
				medium={gridSetup.medium}
				large={gridSetup.large}
				extraLarge={gridSetup.extraLarge}
				gridDirection={gridSetup.imagePosition}
				rowGap="7vw"
				vAlign={vAlign}
			>	
				<ScrollEntrance>
					<ConditionalRender condition={image && !video && !imageContent}>
						<div>
							<Image
								image={image}
								alt={(image && image.description) || (image && image.title)}
							/>
						</div>
					</ConditionalRender>

					<ConditionalRender condition={imageContent}>
						<div>
							{imageContent}
						</div>
					</ConditionalRender>
				</ScrollEntrance>
				<Grid
					small={gridSetup.textGrid}
					medium="[1]"
				>
					<TextLockup
						specialList
						headline={headline}
						headlineSize={headlineSize}
						alignment={alignment}
						text={text}
						textSize={textSize}
						eyebrow={eyebrow}
						buttons={buttons}
						theme={theme}
						additions={children}
					/>
				</Grid>
			</Grid>
		</Section>
	)
}

FiftyFifty.defaultProps = {
	imagePosition: 'left',
	additions: false,
	headlineSize: 'h3',
	text: 'body',
	alignment: 'left',
	vAlign: 'center'
}

export default FiftyFifty
