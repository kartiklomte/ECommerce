import { Button } from '@/components/ui/button'
import banner from '../../assets/top_poster.png'
import offer from '../../assets/offer.png'

import bannerone from '../../assets/banner1.png'
import bannertwo from '../../assets/banner2.png'
import bannerthree from '../../assets/banner3.png'
import bannerfour from '../../assets/banner4.png'
import bannerfive from '../../assets/banner5.png'

import catbg from '../../assets/cat-bg.jpg'
import brandbg from '../../assets/brandbg.png'

import adidas from '../../assets/company logos/adidas.png'
import hm from '../../assets/company logos/h&m.png'
import levi from '../../assets/company logos/levi.png'
import nike from '../../assets/company logos/nike.jpg'
import puma from '../../assets/company logos/puma.png'
import zara from '../../assets/company logos/zara.png'


import React, { useEffect, useState } from 'react'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, FootprintsIcon, icons, ShirtIcon, WatchIcon } from 'lucide-react'
import { catagoryOptionMap, filterOptions } from '@/config'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { viewFilteredProducts, viewProductsDetail } from '@/store/user/product-slice'
import ProductDashboard from '@/components/user/productDashboard'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/user/cart-slice'
import { toast } from 'react-toastify';
import ProductDetails from '@/components/user/productDetails'

const UserHome = () => {

  const dispatch = useDispatch();
  const {productList,productDetail} = useSelector(state => state.userProducts) // taking data of all products and selected product
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth) //taking user info using auth
  const [openProductDetail,setOpenProductDetail] = useState(false);

    // object for showcasing the icons of catagory
  const catagory = [
  {id: 'men' , label:'Men', icon : ShirtIcon},
  {id: 'women' , label : 'Women' ,icon : CloudLightningIcon},
  {id: 'kids' , label: 'Kids',icon : BabyIcon},
  {id: 'accessories' , label: 'Accessories', icon : WatchIcon},
  {id: 'footwear' , label :'Footwear', icon : FootprintsIcon},
  ];

  const brand = [
    {id: 'nike' , label: 'Nike' , icon: nike},
    {id: 'adidas' , label: 'Adidas' , icon: adidas},
    {id: 'pume' , label: 'Puma', icon: puma},
    {id: 'levi' , label: "Levi's" , icon: levi},
    {id: 'zara' , label: 'zara' , icon : zara},
    {id: 'h&m' , label: 'H&M' , icon : hm}
  ]

  // for combining all banners into one list
  const slides =  [bannerone,bannertwo,bannerthree,bannerfour,bannerfive];

  // state for managing the slides changes
  const [currentSlide, setCurrentSlide] = useState(0);

  // automatically change the slides after 4 sec
  useEffect(() => {
    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide => (prevSlide +1) % slides.length)
    },4000)
  
    return () => {
      clearInterval(timer);
    }
  }, []);

  // sending request for the all products
  useEffect(() => {
    dispatch(viewFilteredProducts({filterParams:{} ,sortParams: 'price-lowtohigh'}))
  }, [dispatch])
  
  //for managing the state of the product detail component
  useEffect(()=>{
    if(productDetail !== null) setOpenProductDetail(true);
  },[productDetail]);

  //function for gettting product details
  function handleProductDetails(productId){
    dispatch(viewProductsDetail(productId)); //send dispact to send request of data    
  }

  //function for handling the click on the add to card
  function handleAddToCard(productId){
    dispatch(addToCart({userId: user.id, productId: productId ,quantity: 1 })).then(data =>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast.success('Product add to card');
      }
    });
  }

  function handleNavigationToListPage(getCurrentFilter,getCurrentSection){
    sessionStorage.removeItem('filters'); 
    const currentFilter = {
      [getCurrentSection] : [getCurrentFilter.id]
    };

    sessionStorage.setItem('filters',JSON.stringify(currentFilter));

    navigate('/user/list');
  }
  return (
    <div className='flex flex-col min-h-screen'>

      <div className='w-fit shadow-2xl mb-0.5 relative'>
        <img src={banner} alt="banner" className='z-50' loading="lazy"/>
        <img src={offer} alt="offer" className='absolute h-full z-10 right-[22%] top-3 animate-bounce' loading="lazy"/>
      </div>

      {/** posters div */}
      <div className='relative w-full h-[25vh] md:h-[60vh] lg:h-[90vh] bg-purple-300 overflow-hidden'>
        {
          slides.map((slide,index)=> 
            <img src={slide} key={index} className={`${index === currentSlide ? 'opacity-100': 'opacity-0'} absolute top-0 left-0 w-full h-full object-fill lg:object-cover transition-opacity duration-1000`} loading="lazy" />  
          )
        }

        {/** for left side arrow button */}
        <Button variant={'outline'} size={'icon'} className={'invisible md:visible absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/20'} onClick={()=>setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)}>
          <ChevronLeftIcon className='w-4 h-4'/>
        </Button>

        {/** for right side arrow button */}
        <Button variant={'outline'} size={'icon'} className={'invisible md:visible absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/20'} onClick={()=>setCurrentSlide(prevSlide => (prevSlide + 1 )%slides.length)}>
          <ChevronRightIcon className='w-4 h-4'/>
        </Button>

      </div>

      {/** shop by catagory section */}
      <section className={'py-12 h-full w-full bg-cover bg-center z-10'} style={{backgroundImage: `url(${catbg})`}}>
        <div className=' container mx-auto px-8 w-full z-50'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 w-[70%]'>
            {
              catagory.map(catagoryItem => <Card key={catagoryItem.id} onClick={()=>handleNavigationToListPage(catagoryItem,'category')} className={'cursor-pointer hover:shadow-2xl transition-shadow'}>
                <CardContent className={'flex flex-col items-center justify-center p-6'}>
                  <catagoryItem.icon className='w-10 h-10 mb-4 text-primary'/>
                  <span className='font-bold'>{catagoryItem.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>

      {/** shop by brand section */}
      <section className=' bg-gray-50 w-full flex flex-row overflow-hidden'>
        <div className='hidden lg:flex'>
          <img src={brandbg} alt="" className='w-fit h-full absolute z-10' loading="lazy"/>
        </div>
        <div className=' pt-5 container lg:ml-[30%] sm:mx-auto px-8 w-full z-50'>
          <h2 className='text-3xl font-bold text-center mb-2.5'>Shop By Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mb-6 mx-10 h-[70%]'>
            {
              brand.map(catagoryItem => <Card key={catagoryItem.id} onClick={()=>handleNavigationToListPage(catagoryItem,'brand')} className={'cursor-pointer hover:shadow-lg transition-shadow bg-blue-200'}>
                <CardContent className={'flex flex-col items-center justify-center bg-blue-200 m-auto'}>
                  <img src={catagoryItem.icon} alt={catagoryItem.label} className='w-full mb-4 text-primary bg-blue-200' loading="lazy" />
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>

      {/**product showcase section */}
      <section className='p-12 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400' >
        <div className=' container mx-auto px-8 w-full'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            productList && productList.length > 0 ?
            productList.map(productItem => <ProductDashboard key={productItem?._id} product={productItem} handleProductDetails={handleProductDetails} handleAddToCard={handleAddToCard}/>)
            :
            null
          }
        </div>
      </section>
      
      {/** show the details of the page when it is click otherwise this component will remain hidden */}
      <ProductDetails open={openProductDetail} setOpen={setOpenProductDetail} productDetails={productDetail}/>

    </div>
  )
}

export default UserHome