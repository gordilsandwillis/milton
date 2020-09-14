import React, { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';

// Track Pageview
const FacebookPixel = ({location, ...rest}) => {
	const { pathname } = location
	useEffect(() => {
		const handleChange = () => {
			if (pathname) {
				ReactPixel.pageView();
			}
		}
		handleChange();
		return () => {
				handleChange();
		}
	}, [pathname]);
	return null
}

export default FacebookPixel;