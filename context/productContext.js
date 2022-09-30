import {createContext, useEffect, useState} from 'react'

const ProductContext = createContext()

export function ProductProvider({children}){
  const [selectedProduct,setSelectedProduct] = useState(null)
  return(
    <ProductContext.Provider value={{selectedProduct,setSelectedProduct}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext