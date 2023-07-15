import React from 'react'
import styled from '@emotion/styled'
import { typography, colors } from 'styles'

const Wrapper = styled.div`
	padding-top: 1em;
	figcaption {
		margin: 0;
		max-width: 42em;
		opacity: .6;
	}
`

const Caption = ({ className, children, bulletColor }) => (
  <Wrapper className={className}>
  	<figcaption>{children}</figcaption>
  </Wrapper>
)

Caption.defaultProps = {
	bulletColor: "mainColor"
}

export default Caption
