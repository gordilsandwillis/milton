import React from 'react'

const componentForCondition = (condition, trueComponent, falseComponent) => {
	return condition ? trueComponent : falseComponent
}

const TernaryComponent = ({
	condition,
	trueComponent,
	falseComponent,
	propsForCondition = (_condition, restProps) => restProps,
	...restProps
}) => {
	const Component = componentForCondition(condition, trueComponent, falseComponent)

	const props = propsForCondition(condition, restProps)

	return <Component {...props} />
}

export default TernaryComponent
