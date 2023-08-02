import { create } from "zustand";
import { quosData} from '../data/quotations'
import { getQuotations, addQuotation as addQuoDb, updateQuotation} from '../services/quotation'

function addQuotation(quotations, newQuotation) {
  addQuoDb(newQuotation)
  return [...quotations, createQuotation(newQuotation)]
}

function updateQuo(quotations, quoToUpdate) {
  updateQuotation(quoToUpdate)
  return quotations.map(quo => quo.id === quoToUpdate.id ? quoToUpdate : quo)
}

function createQuotation(quotationInfo) {
  const id = crypto.randomUUID()

  return {
    ...quotationInfo,
    id,
  }

}

export const useQuotationStore = create(set => ({
  quotations: [],
  fetch: async () => {
    const qs = await getQuotations()
    set({quotations: qs})
  },
  openCreateQuo: false,
  openPrintQuo: false,
  quoToEdit: null,
  togglePrintQuo: () => set(state => ({...state, openPrintQuo: !state.openPrintQuo})),
  updateQuoToEdit: (quoToEdit) => set(state => {
    return {...state, quoToEdit}
  }),
  closeCreateQuo: () => set(state => ({ ...state, openCreateQuo: false })),
  toggleCreateQuo: () => set(state => ({ ...state, openCreateQuo: !state.openCreateQuo })),
  updateQuo: (quoToUpate) => set(state => ({ ...state, quotations: updateQuo(state.quotations, quoToUpate)})) ,
  addQuotation: (newQuotation) => set(state => {
    return {
      quotations: addQuotation(state.quotations, newQuotation)
    }
  })
}))

