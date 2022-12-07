// const getPaymentDates = (deliveryDate, installmentsCount) => {
// 	if (!installmentsCount || installmentsCount < 1)
// 		throw new Error('installmentsCount must be greater than 0')
// 	if (!deliveryDate || !moment(deliveryDate).isValid())
// 		throw new Error('valid deliveryDate is required')

// 	let paymentDates = []

// 	for (let index = 0; index < installmentsCount; index++) {
// 		const sourceDate =
// 			index === 0 ? deliveryDate : paymentDates[paymentDates.length - 1]
// 		let newDate = moment(sourceDate).add(30, 'day')
// 		if (!newDate.isBusinessDay()) {
// 			const newDateFormatted = moment(newDate.nextBusinessDay()).format(
// 				'YYYY-MM-DD'
// 			)
// 			paymentDates.push(newDateFormatted)
// 		} else {
// 			const newDateFormatted = moment(newDate).format('YYYY-MM-DD')
// 			paymentDates.push(newDateFormatted)
// 		}
// 	}
// 	return paymentDates
// }

// const getPaymentDates2 = (deliveryDate, installmentsCount) => {
// 	if (!installmentsCount || installmentsCount < 1)
// 		throw new Error('installmentsCount must be greater than 0')
// 	if (!deliveryDate || !moment(deliveryDate).isValid())
// 		throw new Error('valid deliveryDate is required')

// 	let paymentDates = []

// 	for (let index = 0; index < installmentsCount; index++) {
// 		const sourceDate =
// 			index === 0 ? deliveryDate : paymentDates[paymentDates.length - 1]
// 		let newDate = moment(sourceDate).add(30, 'day')
// 		const newDateMonth = moment(newDate).month()
// 		const sourceDateMonth = moment(sourceDate).month()
// 		if (newDateMonth === sourceDateMonth) {
// 			const firstOfNextMonth = moment({
// 				year: moment(newDate).year(),
// 				month: moment(newDate).month() === 11 ? 0 : moment(newDate).month() + 1,
// 				day: 1
// 			}).format('YYYY-MM-DD')
// 			newDate = firstOfNextMonth
// 		}

// 		const newDateFormatted = moment(newDate).format('YYYY-MM-DD')
// 		paymentDates.push(newDateFormatted)
// 	}
// 	return paymentDates
// }
