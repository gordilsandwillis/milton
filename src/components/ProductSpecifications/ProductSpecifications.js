import React from 'react'
import styled from '@emotion/styled'
import { withRouter } from 'react-router'

import Grid from 'components/Grid'
import Image from 'components/GatsbyImage'
import ConditionalRender from 'components/ConditionalRender'

import { colors, animations, typography, util } from 'styles'

const OuterWrapper = styled.div`
	${ util.responsiveStyles('margin-top', 0, 26, 24, 24) }
`

const InnerWrapper = styled.div`
  ${ ({ index }) => index === 0 ? `border-top: 1px solid ${ colors.hrColor };` : `` }
  ${ ({ border }) => border !== false ? `border-bottom: 1px solid ${ colors.hrColor };` : `` }
  width: 100%;
  text-align: left;
  padding: 5px 0 8px;
  ul {
  	padding: 0;
  	list-style: none;
  	margin: 0;
  	li {
  		${ typography.bodySmall }
  	}
  }
  label {
  	${ typography.h6 }
  	line-height: 1em;
  }
`

const VariantLink = styled.div`
	width: 100px;
	${ util.responsiveStyles('width', 60, 50, 40, 40) }
	display: block;
	background: ${ colors.lightGrey };
	position: relative;
	cursor: pointer;
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
		border: 1px solid ${ colors.textColor };
		opacity: 0;
		transition: opacity ${ animations.mediumSpeed } ease-in-out;
	}
	&:hover {
		&:after {
			${ ({ active }) => !active ? `
				opacity: .3;
			` : `` }
		}
	}
	${ ({ active }) => active ? `
		pointer-events: none;
		&:after {
			opacity: 1;
		}
	` : `` }
`

const VariantLinks = styled.div`
	display: flex;
	margin: 10px 0 0;
	justify-content: flex-start;
	div {
		margin-left: 20px;
		&:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
			margin-left: 0;
		}
	}
`


const isArrayString = (string) => {
  try {
    JSON.parse(string)
  } catch (e) {
    return false
  }
  if (Array.isArray(JSON.parse(string))) {
	  return true
  }
  return false
}

const ProductSpecifications = ({
	keys: sections,
	specifications,
	variants,
	currentProduct,
	currentVariant,
	history
}) => (
	<OuterWrapper style={sections && variants.length > 1 ? { margin: '28px 0 0 0' } : {}}>
		{sections.map( (section, index) => (
			specifications.some(({key}) => key.toLowerCase() === section) && (
				<InnerWrapper index={index} key={section}>
					<Grid
						small="[1] [1]"
						medium="[1] [1]"
						large="[1] [1]"
						vAlign="baseline"
					>
					<div>
						<label>{section}</label>
					</div>
					<div>
						<ul>
							{(() => {
								const specification = specifications.find(({key}) => key.toLowerCase() === section)
								if (isArrayString(specification.value)) {
									return JSON.parse(specification.value).map( (value, index) => (<li key={index}>{value}</li>))
								} else {
									return (<li>{specification.value}</li>)
								}
							})()}
						</ul>
					</div>
					</Grid>
				</InnerWrapper>
			)
		))}
		<ConditionalRender condition={variants.length > 1}>
			<InnerWrapper border={false}>
				<Grid
					small="[1] [1]"
					medium="[1] [1]"
					large="[1] [1]"
				>
					<div>
						<label>Colors</label>
					</div>
					<div>
						<VariantLinks>
							{variants.map((variant, index) => {
								let active = false
								if (variant.id === currentVariant.id) {
									active = true
								}
								const variantId = btoa(variant.id)
								return (
									<VariantLink
										key={variantId}
										active={active}
										onClick={(event) => {
											history.replace('/product/' + currentProduct.handle + '/' + variantId)
										}}
									>
										<Image
											image={{
												fluid: {
													aspectRatio: 1,
													src: variant.image.src,
													srcSet: '',
													sizes: ''
												}
											}}
											alt={currentProduct.title | variant.title}
										/>
									</VariantLink>
								)
							})}
						</VariantLinks>
					</div>
				</Grid>
			</InnerWrapper>
		</ConditionalRender>
	</OuterWrapper>
)

export default withRouter(ProductSpecifications)
