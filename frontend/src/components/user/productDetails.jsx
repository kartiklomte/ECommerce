import React, { useEffect, useMemo, useState } from 'react'
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
import { fetchProductReviews, addOrUpdateReview, updateReview } from '@/store/user/review-slice'

const ProductDetails = ({open,setOpen, productDetails}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.auth)
  const { reviews } = useSelector(state => state.userReviews);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    if (productDetails?._id) {
      dispatch(fetchProductReviews(productDetails._id));
    }
  }, [dispatch, productDetails?._id]);

  const myReview = useMemo(() => {
    if (!user?.id || !reviews?.length) return null;
    return reviews.find(r => String(r.userId) === String(user.id)) || null;
  }, [user?.id, reviews]);

  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating);
      setComment(myReview.comment);
      setEditingReviewId(myReview._id);
    } else {
      setRating(5);
      setComment('');
      setEditingReviewId(null);
    }
  }, [myReview]);

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

  async function handleSubmitReview() {
    if (!user?.id) {
      toast.error('Please login to submit a review');
      return;
    }
    if (!productDetails?._id) return;

    try {
      if (editingReviewId) {
        const resp = await dispatch(updateReview({
          reviewId: editingReviewId, rating, comment, productId: productDetails._id
        }));
        if (resp?.payload?.success) {
          toast.success('Review updated');
          setEditingReviewId(null);
        }
      } else {
        const resp = await dispatch(addOrUpdateReview({
          productId: productDetails._id, rating, comment
        }));
        if (resp?.payload?.success) {
          toast.success('Review submitted');
        }
      }
      setComment('');
      setRating(5);
    } catch {
      toast.error('Failed to submit review');
    }
  }

  function renderStars(currentRating, clickable = false) {
    const arr = [1,2,3,4,5];
    return (
      <div className='flex items-center gap-1'>
        {arr.map((i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${i <= currentRating ? 'fill-amber-300' : ''} ${clickable ? 'cursor-pointer' : ''}`}
            onClick={clickable ? () => setRating(i) : undefined}
          />
        ))}
      </div>
    );
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
            <h2 className='text-xl font-bold mb-5'>Reviews</h2>

            {reviews && reviews.length > 0 ? (
              <div className='grid grid-cols-1 gap-4'>
                {reviews.map((rev) => (
                  <div key={rev._id} className='flex gap-4'>
                    <Avatar className={'h-10 w-10 border'}>
                      <AvatarFallback>
                        {rev.userName ? rev.userName.slice(0,2).toUpperCase() : 'US'}
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid gap-1 w-full'>
                      <div className='flex items-center gap-2 justify-between'>
                        <h2 className='font-bold'>{rev.userName}</h2>
                        {String(rev.userId) === String(user?.id) ? (
                          <Button variant='outline' size='sm' onClick={()=>{
                            setEditingReviewId(rev._id);
                            setRating(rev.rating);
                            setComment(rev.comment);
                          }}>
                            Edit
                          </Button>
                        ) : null}
                      </div>
                      {renderStars(rev.rating, false)}
                      <p className='text-muted-foreground'>{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-muted-foreground'>No reviews yet. Be the first to review!</p>
            )}
          </div>

          {/**add/edit review subdiv */}
          <div className='mt-2 flex items-center gap-2'>
            {renderStars(rating, true)}
            <Input
              placeholder='write a review ...'
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
            />
            <Button onClick={handleSubmitReview} disabled={!user?.id}>
              {editingReviewId ? 'Update' : 'Submit'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetails