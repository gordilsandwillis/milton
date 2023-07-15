import React, { Component } from 'react'
import styled from '@emotion/styled'

import Input from 'components/Input'
import { colors, typography } from 'styles'

const StyledInput = styled(Input)`
  display: ${ ({ hidden }) => hidden ? 'none' : 'block' };
  margin-top: 10px;
  input {
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 0;
    padding-right: 0;
    background: transparent;
    border-color: ${ colors.hrColor };
    padding-top: 18px;
    &:hover,
    &:focus {
      background: transparent;
      border-color: ${ colors.textColor };
    }
  }
  label {
    padding: 18px 0 0 0;
    margin: 0;
    left: 0;
    ${ typography.h6 }
    &.focused {
      color: ${ colors.lightTextColor };
      transform: translate3d(0, -16px, 0) scale(.75);
    }
  }
`

class UnderlinedInput extends Component {
	render () {
		return (
			<StyledInput {...this.props}/>
		)
	}
}

export default UnderlinedInput
