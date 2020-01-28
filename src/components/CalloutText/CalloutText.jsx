import React from 'react'
import styled from '@emotion/styled'
import Section from 'src/components/Section'
import TextLockup from 'src/components/TextLockup'
import Grid from 'src/components/Grid'
import * as mockCopy from 'src/mock/copy'
import { util } from 'src/styles'

const ContentWrapper = styled.div`
	${ util.responsiveStyles('padding-top', 91, 51, 33, 26) }
	${ util.responsiveStyles('padding-bottom', 91, 51, 33, 26) }
`

const CalloutText = ({
	id,
	theme,
	prevTheme,
	nextTheme,
	headlineSize,
	eyebrow,
	headline,
	text,
	buttons,
	cards,
	icon,
	alignment
}) => {
	return (
		<Section
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			sectionid="CenteredAlignedText"
		>	
			<ContentWrapper>
				<Grid small="1 [12] 1">
					<TextLockup
						theme={theme}
						eyebrow={eyebrow}
						headline={headline}
						headlineSize={headlineSize}
						text={text}
						icon={icon}
						buttons={buttons}
						cards={cards}
						alignment={alignment}
					/>
				</Grid>
			</ContentWrapper>
		</Section>
	)
}

CalloutText.defaultProps = {
	headlineSize: 'h3'
}

export default CalloutText
