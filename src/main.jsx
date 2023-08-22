import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route } from 'wouter'
import Header from './components/Header.jsx'
import ProductPage from './pages/Productos.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <div className="max-w-3xl p-2 md:p-4 my-2 shadow-xl rounded-lg mx-auto w-full bg-[hsl(var(--theme-background))] text-[hsl(var(--theme-foreground))]">
      <Header />
      <Route path="/">
        <App />
      </Route>
      <Route
        path="/productos"
        component={ProductPage}
      ></Route>
    </div>
  </>,
)
