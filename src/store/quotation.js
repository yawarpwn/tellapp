import { create } from 'zustand'
import { getQuotations } from '../services/supabase'

export const useQuotationStore = create((set) => ({
  quotations: [],
  fetch: async () => {
    const qs = await getQuotations()
    set({ quotations: qs })
  },
  setQuotations: (quos) => set(() => ({ quotations: quos })),
  openCreateQuo: false,
  openPrintQuo: false,
  quoToEdit: null,
  togglePrintQuo: () =>
    set((state) => ({ ...state, openPrintQuo: !state.openPrintQuo })),
  updateQuoToEdit: (quoToEdit) =>
    set((state) => {
      return { ...state, quoToEdit }
    }),
  closeCreateQuo: () => set((state) => ({ ...state, openCreateQuo: false })),
  toggleCreateQuo: () =>
    set((state) => ({ ...state, openCreateQuo: !state.openCreateQuo })),
}))
