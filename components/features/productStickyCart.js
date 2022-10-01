import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useContext,useState } from 'react'
import ProductContext from '../../context/productContext'
import {Button} from '../elements/'
import { addToShopifyCart } from '../../utils/addToShopifyCart'
import UserContext from '../../context/userContext'
import CartContext from '../../context/cartContext'
import LocaleContext from '../../context/localeContext'
import { formatNumber } from '../../utils/formatNumber'

const ProductStickyCart = ({data,display}) => {
  const {selectedProduct} = useContext(ProductContext)
  const {setViewedCart,setOpenCart,setCartData,cartData} = useContext(CartContext)
  const {locale} = useContext(LocaleContext)
  const addToCart = async (e) =>{
    e.preventDefault()
    let findId;

    const query = []

    // TODO, for each selected option the user has requested, store variable into query array
    selectedProduct.forEach((option)=>{
      query.push(option.value)
    })

    // TODO, find the id 
    data.product.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })
    const responseCartData = await addToShopifyCart(cartData,data.product.variants.nodes[findId].id)
    setViewedCart(false)
    setOpenCart(true)
    setCartData(responseCartData)
  }

  return (
    <div className = {`sticky bottom-0 z-20 py-2 top-16 bg-surface/80 backdrop-blur-2xl shadow-xl
    ${display ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    transition-opacity duration-300
    `}>
      <div className = "flex items-center justify-between gap-6 px-4 mx-auto max-w-7xl">
        <div className = "flex flex-col">
          {data.product.options[0].values[0] === 'Default Title' ?
            <p key = {data.product.title} className = "relative flex-1 w-full min-w-min"><span className = "font-medium">{data.product.title}</span></p>
          :
          <>
            {selectedProduct?.map((selected)=>(
              <p key = {selected.name} className = "relative flex-1 w-full min-w-min"><span className = "font-medium">{selected.name}</span>: {selected.value}</p>
            ))}
          </>
          }
        </div>
        <div className = "">
          <Button text = {`Add to cart`} CSS = 'bg-secondaryVariant text-onSecondary px-4 text-sm py-2' onClick = {(e)=>addToCart(e)}/>
        </div>
      </div>
    </div>
  )
}




export default ProductStickyCart