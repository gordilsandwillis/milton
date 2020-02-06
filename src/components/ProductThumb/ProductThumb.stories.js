import React from 'react'
import { storiesOf } from '@storybook/react'
import ProductThumb from './ProductThumb'

const stories = storiesOf(`Components/ProductThumb`, module)
stories.add(`Default`, () => (
  <ProductThumb>Glenn Gertler in the Jack D. Gordon tornament against camp Greylock</ProductThumb>
))
