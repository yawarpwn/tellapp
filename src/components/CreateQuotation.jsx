import { useQuotationStore } from "../store/quotation"
export function CreateQuotation({ onClose }) {
  const { addQuotation } = useQuotationStore()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { customerName, customerPhone, customerAddress, customerRuc } = Object.fromEntries(formData.entries())

    const data = {
      customerName,
      customerPhone,
      customerAddress,
      customerRuc
    }

    addQuotation(data)
    onClose()

  }

  return (
    <aside onClick={e => {
      if(e.target === e.currentTarget) {
        onClose()
      }
    }} className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#000005be] onClick= ">
      <div className="h-screen w-full border md:w-[768px] bg-white p-4">
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col col-span-2">
              <label className="quotation-label">Cliente: </label>
              <input name="customerName" className="quotation-input" placeholder="Proquinsa Quimicos Industriales S.A.C." />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="quotation-label">Dirección: </label>
              <input name="customerAddress" type="text" className="quotation-input" placeholder="Av. El Santuario 323 - SJL" />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="quotation-label">
                Ruc:
              </label>
              <input name="customerRuc" type="text" maxLength={11} minLength={11} className="quotation-input" placeholder="20610555536" />
            </div>

            <div className="flex flex-col col-span-1">
              <label className="quotation-label">
                Tel:
              </label>
              <input name="customerPhone" type="tel" maxLength={9} minLength={9} className="quotation-input" placeholder="971 531 018" />
            </div>

          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <button onClick={onClose} className="bg-purple-500 text-white px-4 py-2 rounded-lg">cancel</button>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg" >Guardar</button>
          </div>
        </form>
      </div>
    </aside>
  )
}
