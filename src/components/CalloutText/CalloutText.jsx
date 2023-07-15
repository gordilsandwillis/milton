import React from 'react'
import styled from '@emotion/styled'
import Section from 'components/Section'
import TextLockup from 'components/TextLockup'
import Grid from 'components/Grid'

const ContentWrapper = styled.div`
	padding-bottom: 10px;
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
				<Grid small="2 [10] 2" medium="3 [8] 3" large="1 [12] 1">
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
	headlineSize: 'h3',
	alignment: 'center'
}

export default CalloutText
