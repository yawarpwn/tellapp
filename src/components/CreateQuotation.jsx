import { useState, memo } from "react"
import { useQuotationStore } from "../store/quotation"
import { falseFetch } from "../utils/false-fetch"
import { getRuc } from "../services/sunat"
import ItemsList from "./ItemsList"
import ModalCreateItem from "./ModalCreateItem"

function CreateQuotation() {
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

  //Editing logic
  const [editingItem, setEditingItem] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const handleEditingItem = (item) => {
    setOpenModal(true)
    setEditingItem(item)
  }

  const handleCloseItemModal = () => {
    setOpenModal(false)
    setEditingItem(null)
  }


  const handleClose = () => {
    store.closeCreateQuo()
  }

  const handleoSaveEdit = (editedProduct) => {
    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? { ...item, ...editedProduct } : item
    );
    setItems(updatedItems);
    setEditingItem(null); // Limpia el es

  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const quoData = {
      company,
      address,
      quoNumber,
      date,
      ruc,
      items,
      phone
    }
    if (store.quoToEdit) {
      store.updateQuo({ ...store.quoToEdit, company, address, quoNumber, date, phone, ruc, items })
    } else {
      store.addQuotation(quoData)
    }
    handleClose()

  }


  const addProduct = (product) => {
    setItems(prev => ([
      ...prev, {
        id: crypto.randomUUID(),
        ...product
      }
    ]))
  }

  const removeProduct = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }


  const handleBlur = () => {
    if (ruc.length === 11) {
      // getRuc(ruc)
      // .then(res => res.json())
      // .then(data => {
      //     setCompany(data.nombre_o_razon_social)
      //     setAddress(data.direccion_simple)
      //   })
      // .catch(err => console.log(err))

      falseFetch()
        .then(data => {
          setCompany(data.nombre_o_razon_social)
          setAddress(data.direccion_simple)
        })
    }

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
      <div className="h-screen relative  max-w-sm bg-white p-2">
        <form className="h-full" onSubmit={handleSubmit}>
          <div className="wrapper overflow-y-auto  pt-4 pb-10  border-black  ">
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
                    type="number"
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
                    onChange={event => setPhone(event.target.value)}
                    maxLength={9}
                    minLength={9}
                    value={phone}
                    className="quotation-input"
                    placeholder="971 531 018" />
                </div>
              </div>
            </div>


            <div className="w-full flex flex-col gap-y-6 mt-4 ">
              <ItemsList items={items} onRemove={removeProduct} onClose={handleCloseItemModal} onOpen={handleEditingItem} />
              <button
                type="button"
                className=' bg-gray-200 hover:opacity-80 mx-auto py-2 items-center  justify-center rounded-xl  w-full mt-6'
                onClick={() => setOpenModal(!openModal)}
              >
                + Agregar producto
              </button>
            </div>
          </div>
          <div className="flex justify-between h-10  px-4 bg-white">
            <button type="button" onClick={handleClose} className="bg-purple-500 text-white px-4 py-2 rounded-lg">cancel</button>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg" >{store.quoToEdit === null ? 'Guardar' : 'Actualizar'}</button>
          </div>
        </form>
        {openModal && (
          <ModalCreateItem
            onClose={handleCloseItemModal}
            addProduct={addProduct}
            editingItem={editingItem}
            onSaveEdit={handleoSaveEdit}
          />
        )
        }
      </div>
    </aside>
  )
}

export default memo(CreateQuotation)
