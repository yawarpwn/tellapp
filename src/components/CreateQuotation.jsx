import { useState } from "react"
import { useQuotationStore } from "../store/quotation"

export function CreateQuotation() {
  const store = useQuotationStore()
  const [quotationData, setQuotationData] = useState(store.quoToEdit || {
    customerName: '',
    customerAddress: '',
    customerRuc: '',
    customerPhone: ''
  })


  const handleClose = () => {
    store.updateQuoToEdit(null)
    store.closeCreateQuo()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    //is Edit
    if (store.quoToEdit) {
      store.updateQuo(quotationData)
    } else {
      console.log('create quo')
      store.addQuotation(quotationData)
    }
    handleClose()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setQuotationData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <aside 
      onClick={e => {
      if (e.target !== e.currentTarget) {
        return
      }
      handleClose()
    }} 
      className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#000005be] ">
      <div className="h-screen w-full border md:w-[768px] bg-white p-4">
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col col-span-2">
              <label className="quotation-label">Cliente: </label>
              <input name="customerName" value={quotationData.customerName} onChange={handleChange} className="quotation-input" placeholder="Proquinsa Quimicos Industriales S.A.C." />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="quotation-label">Dirección: </label>
              <input name="customerAddress" value={quotationData.customerAddress} onChange={handleChange} type="text" className="quotation-input" placeholder="Av. El Santuario 323 - SJL" />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="quotation-label">
                Ruc:
              </label>
              <input name="customerRuc" type="text" onChange={handleChange} value={quotationData.customerRuc} maxLength={11} minLength={11} className="quotation-input" placeholder="20610555536" />
            </div>

            <div className="flex flex-col col-span-1">
              <label className="quotation-label">
                Tel:
              </label>
              <input name="customerPhone" type="tel" onChange={handleChange} maxLength={9} minLength={9} value={quotationData.customerPhone} className="quotation-input" placeholder="971 531 018" />
            </div>

          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <button onClick={handleClose} className="bg-purple-500 text-white px-4 py-2 rounded-lg">cancel</button>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg" >{store.quoToEdit === null ? 'Guardar' : 'Actualizar'}</button>
          </div>
        </form>
      </div>
    </aside>
  )
}
