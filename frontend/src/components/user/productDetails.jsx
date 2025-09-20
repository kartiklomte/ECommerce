import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/user/cart-slice'
import { toast } from 'react-toastify';
import { setProductDetails } from '@/store/user/product-slice'

const ProductDetails = ({open,setOpen, productDetails}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state=>state.auth)

  //function for handling the click on the add to card
  function handleAddToCard(productId){
    dispatch(addToCart({userId: user.id, productId: productId ,quantity: 1 })).then(data =>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast.success('Product add to card');
      }
    });
  }

  //this will handel the closing of the card. so that will opening the page again and again the card should closed
  function handleDialogClose(){
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
        
        {/* left side section(image) */}
        <div className=' relative overflow-hidden rounded-lg'>
          <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-auto lg:aspect-square w-full object-cover' />
        </div>

        {/** right side section */}
        <div className='flex flex-col sm:gap-0 lg:gap-6'>

          {/**title description subdiv */}
          <div className='flex flex-col gap-2'>
            <h1 className='sm:text-xl lg:text-3xl font-extrabold'>{productDetails?.title}</h1>
            <p className='sm:text-lg lg:text-xl text-muted-foreground'>{productDetails?.description}</p>
          </div>

          {/**price subdiv */}
          <div className='flex items-center justify-between'>
            <span className={`${productDetails?.salePrice> 0  ?  'line-through '  :  '' }text-lg font-semibold text-primary`}>${productDetails?.price}</span>
            <span>{ productDetails?.salePrice> 0 ? <span className='text-lg font-bold text-red-600'>${productDetails?.salePrice}</span> : null  }</span>
          </div>

          {/**add to card subdiv */}
          <div className='my-5'> 
            <Button onClick={()=>handleAddToCard(productDetails?._id)} className='w-full'>add to Card</Button>
          </div>
          
          <Separator/>

          {/**view review subdiv */}
          <div className='sm:max-h-[120px] lg:max-h-[200px] overflow-auto'>
            
            {/**heading */}
            <h2 className='text-xl font-bold mb-5'>Reviews</h2>

            {/** description section */}
            <div className='gird grid-cols-2'>
              <div className='flex gap-4'>

                {/**name logo */}
                <Avatar className={'h-10 w-10 border'}>
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>

                {/** name and review star section */}
                <div className='grid gap-1'>

                  {/**full name */}
                  <div className='flex items-center gap-2'>
                    <h2 className='font-bold'>Rohan Kamble</h2>
                  </div>

                  {/** stars */}
                  <div className='flex items-center gap-1'>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5'/>
                  </div>

                  {/**written review */}
                  <p className='text-muted-foreground'>This is awesome product</p>

                </div>
              </div>

              <div className='flex gap-4'>

                {/**name logo */}
                <Avatar className={'h-10 w-10 border'}>
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>

                {/** name and review star section */}
                <div className='grid gap-1'>

                  {/**full name */}
                  <div className='flex items-center gap-2'>
                    <h2 className='font-bold'>Rohan Kamble</h2>
                  </div>

                  {/** stars */}
                  <div className='flex items-center gap-1'>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5'/>
                  </div>

                  {/**written review */}
                  <p className='text-muted-foreground'>This is awesome product</p>

                </div>
              </div>

              <div className='flex gap-4'>

                {/**name logo */}
                <Avatar className={'h-10 w-10 border'}>
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>

                {/** name and review star section */}
                <div className='grid gap-1'>

                  {/**full name */}
                  <div className='flex items-center gap-2'>
                    <h2 className='font-bold'>Rohan Kamble</h2>
                  </div>

                  {/** stars */}
                  <div className='flex items-center gap-1'>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5'/>
                  </div>

                  {/**written review */}
                  <p className='text-muted-foreground'>This is awesome product</p>

                </div>
              </div>

               <div className='flex gap-4'>

                {/**name logo */}
                <Avatar className={'h-10 w-10 border'}>
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>

                {/** name and review star section */}
                <div className='grid gap-1'>

                  {/**full name */}
                  <div className='flex items-center gap-2'>
                    <h2 className='font-bold'>Rohan Kamble</h2>
                  </div>

                  {/** stars */}
                  <div className='flex items-center gap-1'>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5 fill-amber-300'/>
                    <StarIcon className='w-5 h-5'/>
                  </div>

                  {/**written review */}
                  <p className='text-muted-foreground'>This is awesome product</p>

                </div>
              </div>
            </div>

          </div>

          {/**add review subdiv */}
          <div className='mt-2 flex gap-2'>
            <Input placeholder='write a review ...'/>
            <Button>submit</Button>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}

export default ProductDetails