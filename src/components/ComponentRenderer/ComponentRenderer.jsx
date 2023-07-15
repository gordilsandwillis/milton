import React from 'react'

import ATF from 'components/ATF'
import CalloutText from 'components/CalloutText'
import FiftyFifty from 'components/FiftyFifty'
import TwoColumnText from 'components/TwoColumnText'
import WideMedia from 'components/WideMedia'
import TwoUpImages from 'components/TwoUpImages'

const componentMap = {
	ContentfulAboveTheFold: ATF,
	ContentfulCalloutText: CalloutText,
	ContentfulFiftyFifty: FiftyFifty,
	ContentfulTwoColumnText: TwoColumnText,
	ContentfulWideMedia: WideMedia,
	ContentfulTwoUpImages: TwoUpImages
}

export default ({ item, prevTheme, nextTheme, index }) => {
	const Component = componentMap[item.__typename]
	return Component ? (
		<Component {...item} prevTheme={prevTheme} nextTheme={nextTheme} index={index}/>
	) : null
}
