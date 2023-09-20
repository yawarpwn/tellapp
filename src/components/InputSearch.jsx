import { SearchIcon } from '../icons'
export default function InputSearch({ onSearchValue, props }) {
  return (
    <div className="group w-full flex flex-col sm:max-w-[40%]">
      <div className="h-full flex flex-col">
        <div className="inline-flex border border-foreground-300 px-2 min-h-[32px] h-8 rounded-lg  items-center w-full gap-1.5 group-hover:border-foreground-800">
          <SearchIcon />
          <input
            className="w-full h-full outline-none font-normal bg-transparent placeholder:text-foreground-500 text-xs"
            type="search"
            placeholder="buscar cotización"
            onChange={onSearchValue}
            {...props}
          />
        </div>
      </div>
    </div>
  )
}
