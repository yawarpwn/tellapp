import Fuse from 'fuse.js'
export function searchProduct(valueToSearch, data, opts) {
  const { keys = ['description', 'code'] } = opts
  const fuse = new Fuse(data, {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    minMatchCharLength: 3,
    // location: 0,
    threshold: 0.4,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys,
  })

  const results = fuse.search(valueToSearch)
  const resulMapped = results.map(({ item }) => item)
  return resulMapped
}
