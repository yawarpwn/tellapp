import Fuse from 'fuse.js'
export function searchProduct(valueToSearch, data) {
  console.log('fuse')
  const fuse = new Fuse(data, {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    minMatchCharLength: 2,
    // location: 0,
    threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ['name', 'code'],
  })

  const results = fuse.search(valueToSearch)
  const resulMapped = results.map(({ item }) => item)
  return resulMapped
}
