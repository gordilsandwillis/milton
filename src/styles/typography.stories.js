import React from 'react'

import { storiesOf } from '@storybook/react'

const qbf = 'The quick brown fox jumps over the lazy dog'
const lorem = `lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.`
const longLorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et iaculis nisi, vel auctor ipsum. Integer finibus, sem id fringilla tincidunt, quam quam auctor leo, hendrerit accumsan neque metus eu sapien. In suscipit sapien id orci tempor ornare. Nullam nunc velit, molestie quis leo ac, ultrices tempus nulla. Pellentesque finibus nibh vel dui tempus suscipit. Nullam justo sapien, ullamcorper at augue sit amet, pellentesque lobortis ex. Integer in nunc sapien. Aliquam eu elit sagittis odio tristique tristique. Aenean vel neque mattis, pellentesque ipsum sit amet, condimentum felis. Suspendisse ac molestie ex. Proin tristique lorem eu pharetra molestie.`

storiesOf(`Styleguide`, module)
	.add('Typography', () => (
		<div style={{ padding: '5%', maxWidth: '1300px' }}>
			<h1>H1: {qbf}</h1>
			<hr/>
			<h2>H2: {qbf}</h2>
			<hr/>
			<h3>H3: {qbf}</h3>
			<hr/>
			<h4>H4: {qbf}</h4>
			<hr/>
			<h5>H5: {qbf}</h5>
			<hr/>
			<h6>H6: {qbf}</h6>
			<hr />

			<h4>Small Body Copy</h4>
			<p className="small">{longLorem}</p>
			<p className="small">{lorem}</p>

			<hr />

			<h4>Body Copy</h4>
			<p>{longLorem}</p>
			<p>{lorem}</p>

			<hr />

			<h4>Medium Body Copy</h4>
			<p className="medium">{longLorem}</p>
			<p className="medium">{lorem}</p>

			<hr />

			<h4>Large Body Copy</h4>
			<p className="large">{longLorem}</p>
			<p className="large">{lorem}</p>

			<hr/>

			<h4>Body copy with inline styles</h4>
			<p>Here is some <strong>bold text</strong>.</p>
			<p>Here is some <em>italic text</em>.</p>
			<p>Here is some <strong><em>bold and italic</em></strong> text.</p>

			<hr />

			<h4>Caption</h4>
			<figcaption>Caption: {qbf}</figcaption>

			<hr/>

			<h4>Text Link</h4>

			<a href="http://gordilsandwillis.com">Text Link</a>

			<hr />

			<h4>Unordered List</h4>

			<ul>
				<li>
					Foo lorem ipsum
				</li>
				<li>
					Bar dolor sit amet
				</li>
			</ul>

			<hr />

			<h4>
				Ordered List
			</h4>

			<ol>
				<li>
					Foo lorem ipsum
				</li>
				<li>
					Bar dolor sit amet
				</li>
			</ol>

			<hr />

			<h4>Block Quote</h4>

			<blockquote>
				{longLorem}
			</blockquote>
		</div>
	))
