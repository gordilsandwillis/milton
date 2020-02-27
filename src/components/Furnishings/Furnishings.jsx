import React from 'react';
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import ProductThumb from 'src/components/ProductThumb'
import { mq } from 'src/styles'

const FuritureSection = styled(Section)`
	background: pink;
	color: red;
	padding: 50px;
`

const FurnishingsGrid = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;

	${ ({ colGap, rowGap }) => `
		margin-left: calc(${ colGap[0] } * -.5);
		margin-right: calc(${ colGap[0] } * -.5);
		> div {
			padding-left: calc(${ colGap[0] } * .5);
			padding-right: calc(${ colGap[0] } * .5);
			width: 100%;
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
				width: 33.333%;
			}
		}

		${ mq.largerAndUp } {
			margin-left: calc(${ colGap[2] } * -.5);
			margin-right: calc(${ colGap[2] } * -.5);
			> div {
				padding-left: calc(${ colGap[2] } * .5);
				padding-right: calc(${ colGap[2] } * .5);
				width: 33.333%;
			}
		}

	` }
`

const Furnishings = ({ products }) => {
	if (!products || products.length < 1) {
		return false
	}

  return (
  	<div>
	  	<Section setTheme="bgColor" nextTheme="bgColor" prevTheme={false}>
				<Grid small="1 [12] 1">
					<h4 style={{ textAlign: 'center' }}>Furniture</h4>
				</Grid>
			</Section>
	    <FuritureSection prevTheme="bgColor" setTheme="bgColor" nextTheme={false}>
	    	<Grid small="1 [12] 1">
	    		<div>
						<FurnishingsGrid
							colGap={['3.6vw', '24px', '30px']}
							rowGap={['50px', '70px', '80px']}
						>
							{products.map((product, index) => (
								product.variants.map((variant, index) => (
									variant.image && (
										<div>
											<ProductThumb key={variant.id} product={product} variant={variant} />
										</div>
									)
								))
							))}
						</FurnishingsGrid>
					</div>
				</Grid>
	    </FuritureSection>
    </div>
  )
}

export default Furnishings;