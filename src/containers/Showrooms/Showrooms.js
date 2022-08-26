import React, { Fragment } from "react";
import ReactGA from "react-ga";
import styled from "@emotion/styled";

import Header from "src/components/Header";
import Section from "src/components/Section";
import ScrollEntrance from "src/components/ScrollEntrance";
import Grid from "src/components/Grid";
import CalloutText from "src/components/CalloutText";

import SEO from "src/components/SEO";

import { util } from "src/styles";

const Address = styled.address`
	${util.responsiveStyles("margin-bottom", 91, 51, 33, 26)}
`;

const Title = styled.h6`

`

const Showrooms = (props) => {
	return (
		<Fragment>
			<SEO title="Showrooms" />
			<div style={{ textAlign: "center" }}>
				<Header hasAtf={false} />
				<Section prevTheme="bgColor" setTheme="bgColor">
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="bgColor"
						alignment="center"
						headline="SHOWROOMS"
						headlineSize="h3"
						text={
							<p>
								Please contact us at{" "}
								<a href="mailto:info@miltontextiles.com">
									info@miltontextiles.com
								</a>{" "}
								if we are not at a showroom near you.
							</p>
						}
					/>
					<Grid small="[12]" medium="2 [4] 2 [4] 2" large="2 [4] 2 [4] 2">
						<ScrollEntrance>
							<div>
								<Address>
									<Title as="p">Temple Studio</Title>
									<p>
										51 East 12th Street, 4th floor <br />
										New York, New York 10003
										<br />
										<a href="mailto:hello@templestudiony.com">
											hello@templestudiony.com
										</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="http://www.templestudiony.com"
										>
											www.templestudiony.com
										</a>
										<br />
										<a href="tel:+1-917-985-8151">917.985.8151</a>
									</p>
								</Address>
							</div>
							<div>
								<Address>
									<Title as="p">The Lot Showroom</Title>
									<p>
										Southeast : AL, GA, MS, NC, KY, SC, TN, FL <br />
										<a href="mailto:bforrister@thelotshowroom.com">
											bforrister@thelotshowroom.com{" "}
										</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="http://www.thelotshowroom.com"
										>
											www.thelotshowroom.com
										</a>
										<br />
										<a href="tel:+1-828-361-3500">828.361.3500</a>
									</p>
								</Address>
							</div>
							<div>
								<Address>
									<Title as="p">Evars Collective</Title>
									<p>
										1600 El Camino Real, Suite B<br />
										San Carlos, California 94070
										<br />
										<a href="mailto:concierge@evarscollective.com">
											concierge@evarscollective.com
										</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="https://www.evarscollective.com"
										>
											www.evarscollective.com
										</a>
										<br />
										<a href="tel:+1-650-585-2330">650.585.2330</a>
									</p>
								</Address>
							</div>
							<div>
								<Address>
									<Title as="p">Kilkenny Collections</Title>
									<p>
										Pennsylvania, Delaware, and South New Jersey
										<br />
										24 Louella Court, Suite 240
										<br />
										Wayne, PA 19087
										<br />
										<a href="mailto:kristen@kilkennycollections.com">
											kristen@kilkennycollections.com
										</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="https://www.kilkennycollections.com"
										>
											www.kilkennycollections.com
										</a>
										<br />
										<a href="tel:+1-484-581-7946">484.581.7946</a>
									</p>
								</Address>
							</div>
							<div>
								<Address>
									<p>Available at:</p>
									<Title as="p">Chairloom</Title>
									<p>
										Narberth, Pennsylvania 19072
										<br />
										<a href="mailto:chairloom@gmail.com">chairloom@gmail.com</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="https://www.chairloom.com"
										>
											www.chairloom.com
										</a>
										<br />
										<a href="tel:+1-914-484-5498">914.484.5498</a>
									</p>
								</Address>
							</div>
						</ScrollEntrance>
						<ScrollEntrance>
							<div>
								<Address>
									<Title as="p">Wells Abbott Showroom - Dallas</Title>
									<p>
										Dallas Design Center
										<br />
										1025 N Stemmons Fwy
										<br />
										Suite 749
										<br />
										Dallas, TX 75207
										<br />
										<a href="mailto:info@wellsabbott.com">info@wellsabbott.com</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="https://www.wellsabbott.com"
										>
											www.wellsabbott.com
										</a>
										<br />
										<a href="tel:+1-214-239-8722">214.239.8722</a>
									</p>
								</Address>

								<Address>
									<Title as="p">Wells Abbott Showroom - Houston</Title>
									<p>
										Decorative Center of Houston
										<br />
										5120 Woodway Dr
										<br />
										Suite 3010
										<br />
										Houston, TX 77056
										<br />
										<a href="mailto:info@wellsabbott.com">info@wellsabbott.com</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="https://www.wellsabbott.com"
										>
											www.wellsabbott.com
										</a>
										<br />
										<a href="tel:+1-214-526-8200">214.526.8200</a>
									</p>
								</Address>
								<Address>
									<Title as="p">Wells Abbott Showroom - Chicago</Title>
									<p>
										theMART
										<br />
										222 Merchandise Mart Plaza
										<br />
										Suite 6-142
										<br />
										Chicago, IL 60654
										<br />
										<a href="mailto:info@wellsabbott.com">info@wellsabbott.com</a>
										<br />
										<a
											rel="noopener noreferrer"
											target="_blank"
											href="https://www.wellsabbott.com"
										>
											www.wellsabbott.com
										</a>
										<br />
										<a href="tel:+1-312-809-5115">312.809.5115</a>
									</p>
								</Address>
							</div>

						</ScrollEntrance>
					</Grid>
				</Section>
			</div>
		</Fragment>
	);
};

export default Showrooms;
