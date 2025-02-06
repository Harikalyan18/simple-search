
import { useState } from 'react'
import axios from 'axios'
import SearchBar from './Components/SearchBar'
import ProductGrid from './Components/ProductList'
import Pagination from './Components/Pagination'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState('')
  const API = 'https://api.searchspring.net/api/search/search.json'
  const SITE_ID = 'scmq7n'

  const searchProducts = async (query, page = 1) => {
    const response = await axios.get(API, {
      params: {
        siteId: SITE_ID,
        q: query,
        resultsFormat: 'native',
        page
      }
    })
    return response.data
  }

  const handleSearch = async (page = 1) => {
    if (!query.trim()) return
    setError('')

    try {
      const data = await searchProducts(query, page)
      setResults(data.results)
      setCurrentPage(data.pagination.currentPage)
      setTotalPages(data.pagination.totalPages)
    } catch (err) {
      setError('Failed to fetch results. Please try again.')
    }
  }

  return (
    <div className="container">
      <h1 className="title">ISLAND NATIVE</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => handleSearch(1)}
      />
          
      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handleSearch}
          />

          <ProductGrid products={results} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handleSearch}
          />
        </>
      )}
    </div>
  )
}
