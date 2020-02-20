import React from 'react'
import styled from '@emotion/styled'
import { useInView } from 'react-intersection-observer'

const transitionTiming = 'cubic-bezier(0.44, 0.24, 0.16, 1.00)'
const transitionSpeed = '.65s'
const transitionDelay = 0.075

const EnteranceWrap = styled.div`
	> * {
		transition: 	transform ${ transitionSpeed } ${ transitionTiming },
									opacity ${ transitionSpeed } ${ transitionTiming };
		${ ({ 'data-in-view': inView, transform }) => inView ? `
			transform: none;
			opacity: 1;
		` : `
			transform: ${ transform };
			opacity: 0;
		` }

		${ ({ delay }) => delay > 0 && `
			transition-delay: ${ transitionDelay * (delay) }s;
		` }

		${ ({ items, delay }) => Array.isArray(items) ? `
			${ items.map((item, index) => `
				&:nth-child(${ index }) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
					transition-delay: ${ transitionDelay * (index + delay) }s;
				}
			`) }
		` : `` }

	}
`

const ScrollEntrance = ({ children, className, transform, delay }) => {
	const [ref, inView] = useInView({ triggerOnce: true })

	if (!children) {
		return false
	}

	return (
		<EnteranceWrap
			ref={ref}
			delay={delay}
			data-in-view={inView}
			transform={transform}
			className={className}
			items={children}
		>
			{children}
		</EnteranceWrap>
	)
}

ScrollEntrance.defaultProps = {
	transform: 'translate3d(0, 40px, 0)',
	delay: 0
}

export default ScrollEntrance
