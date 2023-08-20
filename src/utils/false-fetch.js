import rucApi from '../data/ruc-api.json'

export function falseFetch() {
  return new Promise((resolve, reject) => {
    if (rucApi) {
      setTimeout(() => {
        resolve(rucApi)
      }, 2000)
    } else {
      reject({
        error: 'Failed to fetch',
      })
    }
  })
}
