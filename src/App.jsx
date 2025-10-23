import { useEffect, useState } from 'react'
import TaskManager from './components/TaskManager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import fetchData from './utils/api'
import ProductsSection from './components/ProductsSection'

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
    <>  
    <Navbar />
   <TaskManager />
   <ProductsSection products={products} title={"products"}/>
   <Footer /> 
    </>
    
  )
}

export default App
