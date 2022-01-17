import React from 'react'
import Drawer from './Drawer'

export default {
	title: 'Drawer/Default',
	component: Drawer,
}

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Drawer {...args} />

export const Default = Template.bind({})
Default.args = {
	children: <p>Text in a card</p>,
}
