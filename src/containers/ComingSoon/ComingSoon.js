import React from 'react';
import styled from '@emotion/styled'

import Logo from 'src/components/Logo'
import Grid from 'src/components/Grid'

import NewsletterForm from 'src/components/NewsletterForm'


const CenteredContent = styled.div`
	position:fixed;
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const ComingSoon = (props) => {
  return (
  	<CenteredContent>
			<Logo />
			<p>Join the mailing list to get notified when we launch.</p>
			<NewsletterForm theme="textColor" />
		</CenteredContent>
  )
}

export default ComingSoon