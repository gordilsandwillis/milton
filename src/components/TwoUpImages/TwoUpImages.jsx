import React from 'react'
import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import Image from 'src/components/Image'
import Caption from 'src/components/Caption'
import ScrollEntrance from 'src/components/ScrollEntrance'
import ConditionalRender from 'src/components/ConditionalRender'

const TwoUpImages = ({
	theme,
	prevTheme,
	nextTheme,
	images,
}) => (
	<Section
		setTheme={theme}
		nextTheme={nextTheme}
		prevTheme={prevTheme}
	>
		<Grid small="1 [12] 1">
			<Grid
				small="[12]"
				medium="[6] [6]"
				colGap={[ '0', '40px', '60px' ]}
				rowGap={[ '30px', '40px', '60px' ]}
			>
				{images.map(({ id, caption, ...image }, index) => (
					<ScrollEntrance key={id + '_' + index} delay={index}>
						<div>
							<Image image={image.image}></Image>
						</div>
						<ConditionalRender condition={caption}>
							<Caption>{caption}</Caption>
						</ConditionalRender>
					</ScrollEntrance>
				))}
			</Grid>
		</Grid>
	</Section>
)

export default TwoUpImages
