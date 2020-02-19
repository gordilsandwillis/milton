import React from 'react';
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Grid from 'src/components/Grid'

const Todo = styled.div`
	background: pink;
	color: red;
	padding: 50px;
`

const Furnishings = (props) => {
  return (
    <Todo><h1>Furnishings</h1></Todo>
  )
}

export default Furnishings;