const express = require('express')
const app = express()
const port = 3005
var moment = require('moment-business-days') //https://github.com/kalmecak/moment-business-days

const holidaysArr = [
	'2022-12-26',
	'2023-01-02',
	'2023-01-16',
	'2023-02-20',
	'2023-05-29',
	'2023-06-19',
	'2023-07-04',
	'2023-09-04',
	'2023-10-09',
	'2023-11-10',
	'2023-11-23',
	'2023-12-25',
	'2024-01-01',
	'2024-01-15',
	'2024-02-19',
	'2024-05-27',
	'2024-06-19',
	'2024-07-04',
	'2024-09-02',
	'2024-10-14',
	'2024-11-11',
	'2024-11-28',
	'2024-12-25',
	'2025-01-01',
	'2025-01-20',
	'2025-02-17',
	'2025-05-26',
	'2025-06-19',
	'2025-07-04',
	'2025-09-01',
	'2025-10-13',
	'2025-11-11',
	'2025-11-27',
	'2025-12-25',
	'2026-01-01',
	'2026-01-19',
	'2026-02-16',
	'2026-05-25',
	'2026-06-19',
	'2026-07-03',
	'2026-09-07',
	'2026-10-12',
	'2026-11-11',
	'2026-11-26',
	'2026-12-25'
]

moment.updateLocale('us', {
	holidays: holidaysArr,
	holidayFormat: 'YYYY-MM-DD'
})

const getPaymentDatesWithLateDate = (deliveryDate, installmentsCount) => {
	if (!installmentsCount || installmentsCount < 1)
		throw new Error('installmentsCount must be greater than 0')
	if (!deliveryDate || !moment(deliveryDate).isValid())
		throw new Error('valid deliveryDate is required')

	let paymentDates = []

	for (let index = 0; index < installmentsCount; index++) {
		const sourceDate =
			index === 0
				? deliveryDate
				: paymentDates[paymentDates.length - 1].paymentDate
		let newDate = moment(sourceDate).add(30, 'day')
		const newDateMonth = moment(newDate).month()
		const sourceDateMonth = moment(sourceDate).month()
		if (newDateMonth === sourceDateMonth) {
			//move newDate to first of next month
			const firstOfNextMonth = moment(newDate).add(1, 'M').startOf('month')
			newDate = firstOfNextMonth
		}

		const newDateFormatted = moment(newDate).format('YYYY-MM-DD')

		if (!newDate.isBusinessDay()) {
			//note, newDate.isBusinessDay() will be false if date is a weekend or a holiday
			const lateAfterDate = moment(newDate.nextBusinessDay()).format(
				'YYYY-MM-DD'
			)
			paymentDates.push({ paymentDate: newDateFormatted, lateAfterDate })
		} else {
			const lateAfterDate = moment(newDate).format('YYYY-MM-DD')
			paymentDates.push({ paymentDate: newDateFormatted, lateAfterDate })
		}
	}
	return paymentDates
}

app.listen(port, () => {
	const deliveryDate = '2023-03-06'
	const installmentsCount = 20
	const dates = getPaymentDatesWithLateDate(deliveryDate, installmentsCount)
	console.log('deliveryDate: ', deliveryDate)
	console.log('installments count: ', installmentsCount)
	console.log('payment dates: ', dates)
})
