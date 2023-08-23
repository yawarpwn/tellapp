import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import { XIcon } from '../icons'
import { getRuc } from '../services/sunat'
import { insertQuotation, updateQuotation } from '../services/supabase'
import { formatDate, getCurrentDate, getQuoNumber } from '../utils'
import EditQuotationItem from './EditQuotationItem'
import ItemsList from './ItemsList'

function CreateQuotation({ quotations, quoToEdit, onClose }) {
  const [editingItem, setEditingItem] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const initialQuo = quoToEdit || {
    company: 'SIN RUC PROPORCIONADO',
    phone: '',
    date: getCurrentDate(),
    ruc: '',
    address: '',
    quo_number: getQuoNumber(quotations),
    deadline: 1,
    quotation_items: [],
    viability: 'Difficult',
  }
  const [quoState, setQuoState] = useState(initialQuo)

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
    const updatedItems = quoState.quotation_items.map((item) =>
      item.id === editingItem.id ? { ...item, ...editedProduct } : item,
    )
    setQuoState((prev) => ({ ...prev, quotation_items: updatedItems }))
    setEditingItem(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(quoState.quotation_items.length === 0) {
      return
    }

    if (quoToEdit) {
      const quo = {
        ...quoState,
      }
      await updateQuotation({ quoToUpdate: quo, id: quoToEdit.id })
      handleClose()
    } else {
      await insertQuotation({ quoToInsert: quoState })
      handleClose()
    }
  }

  const addProduct = (product) => {
    setQuoState((prev) => ({
      ...prev,
      quotation_items: [...prev.quotation_items, product],
    }))
  }

  const removeProduct = (id) => {
    setQuoState((prev) => ({
      ...prev,
      quotation_items: quoState.quotation_items.filter((x) => x.id !== id),
    }))
  }

  const handleBlur = () => {
    if (quoState?.ruc.length === 11) {
      getRuc(quoState?.ruc).then((data) =>
        setQuoState((prev) => ({
          ...prev,
          company: data.razonSocial,
          address: data.direccion,
        })),
      )
    }
  }

  useEffect(() => {
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <div
      tabIndex={-1}
      className="border"
    >
      <div className="fixed w-screen h-screen inset-0 bg-[rgba(0,0,0,.5)] backdrop-blur-sm z-50"></div>
      <div
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            handleClose()
          }
        }}
        className=" w-screen h-[100dvh] z-50 inset-0 flex items-center justify-center overflow-x-auto p-1 fixed"
      >
        <section className="relative max-w-md w-full h-full rounded-lg shadow-lg bg-content1  overflow-y-auto">
          <form
            className="px-2 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {/* Child */}
            <button
              onClick={handleClose}
              className="absolute top-1 rounded-full p-2 appearance-none right-1 hover:bg-foreground-200"
            >
              <XIcon />
            </button>
            <header className="flex flex-initial font-bold">
              <h2>{editingItem ? 'Editar' : 'Crear'}</h2>
            </header>

            {/* Child */}
            <div className="flex w-full flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="No"
                  name="quoNumber"
                  type="number"
                  required
                  onChange={(event) =>
                    setQuoState((prev) => ({
                      ...prev,
                      quo_number: Number(event.target.value),
                    }))
                  }
                  value={quoState.quo_number}
                  placeholder="3099"
                />

                <Input
                  label="Entrega"
                  type="number"
                  onChange={(event) =>
                    setQuoState((prev) => ({
                      ...prev,
                      deadline: Number(event.target.value),
                    }))
                  }
                  value={quoState.deadline}
                  placeholder="5"
                />

                <Input
                  label="Fecha"
                  name="date"
                  type="date"
                  required
                  onChange={(event) =>
                    setQuoState((prev) => ({
                      ...prev,
                      date: event.target.value,
                    }))
                  }
                  value={formatDate(quoState.date)}
                  placeholder="20/08/2023"
                />
              </div>

              <Input
                name="company"
                required
                label={'Cliente'}
                value={quoState.company}
                onChange={(event) =>
                  setQuoState((prev) => ({
                    ...prev,
                    company: event.target.value,
                  }))
                }
                placeholder="Proquinsa Quimicos Industriales S.A.C."
              />

              <Input
                label="Dirección"
                name="address"
                value={quoState.address}
                onChange={(event) =>
                  setQuoState((prev) => ({
                    ...prev,
                    address: event.target.value,
                  }))
                }
                disabled
                type="text"
                placeholder="Av. El Santuario 323 - SJL"
              />

              <Input
                autoFocus
                label="Ruc"
                name="ruc"
                type="number"
                onChange={(event) =>
                  setQuoState((prev) => ({ ...prev, ruc: event.target.value }))
                }
                onBlur={handleBlur}
                value={quoState.ruc}
                maxLength={11}
                minLength={11}
                placeholder="20610555536"
              />
              <div className="flex gap-x-2">
                <Input
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  onChange={(event) =>
                    setQuoState((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                  maxLength={9}
                  minLength={9}
                  value={quoState.phone}
                  placeholder="971 531 018"
                />
                <label>
                  <select
                    required
                    className="bg-transparent"
                    value={quoState.viability}
                    onChange={(event) =>
                      setQuoState((prev) => ({
                        ...prev,
                        viability: event.target.value,
                      }))
                    }
                  >
                    <option value="Safe">Seguro</option>
                    <option value="Possible">Probable</option>
                    <option value="Difficult">Difícil</option>
                  </select>
                </label>
              </div>
            </div>
            <ItemsList
              items={quoState.quotation_items}
              onRemove={removeProduct}
              onClose={handleCloseItemModal}
              onOpen={handleEditingItem}
            />
            <footer className="flex gap-2 px-6 py-4 justify-between">
              <Button
                color="danger"
                type="button"
                onClick={handleClose}
              >
                cancel
              </Button>
              <Button
                type="button"
                color="secondary"
                onClick={() => setOpenModal(!openModal)}
              >
                + Agregar
              </Button>
              <Button type="submit">
                {quoToEdit === null ? 'Guardar' : 'Actualizar'}
              </Button>
            </footer>
          </form>
          {openModal && (
            <EditQuotationItem
              onClose={handleCloseItemModal}
              addProduct={addProduct}
              editingItem={editingItem}
              onSaveEdit={handleSaveEdit}
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default CreateQuotation
