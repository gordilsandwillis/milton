import React from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import { storiesOf } from '@storybook/react'
import ScrollEntrance from './ScrollEntrance'

const Item = styled.div`
	background: rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-radius: 2px;
	margin: 8px 0;
	min-height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	width: 100%;
	max-width: 600px;
	margin: 20px auto;
`

const Description = styled.div`
	textAlign: center;
	max-width: 500px;
	margin: 4rem auto 20px;
`

const stories = storiesOf(`Components/ScrollEntrance`, module)
stories.add(`Default`, () => (
	<div style={{ padding: '70vh 0 50px', textAlign: 'center' }}>
		<Description>
			<h4>Default</h4>
		</Description>
		{_.range(5).map(i => (
			<ScrollEntrance key={i}>
				<Item>
					{i + 1}
				</Item>
			</ScrollEntrance>
		))}
		<Description>
			<h4>From the left</h4>
			<p>Add a "transform" prop to the ScrollEntrance component and set a custom initial transform position. ie. "translate3d(-70px, 0, 0)"</p>
		</Description>
		{_.range(5).map(i => (
			<ScrollEntrance transform="translate3d(-70px, 0, 0)" key={i}>
				<Item>
					{i + 1} from left
				</Item>
			</ScrollEntrance>
		))}
		<Description>
			<h4>From the right</h4>
		</Description>
		{_.range(5).map(i => (
			<ScrollEntrance transform="translate3d(70px, 0, 0)" key={i}>
				<Item>
					{i + 1} from right
				</Item>
			</ScrollEntrance>
		))}
		<Description>
			<h4>Scale up</h4>
		</Description>
		{_.range(5).map(i => (
			<ScrollEntrance transform="translate3d(0, 50px, 0) scale(.8)" key={i}>
				<Item>
					{i + 1} scale in
				</Item>
			</ScrollEntrance>
		))}
	</div>
))
