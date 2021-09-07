import React from "react";
import styled from "@emotion/styled";

import Section from "src/components/Section";
import Grid from "src/components/Grid";
import ProductThumb from "src/components/ProductThumb";
import ScrollEntrance from "src/components/ScrollEntrance";
import { mq } from "src/styles";

const FurnishingsGrid = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;

	${({ colGap, rowGap }) => `
		margin-left: calc(${colGap[0]} * -.5);
		margin-right: calc(${colGap[0]} * -.5);
		> div {
			flex-shrink: 0;
			padding-left: calc(${colGap[0]} * .5);
			padding-right: calc(${colGap[0]} * .5);
			padding-bottom: ${rowGap[0]};
			width: 100%;
		}

		${mq.mediumAndUp} {
			> div {
				width: 50%;
			}
		}

		${mq.largeAndUp} {
			margin-left: calc(${colGap[1]} * -.5);
			margin-right: calc(${colGap[1]} * -.5);
			> div {
				padding-left: calc(${colGap[1]} * .5);
				padding-right: calc(${colGap[1]} * .5);
				padding-bottom: ${rowGap[1]};
				width: 33.333%;
			}
		}

		${mq.largerAndUp} {
			margin-left: calc(${colGap[2]} * -.5);
			margin-right: calc(${colGap[2]} * -.5);
			> div {
				padding-left: calc(${colGap[2]} * .5);
				padding-right: calc(${colGap[2]} * .5);
				padding-bottom: ${rowGap[2]};
				width: 33.333%;
			}
		}

	`}
`;

const Furnishings = ({ products, prevTheme = false }) => {
	if (!products || products.length < 1) {
		return false;
	}

	return (
		<div>
			<ScrollEntrance>
				<Section setTheme="bgColor" nextTheme="bgColor" prevTheme={prevTheme}>
					<Grid small="1 [12] 1">
						<h4 style={{ textAlign: "center" }}>Furniture</h4>
					</Grid>
				</Section>
				<Section prevTheme="bgColor" setTheme="bgColor" nextTheme={false}>
					<Grid small="1 [12] 1">
						<div>
							<FurnishingsGrid
								colGap={["3.6vw", "24px", "30px"]}
								rowGap={["50px", "70px", "80px"]}
							>
								{products.map((product, index) =>
									product.variants.map(
										(variant, index) =>
											variant.image && (
												<div key={variant.id}>
													<ProductThumb product={product} variant={variant} />
												</div>
											)
									)
								)}
							</FurnishingsGrid>
						</div>
					</Grid>
				</Section>
			</ScrollEntrance>
		</div>
	);
};

export default Furnishings;
