import React from 'react'
import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import ConditionalRender from 'src/components/ConditionalRender'
import Image from 'src/components/GatsbyImage'
import Video from 'src/components/Video'
import TextLockup from 'src/components/TextLockup'
import ScrollEntrance from 'src/components/ScrollEntrance'

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
	imageContent
}) => {

	let gridSetup = {
		small: '1 [12] 1',
		medium: '1 [6] 1 [5] 1',
		large: '1 [6] 1 [5] 1',
		extraLarge: '1 [6] 1 [5] 1',
		imagePosition: 'ltr',
		textGrid: '[1]'
	}

	if (imagePosition === 'right') {
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
				vAlign="center"
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
					<ConditionalRender condition={video && !imageContent}>
						<div>
							<Video url={video && video.file.url} playing={true} loop={true}/>
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
						eyebrow={eyebrow}
						buttons={buttons}
						theme={theme}
						additions={additions}
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
	alignment: 'left'
}

export default FiftyFifty
