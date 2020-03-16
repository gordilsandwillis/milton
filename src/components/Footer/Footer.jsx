import React, { Component } from 'react'
import styled from '@emotion/styled'
import Grid from 'src/components/Grid'
import { LogoMark } from 'src/components/Logo'
import ThemeSelector from 'src/components/ThemeSelector'
import Link from 'src/components/Link'

import { typography, util } from 'src/styles'

const Wrapper = styled(ThemeSelector)`
	position: relative;
	z-index: 2;
	flex-grow: 0;
	flex-shrink: 0;
	width: 100%;
	text-align: center;
	${ util.responsiveStyles('padding-top', 130, 100, 80, 70) }
	${ util.responsiveStyles('padding-bottom', 150, 120, 100, 90) }
`

const FooterItem = styled.div`
	display: block;
	a, p {
		${ typography.h6 }
		margin: 0;
		display: inline-block;
		vertical-align: top;
		margin: .25em 0;
	}
`

const FooterLogoIcon = styled(LogoMark)`
	margin-bottom: 20px;
`

const Divider = styled.div`
	${ typography.h6 }
	display: inline-block;
	width: 4px;
	height: 4px;
	border-radius: 50%;
	background: currentcolor;
	vertical-align: top;
	margin: .9em 1em 0;
`

class Footer extends Component {
	render () {
		return (
			<Wrapper setTheme="grey">
				<Grid small="1 [12] 1">
					<div>
						<FooterLogoIcon />
						<FooterItem><Link type="capsLink" external={true} to="mailto:info@miltontextiles.com">info@miltontextiles.com</Link></FooterItem>
						<FooterItem>
							<Link type="capsLink" external={true} to="https://www.instagram.com/miltontexiles/">Instagram</Link>
							<Divider/>
							<Link type="capsLink" external={true} to="https://pinterest.com/">Pinterest</Link>
						</FooterItem>
						<FooterItem><p>Made in the USA</p></FooterItem>
						<FooterItem><Link type="capsLink" external={true} to="https://gordilsandwillis.com/">Site By G&W</Link></FooterItem>
					</div>
				</Grid>
			</Wrapper>
		)
	}
}

export default Footer
