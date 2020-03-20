export const validateEmail = (email = '') => {
	let re = /\S+@\S+\.\S+/
	return re.test(email)
}

export const validatePhoneNumber = (phoneNumber = '') => {
	return phoneNumber.match(/\d/g) ? phoneNumber.match(/\d/g).length === 10 : false
}