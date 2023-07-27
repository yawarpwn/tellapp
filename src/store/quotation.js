import { create } from "zustand";
import quotationsJson from '../data/quotations.json'

const addQuotation = (quotations, newQuotation) => {
  return [...quotations, createQuotation(newQuotation)]
}

const createQuotation = (quotationInfo) => {
  const id = crypto.randomUUID()

  return {
    ...quotationInfo,
    customerId: id
  }

}

// const addQuotation = (newQuotation, set) => {
//   return set(state => {
//     return {
//       quotations: [...state.quotations, createQuotation(newQuotation)],
//     }
//   })
// }


export const useQuotationStore = create(set => ({
  quotations: quotationsJson,
  addQuotation: (newQuotation) => set(state => {
    return {
      quotations: addQuotation(state.quotations, newQuotation)
    }
  })
}))

