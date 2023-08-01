// curl --request POST \
//      --url https://api.migo.pe/api/v1/ruc \
//      --header 'accept: application/json' \
//      --header 'content-type: application/json' \
//      --data '
// {
//   "token": "RhQ2OpxoRy6XvqT5UzVptO9mabJe13PSKdCgU3p85KkQ3zPWx87k7kz2A07N",
//   "ruc": "20610555536"
// }

export function getRuc(ruc) {
  const postData = {
    token: "RhQ2OpxoRy6XvqT5UzVptO9mabJe13PSKdCgU3p85KkQ3zPWx87k7kz2A07N",
    ruc,
  };
  return fetch(`https://api.migo.pe/api/v1/ruc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(postData)
  })
}
