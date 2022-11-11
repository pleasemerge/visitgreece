export const getMonthLocalString = (date: Date) : string => {
  return date.toLocaleString('default', { month: 'long' })
}
