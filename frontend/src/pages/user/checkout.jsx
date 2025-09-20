import React, { useState } from 'react'
import account from '@/assets/account.jpg'
import Address from '@/components/user/address'
import { useDispatch, useSelector } from 'react-redux'
import CartItemContainer from '@/components/user/cartItemContainer'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/user/order-slice'

const Checkout = () => {

  const {cartItems} = useSelector(state => state.shopCart) ;
  const {user} = useSelector(state => state.auth);
  const {approvalURL} = useSelector(state => state.userOrder)
  const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart,setPaymentStart] = useState(false);
  const dispatch = useDispatch();

  const totalCartAmount = 
        cartItems.items && cartItems.items.length > 0
        ?
            cartItems.items.reduce((sum, currentItem) => {
            const price = currentItem?.salePrice > 0 ? currentItem?.salePrice  : currentItem?.price;
            return sum + (price * currentItem.quantity);
            }, 0)
        : 
            0;

  function handleInitialPaypalPayment(){
    const orderData = { 
      userId: user?.id,
      cartItems : cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice  > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity
      })),
      addressInfo :{
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus : 'pending', //default
      paymentMethod : 'paypal', //only one method taken
      paymentStatus : 'pending',
      totalAmount : totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId : '',
      playerId : '',
    }

    dispatch(createNewOrder(orderData)).then((data)=>{
      if(data.payload.success){
        setPaymentStart(true);
      }else{
        setPaymentStart(false);
      }
    });
  }

  if(approvalURL){
    window.location.href = approvalURL;
  }
  
  return (
    <div className='flex flex-col'>
      {/* header image */}
      <div className='relative h-[300] w-full overflow-hidden'>
        <img src={account} className='h-full w-full object-cover object-center'/>
      </div>

      {/* main selection */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 mt-5 p-5'>

        {/*address selection */}
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>

        {/** cart items list with total price */}
        <div className='flex flex-col gap-4'>
          {
            cartItems.items && cartItems.items.length > 0 ?
            cartItems.items.map(item=>  <CartItemContainer cartItems={item} key={item.productId} />) : null
          }
          <div className='mt-8 -space-y-4'>
            <div className='flex justify-between'>
                <span className='font-bold'>Total </span>
                <span className='font-bold'>${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className='mt-4 w-full'>
            <Button className={'w-full'} onClick={handleInitialPaypalPayment}>Checkout</Button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Checkout