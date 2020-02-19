import React from 'react'
import { storiesOf } from '@storybook/react'
import Collapse from './Collapse'

const stories = storiesOf(`Components/Collapse`, module)
stories.add(`default`, () => (
	<Collapse />
))
