import { useState } from 'react'

import InputSearch from '../components/InputSearch'

const SearchQuos = (props) => {
  const { instanceSearch, updateQuotations } = props
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (event) => {
    const { value } = event.target
    setSearchValue(value)

    console.log('value', value)
    const results = instanceSearch.search(value)
    const quos = results.map(({ item }) => item)
    console.log('quos',quos)
    if(quos.length > 0) {

      updateQuotations(quos)
    }
  }

  return (
    <div>
      <InputSearch onSearchValue={handleSearch} value={searchValue} />
    </div>
  )
}

export default SearchQuos
