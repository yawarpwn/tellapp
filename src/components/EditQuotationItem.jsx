import { useEffect, useRef, useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import { getProducts } from '../services/supabase'
import { createSearchInstance } from '../services/search'
import SuggestedProducts from './SuggestedProducts'

function ModalCreateItem({ onClose, addProduct, onSaveEdit, editingItem }) {
  const initialProduct = editingItem || {
    description: '',
    qty: '',
    unit_size: '',
    price: '',
  }

  const [product, setProduct] = useState(initialProduct)
  const [results, setResults] = useState([])
  const [code, setCode] = useState('FHIP-P')
  const qtyInput = useRef(null)
  const searchInstanceRef = useRef(null)

  const isEmpety = (obj) => {
    const arrValues = Object.values(obj)
    return arrValues.some((value) => !value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    if (isEmpety(product)) {
      return
    }

    if (editingItem) {
      onSaveEdit(product)
    } else {
      addProduct({
        ...product,
        id: crypto.randomUUID(),
      })
    }

    onClose()
  }

  const handleSearch = (event) => {
    const { value } = event.target
    setProduct((prev) => ({ ...prev, description: value }))

    if (searchInstanceRef.current) {
      const productsFiltered = searchInstanceRef.current.search(value)
      const items = productsFiltered.map((p) => p.item)
      setResults(items)
    }
  }

  const handleUpdateProduct = (product) => {
    setProduct(prev => ({ ...prev, ...product }))
  }

  const handleUpdateCode = (code) => {
    setCode(code)
  }

  useEffect(() => {
    getProducts().then((data) => {
      setResults(data)
      searchInstanceRef.current = createSearchInstance(data, {
        keys: ['description', 'code'],
      })
    })
  }, [])

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        autoFocus
        label="Producto"
        name="description"
        type="search"
        value={product.description}
        onChange={handleSearch}
        placeholder="Senal fotoluminiscente con base celtex 3mm"
      />
      <div className="col-span-2">
        <h2 className="font-bold text-lg">Sugerencias:</h2>
      </div>
      <div className="col-span-2 h-40 overflow-y-auto">
        <SuggestedProducts
          results={results}
          updateProduct={handleUpdateProduct}
          updateCode={handleUpdateCode}
          qtyInputRef={qtyInput}
        />
      </div>
      <div className="flex gap-x-4">
        <Input
          label="Medida"
          name="unit_size"
          type="text"
          placeholder="60x60cm"
          value={product.unit_size}
          onChange={(event) =>
            setProduct((prev) => ({ ...prev, unit_size: event.target.value }))
          }
        />

        <Input
          label="Codigo"
          name="code"
          type="text"
          placeholder="FHIP-P"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
      </div>
      <div className="flex gap-x-4">
        <Input
          label="Cantidad"
          inputRef={qtyInput}
          type="number"
          placeholder="10"
          value={product.qty}
          onChange={(event) =>
            setProduct((prev) => ({
              ...prev,
              qty: Number(event.target.value),
            }))
          }
          name="qty"
        />

        <Input
          label={'Precio'}
          value={product.price}
          onChange={(event) =>
            setProduct((prev) => ({
              ...prev,
              price: Number(event.target.value),
            }))
          }
          name="price"
          type="number"
          placeholder="100.00"
        />
      </div>

      <footer className="flex justify-end items-center py-2">
        <Button type="submit">{editingItem ? 'Actualizar' : '+Agregar'}</Button>
      </footer>
    </form>
  )
}

export default ModalCreateItem
