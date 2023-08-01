export function getIgv(arraOfNumbers) {

  const calcTotal = arraOfNumbers.reduce((acc, curr) => {
    const result = acc += (curr.rate * curr.qty)
    return result
  }, 0)

  const total = calcTotal.toFixed(2)
  const subTotal = (total / 1.18).toFixed(2)
  const igv = (subTotal * 0.18).toFixed(2)

  return {
    total,
    subTotal,
    igv
  }
}

