import React from 'react'
import styled from '@emotion/styled'
import { useInView } from 'react-intersection-observer'

const transitionTiming = 'ease-in-out' //'cubic-bezier(0.44, 0.24, 0.16, 1.00)'
const transitionSpeed = '.65s'
const transitionDelay = 0.15

const EnteranceWrap = styled.div`
	${ ({ transitionIn, 'data-in-view': inView, transform, items, delay }) => transitionIn ? `
		> * {
			transition: 	transform ${ transitionSpeed } ${ transitionTiming },
										opacity ${ transitionSpeed } ${ transitionTiming };
			${ inView ? `
				transform: none;
				opacity: 1;
			` : `
				transform: ${ transform };
				opacity: 0;
			` }

			${ delay > 0 ? `
				transition-delay: ${ transitionDelay * (delay) }s;
			` : `` }
		}
		${ Array.isArray(items) ? items.map((item, index) => `
			> *:nth-of-type(${index}) {
				transition-delay: ${ transitionDelay * (index + delay) }s;
			}
		`) : `` }
	` : `` }
`

const ScrollEntrance = ({ children, className, transform, delay, transitionIn }) => {
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
			transitionIn={transitionIn}
		>
			{children}
		</EnteranceWrap>
	)
}

ScrollEntrance.defaultProps = {
	transform: 'translate3d(0, 40px, 0)',
	delay: 0,
	transitionIn: true
}

export default ScrollEntrance
