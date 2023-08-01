import { useState, useRef } from "react"
import { useQuotationStore } from "../store/quotation"
import TrashIcon from '../icons/TrashIcon'
import { falseFetch } from "../utils/false-fetch"

export function CreateQuotation() {
  const store = useQuotationStore()

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
  const [address, setAddress] = useState(store.quoToEdit?.address ?? '')
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
      address,
      quoNumber,
      date,
      ruc,
      items
    }
    if (store.quoToEdit) {
      console.log('quo update....')
      store.updateQuo({ ...store.quoToEdit, company, address, quoNumber, date, ruc, items })
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
    const type = event.target.getAttribute('type')
    const { name, value } = event.target
    const newItems = [...items]
    if (type === 'number') {
      newItems[index][name] = Number(value)
    } else {
      newItems[index][name] = value
    }
    setItems(newItems)
  }

  const handleBlur = () => {
    if (ruc.length === 11) {
      console.log('true')
      falseFetch()
        .then(data => {
          setCompany(data.nombre_o_razon_social)
          setAddress(data.direccion_simple)
        })
    }

    console.log(ruc.length)
    console.log('false')

  }


  return (
    <aside
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
      className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#000005be] ">
      <div className="h-screen relative  max-w-sm bg-white p-2">
        <form className="h-full" onSubmit={handleSubmit}>
          <div className="wrapper overflow-y-auto h-full pt-4 pb-20  border-black  ">
            {/* Child */}
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col relative col-span-1">
                  <label className="quotation-label">
                    Cotizacion No:
                  </label>
                  <input name="quoNumber"
                    type="number"
                    onChange={event => setQuoNumber(Number(event.target.value))}
                    value={quoNumber}
                    className="quotation-input"
                    placeholder="3099" />
                </div>

                <div className="flex flex-col relative col-span-1">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col relative col-span-2">
                  <label className="quotation-label">Nombre o Razón social: </label>
                  <input
                    name="company"
                    value={company}
                    disabled
                    className="quotation-input"
                    placeholder="Proquinsa Quimicos Industriales S.A.C." />
                </div>
                <div className="flex flex-col relative col-span-2">
                  <label className="quotation-label">Dirección: </label>
                  <input
                    name="address"
                    value={address}
                    disabled
                    type="text"
                    className="quotation-input"
                    placeholder="Av. El Santuario 323 - SJL" />
                </div>
                <div className="flex flex-col relative col-span-1">
                  <label className="quotation-label">
                    Ruc:
                  </label>
                  <input
                    name="ruc"
                    type="text"
                    onChange={event => setRuc(event.target.value)}
                    onBlur={handleBlur}
                    value={ruc}
                    maxLength={11}
                    minLength={11}
                    className="quotation-input"
                    placeholder="20610555536"
                  />
                </div>

                <div className="flex flex-col relative col-span-1">
                  <label className="quotation-label">
                    Tel:
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    onChange={event => setPhone(Number(event.target.value))}
                    maxLength={9}
                    minLength={9}
                    value={phone}
                    className="quotation-input"
                    placeholder="971 531 018" />
                </div>
              </div>
            </div>


            {/* Item List */}
            <div className="w-full flex flex-col gap-y-6 mt-4 ">
              <div className="flex justify-between">
                <span>Item</span>
                <span>Size</span>
                <span>Precio</span>
                <span>Qty</span>
                <span>Total</span>
              </div>
              {
                items.map((item, index) => {
                  return (
                    <div key={item.id} className="border-l-[4px] border-l-purple-500">
                      <div className="pl-2">
                        <div className="flex  items-center gap-x-4">
                          <div className="flex flex-col relative mb-4">
                            <input
                              name="desc" value={item.desc}
                              required
                              onChange={(event) => handleChange(event, index)}
                              className="quotation-input"
                              placeholder="Señal fotoluminiscente con soporte pvc celtex 3mm" />
                          </div>
                          <div className="flex flex-col relative ">
                            <input
                              name="rate"
                              value={item.rate}
                              required
                              step='0.5'
                              onChange={(event) => handleChange(event, index)}
                              type="number"
                              className="quotation-input w-16"
                              placeholder="20" />
                          </div>
                          <div className="flex flex-col  relative">
                            <input
                              name="qty"
                              type="number"
                              required
                              onChange={(event) => handleChange(event, index)}
                              value={item.qty}
                              className="quotation-input w-16"
                              placeholder="20" />
                          </div>

                          <div className="flex flex-col relative ">
                            <input
                              required
                              name="size"
                              type="text"
                              onChange={(event) => handleChange(event, index)}
                              value={item.size} className="quotation-input w-24"
                              placeholder="60x60cm" />
                          </div>
                        </div>
                      </div>
                    </div>

                  )
                })
              }

              <button
                className=' bg-gray-200  hover:opacity-80 mx-auto py-2 items-center  justify-center rounded-xl  w-full mt-6'
                onClick={addProduct}
              >Agregar producto</button>
              <div className=' flex  justify-between'>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-4 absolute bottom-0 right-0 h-20 left-0 px-4 bg-white">
            <button onClick={handleClose} className="bg-purple-500 text-white px-4 py-2 rounded-lg">cancel</button>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg" >{store.quoToEdit === null ? 'Guardar' : 'Actualizar'}</button>
          </div>
        </form>
      </div>
    </aside>
  )
}
