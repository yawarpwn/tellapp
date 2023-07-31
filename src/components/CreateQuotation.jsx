import { useState, useRef } from "react"
import { useQuotationStore } from "../store/quotation"
import TrashIcon from '../icons/TrashIcon'

export function CreateQuotation() {
  const store = useQuotationStore()
  console.log('quoToEdit', store.quoToEdit)

  const getQuoNumber = () => {
    const lastQuo = store.quotations.at(-1)
    return lastQuo.quoNumber + 1
  }

  const getCurrentDay = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()

    const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return formatedDate
  }


  const [company, setCompany] = useState(store.quoToEdit?.company ?? '')
  const [phone, setPhone] = useState(store.quoToEdit?.phone ?? '')
  const [date, setDate] = useState(store.quoToEdit?.date ?? getCurrentDay())
  const [ruc, setRuc] = useState(store.quoToEdit?.ruc ?? '')
  const [email, setEmail] = useState(store.quoToEdit?.email ?? '')
  const [quoNumber, setQuoNumber] = useState(store.quoToEdit?.quoNumber ?? getQuoNumber())
  const [items, setItems] = useState(store.quoToEdit?.items ?? [])

  const handleClose = () => {
    store.updateQuoToEdit(null)
    store.closeCreateQuo()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const quoData = {
      company,
      email,
      quoNumber,
      date,
      ruc,
      items
    }
    if (store.quoToEdit) {
      console.log('quo update....')
      store.updateQuo({ ...store.quoToEdit, company, email, quoNumber, date, ruc, items })
    } else {
      console.log('quo create...')
      store.addQuotation(quoData)
    }
    handleClose()

  }


  const addProduct = () => {
    setItems(prev => ([
      ...prev, {
        id: crypto.randomUUID(),
        no: 1,
        qty: 1,
        desc: '',
        size: 'und',
        rate: 10
      }
    ]))
  }

  const removeProduct = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleChange = (event, index) => {
    const { name, value } = event.target
    const newItems = [...items]
    newItems[index][name] = value
    setItems(newItems)
  }


  return (
    <aside
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
      className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#000005be] ">
      <div className="h-screen w-full border md:w-[768px] bg-white p-4">
        <form className="" onSubmit={handleSubmit}>
          <div className="h-[700px] overflow-y-auto">
            {/* Child */}
            <div>
              <h2 className="text-purple-500">Cotizacion</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col col-span-1">
                  <label className="quotation-label">
                    Cotizacion No:
                  </label>
                  <input name="quoNumber"
                    type="number"
                    onChange={event => setQuoNumber(event.target.value)}
                    value={quoNumber}
                    className="quotation-input"
                    placeholder="3099" />
                </div>

                <div className="flex flex-col col-span-1">
                  <label className="quotation-label">
                    Fecha:
                  </label>
                  <input
                    name="date"
                    type="date"
                    onChange={event => setDate(event.target.value)}
                    value={date}
                    className="quotation-input"
                    placeholder="20/08/2023" />
                </div>
              </div>
            </div>

            {/* Child */}
            <div>
              <h2 className="text-purple-500">Customer</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col col-span-2">
                  <label className="quotation-label">Cliente: </label>
                  <input
                    name="company"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                    className="quotation-input"
                    placeholder="Proquinsa Quimicos Industriales S.A.C." />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="quotation-label">Dirección: </label>
                  <input
                    name="address" value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="email"
                    className="quotation-input"
                    placeholder="Av. El Santuario 323 - SJL" />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className="quotation-label">
                    Ruc:
                  </label>
                  <input
                    name="ruc"
                    type="number"
                    onChange={event => setRuc(event.target.value)}
                    value={ruc}
                    maxLength={11}
                    minLength={11}
                    className="quotation-input"
                    placeholder="20610555536"
                  />
                </div>

                <div className="flex flex-col col-span-1">
                  <label className="quotation-label">
                    Tel:
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    onChange={event => setPhone(event.target.value)}
                    maxLength={9}
                    minLength={9}
                    value={phone}
                    className="quotation-input"
                    placeholder="971 531 018" />
                </div>
              </div>
            </div>

            {/* Item List */}
            <div>
              {
                 items.map((item, index) => {
                  return (
                    <div key={item.id} className="grid grid-cols-5 gap-2">
                      <div className="flex flex-col col-span-5">
                        <label className="quotation-label">Producto: </label>
                        <input
                          name="desc" value={item.desc}
                          required
                          onChange={(event) => handleChange(event, index)}
                          className="quotation-input"
                          placeholder="Señal fotoluminiscente con soporte pvc celtex 3mm" />
                      </div>
                      <div className="flex flex-col col-span-1">
                        <span className="quotation-label">Item </span>
                        <span>{index + 1}</span>
                      </div>
                      <div className="flex flex-col col-span-1">
                        <label className="quotation-label">Precio </label>
                        <input
                          name="rate" 
                          value={item.rate}
                          required
                          step='0.5'
                          onChange={(event) => handleChange(event, index)}
                          type="number"
                          className="quotation-input"
                          placeholder="20" />
                      </div>
                      <div className="flex flex-col col-span-1">
                        <label className="quotation-label">
                          Cantidad</label>
                        <input
                          name="qty"
                          type="number"
                          required
                          onChange={(event) => handleChange(event, index)}
                          value={item.qty}
                          className="quotation-input"
                          placeholder="20" />
                      </div>

                      <div className="flex flex-col col-span-1">
                        <label className="quotation-label">Medida</label>
                        <input
                          required
                          name="size"
                          type="text"
                          onChange={(event) => handleChange(event, index)}
                          value={item.size} className="quotation-input"
                          placeholder="60x60cm" />
                      </div>
                      <div className="flex flex-col col-span-1">
                        <button onClick={() => removeProduct(item.id)}><TrashIcon /></button>
                      </div>
                    </div>

                  )
                })
              }
              <h2 className="text-purple-500">Items list</h2>

              <button
                className=' bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl  w-full mt-6'
                onClick={addProduct}
              >Agregar producto</button>
              <div className=' flex  justify-between'>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 mt-10 fixed bottom-0 left-0 w-full max-w-[768px] bg-white px-4 py-4 shadow-md">
            <button onClick={handleClose} className="bg-purple-500 text-white px-4 py-2 rounded-lg">cancel</button>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg" >{store.quoToEdit === null ? 'Guardar' : 'Actualizar'}</button>
          </div>
        </form>
      </div>
    </aside>
  )
}
