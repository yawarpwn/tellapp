const URL = 'https://dniruc.apisperu.com/api/v1/ruc/'
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0'
// https://dniruc.apisperu.com/api/v1/ruc/20131312955?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0

export function getRuc(ruc) {
  const query = `${URL}${ruc}?token=${TOKEN}`
  return fetch(query)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Fetching RUc Error')
      }
      return res.json()
    })
    .then((data) => data)
    .catch((err) => console.error(err))
}
