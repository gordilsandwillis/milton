import React from 'react'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import Section from 'components/Section'
import Image from 'components/Image'
import Video from 'components/Video'
import ThemeSelector from 'components/ThemeSelector'
import Grid from 'components/Grid'
import Caption from 'components/Caption'
import ConditionalRender from 'components/ConditionalRender'
import { colors, mq } from 'styles'
import ScrollEntrance from 'components/ScrollEntrance'

const WideMediaWrap = styled(ThemeSelector)`
	position: relative;
	z-index: 2;
`

const CaptionOverlay = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 1em;
	z-index: 3;
	${ mq.mediumAndBelow } {
		position: relative;
		bottom: auto;
		top: 100%;
		z-index: 1;
		background: ${ colors.black };
		padding-top: 8px;
	}
`

const CaptionBlock = styled.div`
`

const WideMedia = ({ image, video, nextSectionBg, fullWidth, theme, prevTheme, nextTheme, caption }) => {
	if (!fullWidth) {
		return (
			<Section
				setTheme={theme}
				nextTheme={nextTheme}
				prevTheme={prevTheme}
			>
				<ScrollEntrance>
					<Grid small="1 [12] 1">
						{image && !video ? (
							<Image
								image={image.image}
								small={image.small}
								medium={image.medium}
								large={image.large}
								alt={image.description || image.title}
							/>
						) : false}
						<ConditionalRender condition={video}>
							<Video url={video && video.file.url} playing={true} loop={true} coverImage={image ? image.image : false}/>
						</ConditionalRender>
						<ConditionalRender condition={caption}>
							<Caption>{caption}</Caption>
						</ConditionalRender>
					</Grid>
				</ScrollEntrance>
			</Section>
		)
	}

	return (
		<ScrollEntrance>
			<WideMediaWrap setTheme={nextTheme}>
				<div>
					{image && !video ? (
						<Image
							image={image.image}
							small={image.small}
							medium={image.medium}
							large={image.large}
							alt={image.description || image.title}
						/>
					) : false}
					<ConditionalRender condition={video}>
						<Video url={video && video.file.url} playing={true} loop={true} coverImage={image ? image.image : false} />
					</ConditionalRender>
				</div>
				<ConditionalRender condition={caption}>
					<Grid small="1 [12] 1">
						<div>
							<CaptionBlock>
								<Caption>{caption}</Caption>
							</CaptionBlock>
						</div>
					</Grid>
				</ConditionalRender>
			</WideMediaWrap>
		</ScrollEntrance>
	)
}

WideMedia.defaultProps = {
	fullWidth: false
}

export default WideMedia
