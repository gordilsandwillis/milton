import React from 'react'
import ActivitiesSlider from 'src/components/ActivitiesSlider'
import QuotesSlider from 'src/components/QuotesSlider'

const Slider = ({ type, ...props }) => {
	switch (type) {
	case 'Images':
		return <ActivitiesSlider {...props} />
	case 'Quotes':
		return <QuotesSlider {...props} />
	default:
		return ''
	}
}

export default Slider
