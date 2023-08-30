import { useState, useRef } from "react"
import Modal from "../atoms/Modal"
import AddButton from "../components/AddButton"
import { PDFViewer } from '@react-pdf/renderer'
import ShippingLabels from "../components/PDF/ShippingLabels"
import Input from '../atoms/Input'
import Button from "../atoms/Button"
import { EyeIcon, SearchIcon } from "../icons"
import { getDni, getRuc } from "../services/sunat"

const initialLabel = {
  destination: '',
  recipient: '',
  ruc: '',
  dni: '',
  phone: '',
  address: ''
}
export default function Rotulos() {
  const [open, setOpen] = useState(false)
  const [create, setCreate] = useState(false)
  const [label, setLabel] = useState(initialLabel)
  const [labelList, setLabelList] = useState([])
  const [currentLabel, setCurrentLabel] = useState(null)
  const destinationRef = useRef(null)
  console.log(currentLabel)

  const handleCloseModal = () => setOpen(false)
  const handleOpenModal = (label) => {
    setOpen(true)
    setCurrentLabel(label)
  }
  const handleCreateOpen = () => setCreate(true)
  const handleCreateClose = () => setCreate(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setLabel({
      ...label,
      [name]: value
    })
  }

  const handleSearchDni = async () => {
    if (
      !label.dni ||
      label.dni.length !== 8 ||
      !(typeof label.dni !== 'number')
    ) {
      return
    }

    const {
      nombres,
      apellidoPaterno,
      apellidoMaterno
    } = await getDni(label.dni)

    setLabel({
      ...label,
      ruc: '',
      recipient: `${nombres} ${apellidoPaterno} ${apellidoMaterno}`
    })
    destinationRef.current.focus()

  }

  const handleSearchRuc = async () => {

    if (
      !label.ruc ||
      label.ruc.length !== 11 ||
      !(typeof label.ruc !== 'number')
    ) {
      return
    }

    const { razonSocial } = await getRuc(label.ruc)

    setLabel({
      ...label,
      dni: '',
      recipient: razonSocial
    })

    destinationRef.current.focus()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateClose()
    setLabelList([...labelList, label])
    setLabel(initialLabel)
  }



  return (
    <div>
      <header className="flex justify-between items-end gap-3 py-4">
        <h1 className="font-bold text-2xl "> Rotulos para Envio</h1>
        <div className="flex gap-3">
          <AddButton onClick={handleCreateOpen}>Agregar</AddButton>
        </div>
      </header>
      <table
        aria-multiselectable="true"
        tabIndex={-1}
        className="w-full min-w-full h-auto table-auto text-xs "
      >
        <thead
          className="sticky top-0 left-0 z-10 bg-foreground-100"
          role="rowgroup"
        >
          <tr
            role="row"
          >

            <th className="table-th">Destinatario</th>

            <th className="table-th">Dni / Ruc</th>

            <th className="table-th">Destino</th>
            <th className="table-th">Acción</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {labelList.map((label, index) => {
            return (
              <tr
                key={index}
                className={`${index % 2 ? 'bg-content2' : ''}`}
              >

                <td className="table-td">{label?.recipient}</td>

                <td className="table-td">{label?.ruc || label?.dni}</td>

                <td className="table-td">{label?.destination}</td>
                <td>
                  {
                    <button onClick={() => handleOpenModal(label)}>
                      <EyeIcon />
                    </button>
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>


      {create &&
        <Modal
          maxHeight={620}
          isOpen={create}
          onClose={handleCreateClose}
          title="MOdal de rotulos"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <div className="relative w-full">
              <Input
                name='dni'
                required
                onChange={handleChange}
                value={label.dni}
                label='Dni'
                type='search'
              />
              <button
                type='button'
                onClick={handleSearchDni}
                className="absolute top-1/2 -translate-y-1/2 right-3 bg-default-100 p-2 rounded-md">
                <SearchIcon />
              </button>
            </div>
            <div className="relative w-full">
              <Input
                name='ruc'
                onChange={handleChange}
                value={label.ruc}
                label='Ruc'
                type='search'
              />
              <button
                type='button'
                onClick={handleSearchRuc}
                className="absolute top-1/2 -translate-y-1/2 right-3 bg-default-100 p-2 rounded-md">
                <SearchIcon />
              </button>
            </div>

            <Input
              name='recipient'
              onChange={handleChange}
              value={label.recipient}
              label='Destinatario'
              inputRef={destinationRef}
              type='text'
            />
            <Input
              name='destination'
              required
              onChange={handleChange}
              value={label.destination}
              label='Destino'
              type='text'
            />


            <Input
              name='phone'
              onChange={handleChange}
              value={label.phone}
              label='Télefono'
              type='number'
            />

            <Input
              name='address'
              onChange={handleChange}
              value={label.address}
              label='Dirección'
              type='text'
            />
            <header className="flex justify-end">
              <Button type='submit'>Agregar</Button>
            </header>
          </form>
        </Modal>}
      {open &&
        <Modal
          isOpen={open}
          onClose={handleCloseModal}
          title="MOdal de rotulos"
        >
          <PDFViewer width={'100%'} height={'100%'}>
            <ShippingLabels currentLabel={currentLabel} />
          </PDFViewer>
        </Modal>}
    </div>
  )
}
