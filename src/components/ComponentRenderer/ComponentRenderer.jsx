import React from 'react'

import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import FiftyFifty from 'src/components/FiftyFifty'
import TwoColumnText from 'src/components/TwoColumnText'
import WideMedia from 'src/components/WideMedia'
import TwoUpImages from 'src/components/TwoUpImages'

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
