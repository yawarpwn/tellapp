import EditIcon from "../icons/EditIcon"
import TrashIcon from "../icons/TrashIcon"
import { getIgv } from "../utils/numbers"
export default function ItemsList({ items, onRemove, onOpen }) {
  console.log({items})
  const { total } = getIgv(items)
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="px-4 py-3 bg-gray-50 ">
                Producto
              </th>
              <th scope="col" className="px-4 py-3">
                U/M
              </th>
              <th scope="col" className="px-4 py-3 bg-gray-50 ">
                P.Unit
              </th>
              <th scope="col" className="px-4 py-3">
                Cant
              </th>
              <th scope="col" className="px-4 py-3">
                Monto
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              return (
                <tr key={item._id ?? item.id} className="border-b border-gray-200 ">
                  <td scope="row" className="px-4 py-2 text-gray-900 whitespace-nowrap bg-gray-50 ">
                    <p className="max-w-[300px] truncate">
                      {item.desc}
                    </p>
                  </td>
                  <td className="px-4 py-2">
                    {item.size}
                  </td>
                  <td className="px-4 py-2 bg-gray-50 ">
                    {(item.rate).toFixed(2)}
                  </td>
                  <td className="px-4 text-center py-2 bg-gray-50 ">
                    {item.qty}
                  </td>
                  <td className="px-4 py-2">
                    {(item.qty * item.rate).toFixed(2)}
                  </td>
                  <td>
                    <div className="flex gap-x-2 items-center">
                      <button type="button" aria-label="edit button" onClick={() => onOpen(item)}>
                        <EditIcon />
                      </button>
                      <button type='button' aria-label="close modal button" onClick={() => onRemove(item.id)}>
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="px-4 py-2 bg-black text-white ">
                Total
              </td>
              <td className="px-4 py-2 bg-black text-white">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>

  )
}
