import { useEffect, useState } from 'react'
import TaskManager from './components/TaskManager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import fetchData from './utils/api'
import ProductsSection from './components/ProductsSection'
import { Routes,Route } from 'react-router-dom'

function App() {
  
  const [products,setProducts] = useState([])
  
  useEffect(() => {
    (async() =>{
      const data = await fetchData();
      setProducts(data);  
      
    })() ;

  }, [])

  console.log(products);

  return (
  
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <Navbar />
    <Routes>
      <Route path="/" element={<h2 className='text-center text-3xl font-bold mt-20 text-gray-800 dark:text-gray-100'>Welcome to React Week 3!</h2>} />
      <Route path="/tasks" element={<TaskManager />} />
      <Route path="/products" element={<ProductsSection products={products} title={"products"}/>} />
    </Routes>
   <Footer /> 
    </div>
    
 
  )
}

export default App
