import React from 'react'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import ConditionalRender from 'src/components/ConditionalRender'
import ScrollEntrance from 'src/components/ScrollEntrance'
import ContentfulRichText from 'src/components/ContentfulRichText'
import BalanceText from 'react-balance-text'
import { typography, mq, util } from 'src/styles'

const Wrapper = styled.div`
	display: inline-block;
	display: block;
	vertical-align: top;
	text-align: ${ ({ alignment }) => alignment };
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
		> div {
			margin-left: auto;
			margin-right: auto;
		}
	` }
	${ mq.mediumAndBelow } {
		display: block;
	}
`
const TextContainer = styled(ScrollEntrance)`
	text-align: inherit;
	width: 100%;
	${ util.responsiveStyles('max-width', 1200, 900, 750, 600) }
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
	` }
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
	` }
	${ ({ alignment }) => alignment === 'right' && `
		margin-left: auto;
	` }
`

const Eyebrow = styled.h6`
	margin-bottom: .8em;
	${ typography.eyebrow }
`

const Headline = styled.h3`
	${ ({ headlineSize }) => `
		${ typography[headlineSize] }
		${ headlineSize === 'h1' || headlineSize === 'h2' ? `
			max-width: 16em;
		` : `
			max-width: 20em;
		` }
	` }
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
	` }
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
	` }
	${ ({ alignment }) => alignment === 'right' && `
		margin-left: auto;
	` }
`

const Text = styled.div`
	p {
		max-width: 32em;
		margin-bottom: 0;
		margin-top: 4em;
		${ ({ textSize }) => typography[textSize] }
		&:first-of-type {
			margin-top: 0;
		}
		${ ({ alignment }) => alignment === 'center' && `
			margin-left: auto;
			margin-right: auto;
			max-width: 32em;
		` }
		${ ({ alignment }) => alignment === 'right' && `
			margin-left: auto;
		` }
	}
`

const ButtonActions = styled.div`
	margin-top: 30px;
	text-align: inherit;
	a, button {
		margin-bottom: 20px;
		${ ({ buttons }) => buttons.length > 1 && `
			min-width: 220px;
			margin-left: 10px;
			margin-right: 10px;
		` }
	}
`

const TextLockup = ({
		theme,
		eyebrow,
		headline,
		headlineSize,
		text,
		textSize,
		buttons,
		className,
		icon,
		alignment,
		headlineElement,
		children,
		transitionIn,
		additions
	}) => {
	return (
		<Wrapper className={className} alignment={alignment}>
			<div>
				<TextContainer alignment={alignment} transitionIn={transitionIn}>
					<ConditionalRender condition={icon}>
						<div style={{ margin: 'auto', width: 50, height: 50, marginBottom: '1.5em' }}>{icon}</div>
					</ConditionalRender>
					<ConditionalRender condition={eyebrow}>
						<Eyebrow>{eyebrow}</Eyebrow>
					</ConditionalRender>

					<ConditionalRender condition={headline}>
						<BalanceText>
							<Headline headlineSize={headlineSize} as={headlineElement} alignment={alignment}>
								{headlineSize === 'h1' || headlineSize === 'h2' || headlineSize === 'h3' ? (
									headline
								) : headline}
							</Headline>
						</BalanceText>
					</ConditionalRender>

					{text && text.json && /* ConditionalRender was not working for this */
						<Text textSize={textSize} alignment={alignment}><ContentfulRichText richText={text.json}/></Text>
					}

					{typeof text === 'string' &&
						<Text textSize={textSize} alignment={alignment}><p dangerouslySetInnerHTML={{__html: text}}></p></Text>
					}

					<ConditionalRender condition={children}>
						{children || ''}
					</ConditionalRender>

					{buttons && (
						<ButtonActions buttons={buttons} alignment={alignment}>
							{buttons.map((button, index) => {
								if (button.linkType === 'button') {
									return (
										<Button
											key={'button-' + index}
											to={button.to}
											setTheme={button.theme}
											external={button.external || false}
											target={button.target || ''}
											size={button.size}
											onClick={button.onClick}
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
											type={button.linkType}
											onClick={button.onClick}
										>
											{button.label}
										</Link>
									)
								}
							})}
						</ButtonActions>
					)}
					{additions && additions}
				</TextContainer>
			</div>
		</Wrapper>
	)
}

TextLockup.defaultProps = {
	alignment: 'center',
	headlineSize: 'h3',
	textSize: 'body',
	transitionIn: true
}

export default TextLockup
