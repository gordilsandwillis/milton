import React from 'react'
import { storiesOf } from '@storybook/react'
import TwoUpImages from './TwoUpImages'
import * as mock from 'src/mock'

const stories = storiesOf(`Blocks`, module)
stories.add(`Two Up Images`, () => (
  <TwoUpImages
  	images={[
  		{
	  		image: mock.Placeholder34,
	  		caption: 'Caption',
	  		id: 'img1'
  		},
  		{
	  		image: mock.Placeholder43,
	  		caption: 'Caption',
	  		id: 'img2'
  		}
  	]}
  />
))
