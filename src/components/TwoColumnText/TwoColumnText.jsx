import React from 'react'
import styled from '@emotion/styled'
import Grid from 'src/components/Grid'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import ConditionalRender from 'src/components/ConditionalRender'
import ScrollEntrance from 'src/components/ScrollEntrance'
import ContentfulRichText from 'src/components/ContentfulRichText'
import { typography, colors, mq } from 'src/styles'
import BalanceText from 'react-balance-text'
import Section from 'src/components/Section'

const TextContainer = styled(ScrollEntrance)`
	width: 100%;
`

const Eyebrow = styled.h6`
	margin-bottom: 1.75em;
`

const Headline = styled.h3`
	${ ({ headlineSize }) => `
		${ typography[headlineSize] }
		${ headlineSize === 'h1' || headlineSize === 'h2' ? `
			max-width: 15em;
		` : `
			max-width: 23em;
		` }
	` }
	margin-left: auto;
	margin-right: auto;
`

const Text = styled.div`
	p {
		${ typography.bodyMedium }
		max-width: 38em;
	}
`

const Divider = styled.div`
`

const ButtonActions = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 30px;
	a, button {
		margin-left: 0 !important;
		${ ({ buttons }) => buttons.length > 1 && `
			min-width: 250px;
		` }
		margin: 10px 20px
	}
`

const TwoColumnText = ({
	theme,
	prevTheme,
	nextTheme,
	eyebrow,
	headline,
	headlineSize,
	text,
	buttons,
}) => {
	let dividerColor = 'currentcolor'

	if (theme === 'white' || theme === 'bgColor' || !theme) {
		dividerColor = 'default'
	}

	return (
		<Section
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
		>
			<TextContainer>
				<Grid
					small="1 [10] 1"
					medium="1 [5] 1 [6] 1"
					large="1 [5] 1 [6] 1"
				>
					<div>
						<ConditionalRender condition={eyebrow}>
							<Eyebrow>{eyebrow}</Eyebrow>
						</ConditionalRender>

						<ConditionalRender condition={eyebrow && headline}>
							<Divider theme={dividerColor} />
						</ConditionalRender>

						<ConditionalRender condition={headline}>
							<Headline headlineSize='h3'>
								{headline}
							</Headline>
						</ConditionalRender>

						<ConditionalRender condition={!eyebrow && headline && text}>
							<Divider theme={dividerColor} position="lower" />
						</ConditionalRender>
					</div>
					<div>
						{ text && text.json && /* ConditionalRender was not working for this */
							<Text><ContentfulRichText richText={text.json}/></Text>
						}
						<ConditionalRender condition={buttons}>
							<ButtonActions buttons={buttons}>
								{buttons.map((button, index) => {
									if (button.style === 'button') {
										return (
											<Button
												key={'button-' + index}
												to={button.to}
												setTheme={button.theme}
												external={button.external || false}
												target={button.target || ''}
											>
												{button.label}
											</Button>
										)
									} else {
										return (
											<Link
												key={'button-' + index}
												to={button.to}
												setTheme={button.theme}
												external={button.external || false}
												target={button.target || ''}
											>
												{button.label}
											</Link>
										)
									}
								})}
							</ButtonActions>
						</ConditionalRender>
					</div>
				</Grid>
			</TextContainer>
		</Section>
	)
}

TwoColumnText.defaultProps = {
	headlineSize: 'h3'
}

export default TwoColumnText
