import { database } from "../data/products";
import Fuse from "fuse.js";

const fuse = new Fuse(database, {
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
  keys: ['name', 'code']
})

export function searchProduct(valueToSearch) {
  const results = fuse.search(valueToSearch)
  const resulMapped = results.map(({item}) => item)
  return resulMapped
}

