import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCardItem, updateCartItemQty } from '@/store/user/cart-slice'
import { toast } from 'react-toastify';
import { Item } from '@radix-ui/react-dropdown-menu'

const CartItemContainer = ({cartItems}) => {
  const dispatch = useDispatch()

  const {user} = useSelector(state=>state.auth);

  function handleItemCardDelete(getCartItems){    
    dispatch(deleteCardItem({userId : user.id, productId : getCartItems.productId}));
    toast.success('Item removed from card');
  }

  function handleItemQtyDes(getCartItems){
    if(getCartItems?.quantity > 1)
      dispatch(updateCartItemQty({userId : user.id, productId : getCartItems.productId , quantity : getCartItems?.quantity-1})) 
    else
      null
  }

  function handleItemQtyInc(getCartItems){
    if(getCartItems?.quantity < 100)
      dispatch(updateCartItemQty({userId : user.id, productId : getCartItems.productId , quantity : getCartItems?.quantity+1})) 
    else
      null
  }

  return (
    <div className='flex items-center space-x-4'>
      <img src={cartItems?.image} alt={cartItems.title} className='w-20 h-20 object-cover' />

      <div className='flex-1'>
        <h3 className='font-extrabold'>{cartItems?.title}</h3>
        
        <div className='flex items-center mt-1 gap-2'>
          <Button variant={'outline'} size={'icon'} className={'h-8 w-8 rounded-full'} onClick={()=>handleItemQtyDes(cartItems)}>
            <Minus className='h-4 w-4'/>            
            <span className='sr-only'>Decrease</span>
          </Button>

          <h4 className='font-semibold'>{cartItems?.quantity}</h4>

          <Button variant={'outline'} size={'icon'} className={'h-8 w-8 rounded-full'} onClick={()=>handleItemQtyInc(cartItems)}>
            <Plus className='h-4 w-4'/>            
            <span className='sr-only'>Increase</span>
          </Button>
        </div>
      </div>

      <div className='flex flex-col items-end'> 
        <p className='font-semibold'>{((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}</p>
        <Trash className='cursor-pointer mt-1' size={20} onClick={()=>handleItemCardDelete(cartItems)}/>
      </div>
      
    </div>
  )
}

export default CartItemContainer