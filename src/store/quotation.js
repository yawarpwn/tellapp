import { create } from "zustand";
import { getQuotations } from '../services/supabase'

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
    id,
  }

}

const mappedQuos =(quos) => {
  return quos.map(quo => ({
    quoNumber: quo.quo_number,
    address: quo.address,
    company: quo.company,
    date: quo.date,
    deadline: quo.deadline,
    email: quo.email,
    id: quo.id,
    phone: quo.phone,
    items: quo.quotation_items.map(item => ({
      id: item.id,
      desc: item.description,
      rate: item.price,
      size: item.unit_size,
      qty: item.qty
    }))
  }))
}

export const useQuotationStore = create(set => ({
  quotations: [],
  fetch: async () => {
    const qs = await getQuotations()
    set({quotations: qs})
  },
  setQuotations: (quos => set(() => ({quotations: mappedQuos(quos)}))),
  openCreateQuo: false,
  openPrintQuo: false,
  quoToEdit: null,
  togglePrintQuo: () => set(state => ({...state, openPrintQuo: !state.openPrintQuo})),
  updateQuoToEdit: (quoToEdit) => set(state => {
    return {...state, quoToEdit}
  }),
  closeCreateQuo: () => set(state => ({ ...state, openCreateQuo: false })),
  toggleCreateQuo: () => set(state => ({ ...state, openCreateQuo: !state.openCreateQuo })),
  // updateQuo: (quoToUpate) => set(state => ({ ...state, quotations: updateQuo(state.quotations, quoToUpate)})) ,
  // addQuotation: (newQuotation) => set(state => {
  //   return {
  //     quotations: addQuotation(state.quotations, newQuotation)
  //   }
  // })
}))

