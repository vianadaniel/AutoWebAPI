import moment from 'moment'

export const subtractThreeHours = (date: Date) => {
  if (date) return moment(date).subtract(3, 'hours').toDate()
}
