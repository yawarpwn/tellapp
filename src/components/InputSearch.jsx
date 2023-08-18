import { SearchIcon } from "../icons"
export default function InputSearch() {
  return (
    <div className="group w-full flex flex-col sm:max-w-[40%]">
      <div className="h-full flex flex-col">
        <div className="inline-flex border border-gray-700 px-2 min-h-[32px] h-8 rounded-lg  items-center w-full gap-1.5 group-hover:border-white">
          <SearchIcon />
          <input className="w-full h-full outline-none font-normal bg-transparent placeholder:text-gray-500 text-xs pr-6"
            type='search'
            placeholder="buscar por nombre" />
        </div>
      </div>
    </div>
  )
}
