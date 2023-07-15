import React, { Component, Fragment } from "react";
import styled from "@emotion/styled";
import ReactGA from "react-ga";

import { LogoMark } from "components/Logo";
import LargeLogo from "components/LargeLogo";
import Header from "components/Header";
import ATF from "components/ATF";
import CalloutText from "components/CalloutText";
import CollectionSections from "components/CollectionSections";
import Newsletter from "components/Newsletter";
import SEO from "components/SEO";

import AtfImage from "assets/images/home-atf.jpg";

const BottomOverlay = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40%;
	z-index: 1;
	background: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.3) 0%,
		rgba(0, 0, 0, 0) 100%
	);
`;

class Home extends Component {
	state = {
		collapseHeader: false,
	};

	componentDidMount() {
		if (process.env.NODE_ENV === "production") {
			ReactGA.initialize(process.env.REACT_APP_GA_TRACKING);
			ReactGA.pageview(window.location.pathname + window.location.search);
		}
	}

	render() {
		return (
			<Fragment>
				<SEO title="Home" />
				<div>
					<Header
						hasAtf={true}
						homepage={true}
						collapsed={this.state.collapseHeader}
					/>
					<ATF
						index={0}
						fullHeight="true"
						image={{
							fluid: {
								aspectRatio: 2,
								src: AtfImage,
								srcSet: "",
								sizes: "",
							},
						}}
						nextTheme="bgColor"
						overlay="0"
						additions={<BottomOverlay />}
					/>
					<LargeLogo />
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="bgColor"
						alignment="center"
						headline="Art in Living, Living in Art."
						headlineSize="h4"
						buttons={[
							{ linkType: "underlinedLink", label: "Learn More", to: "/about" },
						]}
						icon={<LogoMark />}
					/>
					<CollectionSections />
					<Newsletter />
				</div>
			</Fragment>
		);
	}
}

export default Home;
