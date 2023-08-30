import { useState, useMemo } from 'react'
import confetti from 'canvas-confetti'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import { SearchIcon } from '../icons'
import { getRuc } from '../services/sunat'
import { insertQuotation, updateQuotation } from '../services/supabase'
import { formatDate, getCurrentDate, getQuoNumber } from '../utils'
import EditQuotationItem from './EditQuotationItem'
import ItemsList from './ItemsList'
import Modal from '../atoms/Modal'
import { VIABILITY } from '../constants'
import { filterUniqueCompany } from '../utils'

function CreateQuotation({ quotations, quoToEdit, onClose }) {
  const [editingItem, setEditingItem] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openCustomers, setOpenCustomers] = useState(false)

  const handleCloseCustomers = () => {
    setOpenCustomers(false)
  }

  const handleOpenCustomers = () => {
    setOpenCustomers(true)
  }

  const initialQuo = quoToEdit || {
    company: 'SIN RUC PROPORCIONADO',
    phone: '',
    date: getCurrentDate(),
    ruc: '',
    address: '',
    quo_number: getQuoNumber(quotations),
    deadline: 1,
    quotation_items: [],
    viability: 'Possible',
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
    if (quoState.quotation_items.length === 0) {
      return
    }

    if(quoState.quo_number < 4000) {
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
      confetti()
      handleClose()
    }
  }

  const handleAddProduct = (product) => {
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

  const customers = useMemo(() => {
    const filteredCustomers = quotations.filter((x) => x.viability === 'Safe')
    return filterUniqueCompany(filteredCustomers)
  }, [quotations])

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            <Input label="No" name="quoNumber"
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
            readOnly
            type="text"
            placeholder="Av. El Santuario 323 - SJL"
          />

          <div className="flex gap-2 items-center">
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

            <Button onClick={handleOpenCustomers}>
              <SearchIcon />
            </Button>

            {openCustomers && (
              <Modal
                isOpen={openCustomers}
                onClose={handleCloseCustomers}
                size="xs"
                title="Sugerencias"
              >
                <div className="overflow-y-auto">
                  <ul className="flex flex-col gap-3">
                    {customers.map(({ ruc, company, address }) => {
                      return (
                        <li
                          onClick={() => {
                            setQuoState((prev) => ({
                              ...prev,
                              company,
                              ruc,
                              address,
                            }))

                            handleCloseCustomers()
                          }}
                          className="bg-content2 p-2 rounded text-xs cursor-pointer hover:bg-content4 "
                          key={ruc}
                        >
                          {company}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Modal>
            )}
          </div>
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
        <footer className="flex gap-2 py-4 justify-between">
          <Button
            type="button"
            color="danger"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => setOpenModal(!openModal)}
          >
            + Agregar
          </Button>
          <Button type="submit">
            {quoToEdit === null ? 'Crear' : 'Actualizar'}
          </Button>
        </footer>
      </form>
      {openModal && (
        <Modal
          title={editingItem ? 'Editar Producto' : 'Agregar Producto'}
          size="md"
          isOpen={openModal}
          onClose={handleCloseItemModal}
        >
          <EditQuotationItem
            onClose={handleCloseItemModal}
            addProduct={handleAddProduct}
            editingItem={editingItem}
            onSaveEdit={handleSaveEdit}
          />
        </Modal>
      )}
    </>
  )
}

export default CreateQuotation
