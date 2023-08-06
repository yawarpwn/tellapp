import { useState, memo } from "react"
import { getRuc } from "../services/sunat"
import ItemsList from "./ItemsList"
import ModalCreateItem from "./ModalCreateItem"
import { updateQuotation, createQuotation } from "../services/supabase"
import { useRef } from "react"
import { useEffect } from "react"

function CreateQuotation({ quotations, quoToEdit, onClose }) {
  const getQuoNumber = () => {
    if (quotations.length <= 0) {
      return 4000
    }

    const numbers = quotations.map(quo => quo.quo_number)
    return Math.max(...numbers) + 1
  }

  const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()

    const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return formatedDate
  }

  const formatDate = (date) => {
    const currentDate = new Date(date)
    const year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()

    const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return formatedDate
  }
  const initialDate = quoToEdit?.date ? formatDate(quoToEdit.date) : getCurrentDate();
  const [company, setCompany] = useState(quoToEdit?.company || 'DESCONOCIDO')
  const [phone, setPhone] = useState(quoToEdit?.phone ?? '')
  const [date, setDate] = useState(initialDate)
  const [ruc, setRuc] = useState(quoToEdit?.ruc ?? '')
  const [address, setAddress] = useState(quoToEdit?.address ?? '')
  const [quoNumber, setQuoNumber] = useState(quoToEdit?.quo_number ?? getQuoNumber())
  const [deadline, setDeadline] = useState(quoToEdit?.deadline ?? 1)
  const [items, setItems] = useState(quoToEdit?.quotation_items ?? [])

  const  inputRucRef = useRef(null)


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
    onClose()
  }

  const handleSaveEdit = (editedProduct) => {
    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? { ...item, ...editedProduct } : item
    );
    setItems(updatedItems);
    setEditingItem(null); // Limpia el es

  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const quoData = {
      company,
      address,
      quo_number: quoNumber,
      date,
      ruc,
      phone,
      deadline,
      quotation_items: items,
    }
    if (quoToEdit) {
      const quo = {
        company,
        address,
        quo_number: quoNumber,
        phone,
        deadline,
        quotation_items: items
      }
      await updateQuotation(quo, quoToEdit.id)
      handleClose()
    } else {
      await createQuotation(quoData)
      handleClose()
    }
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
      getRuc(ruc)
        .then(res => res.json())
        .then(data => {
          setCompany(data.nombre_o_razon_social)
          setAddress(data.direccion_simple)
        })
        .catch(err => console.log(err))
    }

  }

  useEffect(() => {
    inputRucRef.current.focus()
  }, [])



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
        <form className="h-full  relative" onSubmit={handleSubmit}>
          <div className="wrapper overflow-y-auto h-[90%]  pt-4 pb-10 ">
            {/* Child */}
            <div className="mb-4">

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col relative col-span-1">
                  <label className="quotation-label">
                    Cotizacion No:
                  </label>
                  <input name="quoNumber"
                    type="number"
                    required
                    onChange={event => setQuoNumber(Number(event.target.value))}
                    value={quoNumber}
                    className="quotation-input"
                    placeholder="3099" />
                </div>

                <div className="flex flex-col relative col-span-1">
                  <label className="quotation-label">
                    Tiempo:
                  </label>
                  <input name="quoNumber"
                    type="number"
                    onChange={event => setDeadline(Number(event.target.value))}
                    value={deadline}
                    className="quotation-input"
                    placeholder="5" />
                </div>

                <div className="flex flex-col relative col-span-1">
                  <label className="quotation-label">
                    Fecha:
                  </label>
                  <input
                    name="date"
                    type="date"
                    required
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
                    onChange={ev => setCompany(ev.target.value)}
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
                    ref={inputRucRef}
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
            </div>
          </div>
          <div className="absolute  bottom-2 left-0 w-full flex justify-between h-16 p-2 bg-white">
            <button type="button" onClick={handleClose} className="bg-purple-500 text-white px-4 py-2 rounded-lg">cancel</button>
            <button
              type="button"
              className=' bg-gray-200 hover:opacity-80 px-4 py-2 items-center  justify-center rounded-lg'
              onClick={() => setOpenModal(!openModal)}
            >
              + Agregar
            </button>
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-lg" >{quoToEdit === null ? 'Guardar' : 'Actualizar'}</button>
          </div>
        </form>
        {openModal && (
          <ModalCreateItem
            onClose={handleCloseItemModal}
            addProduct={addProduct}
            editingItem={editingItem}
            onSaveEdit={handleSaveEdit}
          />
        )
        }
      </div>
    </aside>
  )
}

export default memo(CreateQuotation)
