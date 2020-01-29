import React, { Component } from 'react'
import styled from '@emotion/styled'
import { lighten } from 'polished'

import Link from 'src/components/Link'
import Grid from 'src/components/Grid'
import Logo, { LogoMark } from 'src/components/Logo'
import MailchimpSignup from 'src/components/MailchimpSignup'
import ThemeSelector from 'src/components/ThemeSelector'
import ConditionalRender from 'src/components/ConditionalRender'
import ContentfulRichText from 'src/components/ContentfulRichText'

import { globals, typography, colors, animations, mq, util } from 'src/styles'

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
		padding: .25em 0;
	}
`

const FooterLogoIcon = styled(LogoMark)`
	margin-bottom: 20px;
`

class Footer extends Component {
	render () {
		return (
			<Wrapper setTheme="red">
				<Grid small="1 [12] 1">
					<div>
						<FooterLogoIcon />
						<FooterItem><a href="/mailto:info@miltontextiles.com">info@miltontextiles.com</a></FooterItem>
						<FooterItem><p>Made in the USA</p></FooterItem>
						<FooterItem><a target="_blank" href="https://gordilsandwillis.com/">Site By</a></FooterItem>
					</div>
				</Grid>
			</Wrapper>
		)
	}
}

export default Footer
