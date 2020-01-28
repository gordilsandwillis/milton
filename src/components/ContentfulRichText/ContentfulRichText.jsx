import React from 'react'
import styled from '@emotion/styled'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

const RichTextWrapper = styled.div`
	> *:first-child {
		margin-top: 0;
	}
	> *:last-child {
		margin-bottom: 0;
	}
	white-space: pre-wrap;
	* {
		white-space: pre-wrap;
	}
`

const Heading1 = ({ children }) => <h1>{children}</h1>

const options = {
	renderMark: {
		[MARKS.BOLD]: text => <b>{text}</b>,
	},
	renderNode: {
		[BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
	},
}

const ContentfulRichText = ({ richText, className }) => (
	<RichTextWrapper className={className}>
		{documentToReactComponents(richText, options)}
	</RichTextWrapper>
)

// ContentfulRichText.defaultProps = {
// 	richText: richText
// }

export default ContentfulRichText
