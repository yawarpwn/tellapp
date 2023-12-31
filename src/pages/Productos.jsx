import { useEffect, useState, useMemo } from 'react'
import Pagination from '../components/Pagination'
import {
  getProducts,
  updateProduct,
  insertProduct,
  deleteProduct,
} from '../services/supabase'
import { createSearchInstance } from '../services/search'
import { SORTBY } from '../constants'
import { ChevronDownIcon } from '../icons'
import InputSearch from '../components/InputSearch.jsx'
import AddButton from '../components/AddButton.jsx'
import ProductTableRow from '../components/ProductTableRow'
import Modal from '../atoms/Modal'
import CreateUpdateProduct from '../components/CreateUpdateProduct'
export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [sortBy, setSortBy] = useState(null)
  const [page, setPage] = useState(1)

  // Buscar Products por nombre o codigo
  const searchInstance = createSearchInstance(products, {
    keys: ['description', 'code'],
  })

  const onSearchValue = (event) => {
    setFilterValue(event.target.value)
    setPage(1)
  }

  const rowPerPage = 10

  const handleEditProduct = (editProduct) => {
    setEditingProduct(editProduct)
    setModalOpen(true)
  }

  const handleUpdateProduct = async (productToUpdate) => {
    const productUpdated = await updateProduct({
      productToUpdate: productToUpdate,
      id: productToUpdate.id,
    })

    setProducts((prev) =>
      prev.map((p) => (p.id === productUpdated.id ? productUpdated : p))
    )
  }

  const handleSaveProduct = async (productToSave) => {
    const insertedProduct = await insertProduct({
      productToInsert: productToSave,
    })
    setProducts((prev) => [...prev, insertedProduct])
  }

  const handleDeleteProduct = async (id) => {
    const deletedProduct = await deleteProduct({ id })
    setProducts((prev) => prev.filter((p) => p.id !== deletedProduct.id))
  }

  const onCloseModal = () => {
    setEditingProduct(null)
    setModalOpen(false)
  }

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log('error fetching products', err))
  }, [])

  const handleBlurCell = ({ field, productId, editedContent }) => {
    setProducts((prev) => {
      return prev.map((product) =>
        product.id === productId
          ? { ...product, [field]: editedContent }
          : product
      )
    })
  }

  const hasFilterValue = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    if (hasFilterValue) {
      const results = searchInstance.search(filterValue)
      const items = results.map((r) => r.item)
      return items
    }
    return products
  }, [filterValue, products])

  const handleSortBy = (value) => {
    setSortBy(value)
  }

  const sortedItems = useMemo(() => {
    if (sortBy === SORTBY.DESCRIPTION) {
      return [
        ...filteredItems.sort((a, b) =>
          a.description.localeCompare(b.description)
        ),
      ]
    }

    if (sortBy === SORTBY.CODE) {
      return [...filteredItems.sort((a, b) => a.code.localeCompare(b.code))]
    }

    if (sortBy === SORTBY.CATEGORY) {
      return [
        ...filteredItems.sort((a, b) => a.category.localeCompare(b.category)),
      ]
    }

    return filteredItems
  }, [sortBy, products, filteredItems])

  const totalPages = useMemo(() => {
    return Math.floor(sortedItems.length / rowPerPage)
  }, [sortedItems])

  const items = useMemo(() => {
    const start = (page - 1) * rowPerPage
    const end = start + rowPerPage

    return sortedItems.slice(start, end)
  }, [sortedItems, page])

  return (
    <div className="flex flex-col gap-2">
      <header className="flex justify-between items-end gap-3">
        <InputSearch
          onSearchValue={onSearchValue}
          value={filterValue}
        />
        <div className="flex gap-3">
          <AddButton onClick={() => setModalOpen(true)}>Agregar</AddButton>
        </div>
      </header>
      <div className="flex justify-between items-center">
        <span className="text-xs text-zinc-500">
          Hay {products.length} Productos
        </span>
      </div>

      <div className="overflow-x-auto">
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
              className="outline-none"
            >
              <th
                onClick={() => handleSortBy(SORTBY.DESCRIPTION)}
                className="table-th"
              >
                Descripcion
                <ChevronDownIcon
                  size={16}
                  className={`inline-block ml-1 mb-px  transition ${
                    sortBy === SORTBY.DESCRIPTION ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </th>

              <th
                onClick={() => handleSortBy(SORTBY.CODE)}
                className="table-th"
              >
                Codigo
                <ChevronDownIcon
                  size={16}
                  className={`inline-block ml-1 mb-px  transition ${
                    sortBy === SORTBY.CODE ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </th>
              <th
                onClick={() => handleSortBy(SORTBY.CATEGORY)}
                className="table-th"
              >
                Categoria
                <ChevronDownIcon
                  size={16}
                  className={`inline-block ml-1 mb-px  transition ${
                    sortBy === SORTBY.CATEGORY ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </th>
              <th className="table-th">U/M</th>
              <th className="table-th">Costo</th>
              <th className="table-th">Precio</th>
              <th className="table-th">Acciones</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {items.map((product, index) => {
              return (
                <ProductTableRow
                  product={product}
                  key={index}
                  index={index}
                  onBlurCell={handleBlurCell}
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        onNextPage={() => {
          if (page === totalPages) {
            return
          }

          setPage(page + 1)
        }}
        currentPage={page}
        updatePage={(page) => {
          setPage(page)
        }}
      />
      <Modal
        title={editingProduct ? 'Editar Producto' : 'Crear Producto'}
        isOpen={modalOpen}
        onClose={onCloseModal}
      >
        <CreateUpdateProduct
          onUpdateProduct={handleUpdateProduct}
          onSaveProduct={handleSaveProduct}
          editingProduct={editingProduct}
          onCloseModal={onCloseModal}
        />
      </Modal>
    </div>
  )
}
