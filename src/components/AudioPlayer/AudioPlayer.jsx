import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import ReactAudioPlayer from 'react-audio-player'
import { colors, typography, animations } from 'src/styles'
import Button from 'src/components/Button'

const AudioPlayerElement = styled(ReactAudioPlayer)`
	margin-top: 100px;
	display: none !important;
`

const PlayerControls = styled.div`
	display: flex;
	align-items: center;
`

const ScrubberWrap = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 1;
	padding-left: 14px;
`

const Time = styled.div`
	flex-grow: 0;
	flex-shrink: 0;
	${ typography.bodySmall }
	font-weight: 500;
	padding-top: 2px;
	${ ({ alignment }) => alignment && `text-align: ${ alignment };` }
	width: ${ ({ duration }) => duration >= 3600 ? `5em` : `3.25em` };
`

const ScrubberInput = styled.input`
	position: absolute;
	width: calc(100% + 12px);
	z-index: 2;
	height: 11px;
	top: -7px;
	left: -6px;
	appearance: none;
	background: transparent;

	:focus {
		box-shadow: none;
		outline: none;
	}

	:active {
		cursor: grabbing;
	}

	::-webkit-slider-thumb {
		appearance: none;
		cursor: grab;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: ${ colors.textColor };
		&:active {
			cursor: grabbing;
		}
	}

	::-moz-range-thumb {
		appearance: none;
		cursor: grab;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: ${ colors.textColor };
		&:active {
			cursor: grabbing;
		}
	}

`

const ScrubberTrack = styled.div`
	height: 1px;
	width: 100%;
	background: ${ colors.lightTextColor };
	transition: transform ${ animations.mediumSpeed }
`

const ScrubberProgress = styled.div`
	content: ''
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	height: 1px;
	width: ${ ({ currentTime, duration }) => `${ (currentTime / duration * 100).toPrecision(4) }%` };
	background: ${ colors.mainColor };
`

const Scrubber = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background: transparent;
	margin: 0 20px;
	flex-grow: 1;
	&:hover {
		${ ScrubberTrack } {
			transform: scaleY(3);
		}
	}
`

class AudioPlayer extends Component {
	state = {
		loading: true,
		playing: false,
		currentTime: 0,
		duration: null,
		muted: false
	}

	constructor (props) {
		super(props)
		this.Player = React.createRef()
	}

	playPause = () => {
		const playing = this.state.playing
		if (playing) {
			this.Player.current.audioEl.pause()
		} else {
			this.Player.current.audioEl.play()
		}
		this.setState({ playing: !playing })
	}

	muteUnmute = () => {
		const muted = this.state.muted
		this.setState({ muted: !muted })
	}

	componentDidMount = () => {
		this.Player.current.audioEl.addEventListener('loadeddata', e => {
			this.setState({
				loading: false,
				duration: e.target.duration
			})
		})

		this.Player.current.audioEl.addEventListener('timeupdate', e => {
			this.setState({
				currentTime: e.target.currentTime,
			})
		})
	}

	componentWillUnmount = () => {
		this.Player.current.audioEl.removeEventListener('timeupdate', () => {})
	}

	secondsTohhmmss = (totalSeconds, duration) => {
		let hours = Math.floor(totalSeconds / 3600)
		let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
		let seconds = totalSeconds - (hours * 3600) - (minutes * 60)

		let hasHours = duration >= 3600 || totalSeconds >= 3600

		// round seconds
		seconds = Math.round(seconds * 100) / 100

		let result = (hasHours ? (hours < 10 ? '0' + hours : hours) + ':' : '') + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
		return result
	}

	handleChange = event => {
		this.Player.current.audioEl.currentTime = event.target.value
	}

	render () {
		const { file } = this.props
		const { currentTime, duration, playing, muted } = this.state

		if (!file) {
			return false
		}

		return (
			<Fragment>
				<PlayerControls>
					<Button onClick={this.playPause} icon={playing ? 'pause' : 'play_arrow'} size="tiny" shape="circle" />
					<ScrubberWrap>
						<Time duration={duration} alignment="right">{this.secondsTohhmmss(Math.round(currentTime), duration)}</Time>
						<Scrubber>
							<ScrubberInput
								type="range"
								min={0}
								max={duration}
								value={currentTime}
								onChange={this.handleChange}
							/>
							<ScrubberTrack>
								<ScrubberProgress
									currentTime={currentTime}
									duration={duration}
								/>
							</ScrubberTrack>
						</Scrubber>
						<Time duration={duration}>{this.secondsTohhmmss(Math.round(duration))}</Time>
					</ScrubberWrap>
					<Button onClick={this.muteUnmute} icon={muted ? 'volume_up' : 'volume_off'} size="tiny" shape="circle" />
				</PlayerControls>

				<AudioPlayerElement
					ref={this.Player}
					controls
					muted={muted}
					src={file.source_url}
				/>
			</Fragment>
		)
	}
}

export default AudioPlayer
