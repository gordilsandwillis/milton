import React, { Component } from 'react'
import styled from '@emotion/styled'
import { lighten } from 'polished'

import Link from 'src/components/Link'
import Grid from 'src/components/Grid'
import Logo from 'src/components/Logo'
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
`

class Footer extends Component {
	render () {
		return (
			<Wrapper setTheme="red">
				<h3>Footer</h3>
			</Wrapper>
		)
	}
}

export default Footer
