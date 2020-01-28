import PropTypes from 'prop-types'

const ConditionalRender = ({
	condition,
	...props
}) => {
	if (condition) {
		return props.children
	} else {
		return null
	}
}

ConditionalRender.propTypes = {
	condition: PropTypes.any,
	children: PropTypes.any.isRequired
}

export default ConditionalRender
