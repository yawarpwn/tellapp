import { useState, useEffect } from "react"
import Button from '../atoms/Button'
import { getRuc } from "../services/sunat"
import ItemsList from "./ItemsList"
import EditQuotationItem from "./EditQuotationItem"
import { updateQuotation, createQuotation } from "../services/supabase"
import { useRef } from "react"
import Input from "../atoms/Input"
import { XIcon } from "../icons"
import { getCurrentDate, getQuoNumber, formatDate } from "../utils"

function CreateQuotation({ quotations, quoToEdit, onClose }) {

  const initialDate = quoToEdit?.date ? formatDate(quoToEdit.date) : getCurrentDate();
  const [company, setCompany] = useState(quoToEdit?.company || 'SIN RUC PROPORCIONADO')
  const [phone, setPhone] = useState(quoToEdit?.phone ?? '')
  const [date, setDate] = useState(initialDate)
  const [ruc, setRuc] = useState(quoToEdit?.ruc ?? '')
  const [address, setAddress] = useState(quoToEdit?.address ?? '')
  const [quoNumber, setQuoNumber] = useState(quoToEdit?.quo_number ?? getQuoNumber(quotations))
  const [deadline, setDeadline] = useState(quoToEdit?.deadline ?? 1)
  const [items, setItems] = useState(quoToEdit?.quotation_items ?? [])

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
    setEditingItem(null);

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
        .then(data => {
          setCompany(data.razonSocial)
          setAddress(data.direccion)
        })
    }

  }

  useEffect(() => {
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])



  return (
    <aside
      onMouseDown={e => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
      className="fixed z-50 top-0 left-0 right-0 flex items-center justify-center bottom-0 bg-[#000005be] p-2 ">
      <section className="m-1 shadow-lg bg-content1 relative">
        <form className="relative" onSubmit={handleSubmit}>
          <div className="wrapper overflow-y-auto p-4 ">
            {/* Child */}
            <button
              onClick={handleClose}
              className="absolute top-1 rounded-full p-2 appearance-none right-1 hover:bg-foreground-200">
              <XIcon />
            </button>
            <header className="flex flex-initial font-bold">
              <h2>
                {editingItem ? 'Editar' : 'Crear'}
              </h2>
            </header>

            {/* Child */}
            <div className="flex w-full flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label='No'
                  name="quoNumber"
                  type="number"
                  required
                  onChange={event => setQuoNumber(Number(event.target.value))}
                  value={quoNumber}
                  placeholder="3099" />

                <Input
                  label='Entrega'
                  type="number"
                  onChange={event => setDeadline(Number(event.target.value))}
                  value={deadline}
                  placeholder="5"
                />

                <Input
                  label='Fecha'
                  name="date"
                  type="date"
                  required
                  onChange={event => setDate(event.target.value)}
                  value={date}
                  placeholder="20/08/2023" />
              </div>

              <Input
                name="company"
                required
                label={'Cliente'}
                value={company}
                onChange={ev => setCompany(ev.target.value)}
                placeholder="Proquinsa Quimicos Industriales S.A.C."
              />

              <Input
                label='Dirección'
                name="address"
                value={address}
                disabled
                type="text"
                placeholder="Av. El Santuario 323 - SJL"

              />

              <Input
                autoFocus
                label='Ruc'
                name="ruc"
                type="number"
                onChange={event => setRuc(event.target.value)}
                onBlur={handleBlur}
                value={ruc}
                maxLength={11}
                minLength={11}
                placeholder="20610555536"
              />
              <div className="flex gap-x-2">
                <Input
                  label='Teléfono'
                  name="phone"
                  type="tel"
                  onChange={event => setPhone(event.target.value)}
                  maxLength={9}
                  minLength={9}
                  value={phone}
                  placeholder="971 531 018"
                />
                <label>
                  <select
                    required
                    className="bg-transparent"
                    value={'danger'}
                  >
                    <option value='success'>Seguro</option>
                    <option value='warning'>Probable</option>
                    <option value='danger'>Difícil</option>
                  </select>
                </label>
              </div>


            </div>
            <ItemsList items={items} onRemove={removeProduct} onClose={handleCloseItemModal} onOpen={handleEditingItem} />
            <footer className="flex gap-2 px-6 py-4 justify-between">
              <Button color='danger' type="button" onClick={handleClose}>cancel</Button>
              <Button
                type="button"
                color='secondary'
                onClick={() => setOpenModal(!openModal)}
              >
                + Agregar
              </Button>
              <Button type="submit" >{quoToEdit === null ? 'Guardar' : 'Actualizar'}</Button>
            </footer>

          </div>
        </form>
        {openModal && (
          <EditQuotationItem
            onClose={handleCloseItemModal}
            addProduct={addProduct}
            editingItem={editingItem}
            onSaveEdit={handleSaveEdit}
          />
        )
        }
      </section>
    </aside>
  )
}

export default CreateQuotation
