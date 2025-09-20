import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemContainer from './cartItemContainer'
import { useNavigate } from 'react-router-dom'

const CartWapper = ({cartItems,setOpenCartSheet}) => {
    const navigate = useNavigate();
    
    const totalCartAmount = 
        cartItems && cartItems.length > 0
        ?
            cartItems.reduce((sum, currentItem) => {
            const price = currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price;
            return sum + (price * currentItem.quantity);
            }, 0)
        : 
            0;
    
    

  return (
    <SheetContent className={'sm:max-w-md'}>

        <SheetHeader>
            <SheetTitle >
                Your Cart
            </SheetTitle>
        </SheetHeader>
        
        {/** div for taking the rendered componernt of cart item container */}
        <div className='mt-8 space-y-4 p-3'>
        {
            cartItems && cartItems.length > 0 ?
            cartItems.map(item=>  <CartItemContainer cartItems={item} key={item.productId} />) : null
            
        }
        </div>

        <div className='mt-8 -space-y-4'>
            <div className='flex justify-center'>
                <span className='font-bold'>Total </span>
                <span className='font-bold'>${totalCartAmount.toFixed(2)}</span>
            </div>
        </div>

        <Button onClick={()=>{ navigate('/user/checkout'); setOpenCartSheet(false);}} className={'w-full mt-5'}>Checkout</Button>
        
    </SheetContent>
  )
}

export default CartWapper