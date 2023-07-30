import { create } from "zustand";
import { quosData} from '../data/quotations'

function addQuotation(quotations, newQuotation) {
  return [...quotations, createQuotation(newQuotation)]
}

function updateQuo(quotations, quoToUpdate) {
  return quotations.map(quo => quo.id === quoToUpdate.id ? quoToUpdate : quo)
}

function createQuotation(quotationInfo) {
  const id = crypto.randomUUID()

  return {
    ...quotationInfo,
    id
  }

}


export const useQuotationStore = create(set => ({
  quotations: quosData,
  openCreateQuo: false,
  openPrintQuo: false,
  quoToEdit: null,
  togglePrintQuo: () => set(state => ({...state, openPrintQuo: !state.openPrintQuo})),
  updateQuoToEdit: (quoToEdit) => set(state => ({...state, quoToEdit})),
  closeCreateQuo: () => set(state => ({ ...state, openCreateQuo: false })),
  toggleCreateQuo: () => set(state => ({ ...state, openCreateQuo: !state.openCreateQuo })),
  updateQuo: (quoToUpate) => set(state => ({ ...state, quotations: updateQuo(state.quotations, quoToUpate)})) ,
  addQuotation: (newQuotation) => set(state => {
    return {
      quotations: addQuotation(state.quotations, newQuotation)
    }
  })
}))

