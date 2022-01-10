
export const toPrice = (price) => (price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export const camelToSentence = (text) => {
	if (!text || typeof text !== 'string') {
		return null
	}
	const result = text.replace(/([A-Z])/g, ' $1')
	const semiFinalResult = result.charAt(0).toUpperCase() + result.slice(1)
	const finalResult = semiFinalResult[0] === ' ' ? semiFinalResult.substring(1) : semiFinalResult
	return finalResult
}

export const objectCamelToSentence = (object) => (
	Object.keys(object).reduce((acc, key) => {
		const sentenceKey = camelToSentence(key)
		const value = object[key]
		if (Array.isArray(value) && value?.length > 0) {
			acc[sentenceKey] = value?.join('\n')
		} else if (typeof value === 'string' || typeof value === 'boolean') {
			acc[sentenceKey] = value
		}
		return acc
	}, {})
)

export const getPriceString = (minPrice, maxPrice) => {
	let priceString = null
	if (minPrice && maxPrice) priceString = `$${Number(minPrice).toLocaleString('en-US')}—$${Number(maxPrice).toLocaleString('en-US')}`
	else if (minPrice) priceString = `$${Number(minPrice).toLocaleString('en-US')}`
	else if (maxPrice) priceString = `$${Number(maxPrice).toLocaleString('en-US')}`
	return priceString
}

export const range = (start, end) => (
	Array(end - start + 1)
		.fill()
		.map((_, idx) => start + idx)
)

export const clamp = (val, min, max) => Number(val > max ? max : val < min ? min : val)
