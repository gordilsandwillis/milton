import React from 'react';
import styled from '@emotion/styled'

import Section from 'components/Section'
import Grid from 'components/Grid'
import ProductThumb from 'components/ProductThumb'
import ScrollEntrance from 'components/ScrollEntrance'
import { mq } from 'styles'

const TextilesGrid = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;

	${ ({ colGap, rowGap }) => `
		margin-left: calc(${ colGap[0] } * -.5);
		margin-right: calc(${ colGap[0] } * -.5);
		> div {
			flex-shrink: 0;
			padding-left: calc(${ colGap[0] } * .5);
			padding-right: calc(${ colGap[0] } * .5);
			padding-bottom: ${ rowGap[0] };
			width: 50%;
		}

		${ mq.mediumAndUp } {
			> div {
				width: 50%;
			}
		}

		${ mq.largeAndUp } {
			margin-left: calc(${ colGap[1] } * -.5);
			margin-right: calc(${ colGap[1] } * -.5);
			> div {
				padding-left: calc(${ colGap[1] } * .5);
				padding-right: calc(${ colGap[1] } * .5);
				padding-bottom: ${ rowGap[1] };
				width: 33.333%;
			}
		}

		${ mq.largerAndUp } {
			margin-left: calc(${ colGap[2] } * -.5);
			margin-right: calc(${ colGap[2] } * -.5);
			> div {
				padding-left: calc(${ colGap[2] } * .5);
				padding-right: calc(${ colGap[2] } * .5);
				padding-bottom: ${ rowGap[2] };
				width: 25%;
			}
		}

		${ mq.extraLargeAndUp } {
			> div {
				width: 16.666%;
			}
		}

		${ mq.minWidth(2200) } {
			> div {
				width: 16.666%;
			}
		}

	` }
`

const Textiles = ({ products, hasAtf }) => {
	if (!products || products.length < 1) {
		return false
	}

  return (
    <Section
    	prevTheme="bgColor"
    	setTheme="bgColor"
    	nextTheme={false}
			padded={hasAtf ? true : 'bottom'}
    >
    	<ScrollEntrance>
	    	<Grid small="1 [12] 1">
	    		<div>
						<TextilesGrid
							colGap={['3.6vw', '24px', '30px']}
							rowGap={['50px', '70px', '80px']}
						>
							{products.map((product, index) => (
								product.variants.map((variant, index) => (
									(variant.image && variant.availableForSale) &&  (
										<div key={variant.id}>
											<ProductThumb product={product} variant={variant} />
										</div>
									)
								))
							))}
						</TextilesGrid>
					</div>
				</Grid>
			</ScrollEntrance>
    </Section>
  )
}

export default Textiles;