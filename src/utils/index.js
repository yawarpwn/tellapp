export * from './numbers'
export const formatDate = (date) => {
  const currentDate = new Date(date)
  const year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let day = currentDate.getDate()

  const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(
    day
  ).padStart(2, '0')}`
  return formatedDate
}
export const getCurrentDate = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let day = currentDate.getDate()

  const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(
    day
  ).padStart(2, '0')}`
  return formatedDate
}

export const getQuoNumber = (quotations) => {
  if (quotations.length <= 0) {
    return 0
  }

  const numbers = quotations.map((quo) => quo.quo_number)
  return Math.max(...numbers) + 1
}

export const filterUniqueCompany = (arr) => {
  const objArr = arr.reduce((acc, obj) => {
    const ruc = obj.ruc
    if (ruc) {
      acc[ruc] = {
        company: obj.company,
        ruc,
        address: obj.address,
      }
    }
    return acc
  }, {})

  return Object.values(objArr)
}
