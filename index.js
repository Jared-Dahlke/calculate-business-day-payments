const express = require('express')
const app = express()
const port = 3005
var moment = require('moment-business-days') //https://github.com/kalmecak/moment-business-days

const christmas2022 = '2022-12-26'
const newYears2023 = '2023-01-02'
const mlkDay2023 = '2023-01-16'
const washingtonsBday2023 = '2023-02-20'
const cesarChavezDay2023 = '2023-03-31'
const memorialDay2023 = '2023-05-29'
const juneTeenth2023 = '2023-06-19'
const independenceDay2023 = '2023-07-04'
const laborDay2023 = '2023-09-04'
const veteransDay2023 = '2023-11-10'
const thanksgiving2023 = '2023-11-23'
const christmasDay2023 = '2023-12-25'

const holidaysArr = [
	christmas2022,
	newYears2023,
	mlkDay2023,
	washingtonsBday2023,
	cesarChavezDay2023,
	memorialDay2023,
	juneTeenth2023,
	independenceDay2023,
	laborDay2023,
	veteransDay2023,
	thanksgiving2023,
	christmasDay2023
]

moment.updateLocale('us', {
	holidays: holidaysArr,
	holidayFormat: 'YYYY-MM-DD'
})

const getPaymentDates = (deliveryDate, installmentsCount) => {
	if (!installmentsCount || installmentsCount < 1)
		throw new Error('installmentsCount must be greater than 0')
	if (!deliveryDate || !moment(deliveryDate).isValid())
		throw new Error('valid deliveryDate is required')

	let paymentDates = []

	for (let index = 0; index < installmentsCount; index++) {
		const sourceDate =
			index === 0 ? deliveryDate : paymentDates[paymentDates.length - 1]
		let newDate = moment(sourceDate).add(30, 'day')
		if (!newDate.isBusinessDay()) {
			//note, newDate.isBusinessDay() will be false if date is a weekend or a holiday
			const newDateFormatted = moment(newDate.nextBusinessDay()).format(
				'YYYY-MM-DD'
			)
			paymentDates.push(newDateFormatted)
		} else {
			const newDateFormatted = moment(newDate).format('YYYY-MM-DD')
			paymentDates.push(newDateFormatted)
		}
	}
	return paymentDates
}

app.listen(port, () => {
	const deliveryDate = '2022-11-26'
	const installmentsCount = 4
	const dates = getPaymentDates(deliveryDate, installmentsCount)
	console.log('deliveryDate: ', deliveryDate)
	console.log('installments count: ', installmentsCount)
	console.log('payment dates: ', dates)
})
