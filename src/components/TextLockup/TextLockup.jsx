import React from 'react'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import ConditionalRender from 'src/components/ConditionalRender'
import ScrollEntrance from 'src/components/ScrollEntrance'
import ContentfulRichText from 'src/components/ContentfulRichText'
import BalanceText from 'react-balance-text'
import { typography, colors, mq, util } from 'src/styles'

const Wrapper = styled.div`
	display: inline-block;
	display: block;
	vertical-align: top;
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
	text-align: ${ ({ alignment }) => alignment };
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
	margin-bottom: 1.2em;
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
	text-align: ${ ({ alignment }) => alignment };
	a, button {
		margin-bottom: 20px;
		${ ({ buttons }) => buttons.length > 1 && `
			min-width: 220px;
			margin-left: 10px;
			margin-right: 10px;
		` }
	}
`

const StyledButton = styled(Button)`
	margin-bottom: 18px;
	min-width: 172px;
	svg {
		display: none;
	}
`

const TextLockup = ({
		theme,
		eyebrow,
		headline,
		headlineSize,
		text,
		buttons,
		className,
		icon,
		alignment,
		headlineElement,
		additions
	}) => {
	return (
		<Wrapper className={className} alignment={alignment}>
			<div>
				<TextContainer alignment={alignment}>
					<ConditionalRender condition={icon && icon.svgContent}>
						<div style={{ margin: 'auto', width: 50, height: 50, marginBottom: '1em' }} dangerouslySetInnerHTML={{ __html: icon && icon.svgContent }}/>
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
						<Text alignment={alignment}><ContentfulRichText richText={text.json}/></Text>
					}

					{typeof text === 'string' &&
						<Text alignment={alignment}><p dangerouslySetInnerHTML={{__html: text}}></p></Text>
					}

					<ConditionalRender condition={additions}>
						{additions}
					</ConditionalRender>

					{buttons && (
						<ButtonActions buttons={buttons} alignment={alignment}>
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
											linkStyle={button.style}
										>
											{button.label}
										</Link>
									)
								}
							})}
						</ButtonActions>
					)}
				</TextContainer>
			</div>
		</Wrapper>
	)
}

TextLockup.defaultProps = {
	alignment: 'center',
	headlineSize: 'h3'
}

export default TextLockup
