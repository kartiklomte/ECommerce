import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import ProductFilter from '@/components/user/filter'
import ProductDashboard from '@/components/user/productDashboard'
import ProductDetails from '@/components/user/productDetails'
import { setOptions } from '@/config'
import { addToCart, fetchCartItems } from '@/store/user/cart-slice'
import { viewFilteredProducts, viewProductsDetail } from '@/store/user/product-slice'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDown, ArrowUpSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';


const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {productList,productDetail} = useSelector(state => state.userProducts);
  const [filters,setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParam,setSearchParam] = useSearchParams();
  const [openProductDetail,setOpenProductDetail] = useState(false);

  //taking user info using auth
  const {user} = useSelector(state => state.auth)

  //for setting the value of the sort. this will change everytime as you change the sort.
  function handleSort(value){
    setSort(value);    
  }

  //getSectionId give that this is catagory or brand and getCurrentFilter give actual data of it
  function handleFilter(getSectionId, getCurrentFilter){

    let cpyFilter = {...filters}; //shalow copy of filter
    const indexOfCurrenSection = Object.keys(cpyFilter).indexOf(getSectionId); //checking index no of the selected filters

    //if the selected object (catagory or brand) is not present in then this will exicute (in short add the array of catagory or brand)
    if(indexOfCurrenSection === -1){
      cpyFilter = {
        ...cpyFilter,
        [getSectionId] : [getCurrentFilter]
      }
    }else{   // if selected object is present in the shalow copy then this will exicute

      const indexOfCurrenOption = cpyFilter[getSectionId].indexOf(getCurrentFilter);
      
      if(indexOfCurrenOption === -1){  //if the filter is not in the copy (is not tick) then it will get add(get tick)
        cpyFilter[getSectionId].push(getCurrentFilter);
      }
      else{   //if the filter is in the copy (is tick) then it will get remove(remove tick)
        cpyFilter[getSectionId].splice (indexOfCurrenOption, 1);
      }
    }
    
    setFilters(cpyFilter);
    sessionStorage.setItem("filters",JSON.stringify(cpyFilter)); //stores the copy in the section storage
    
  }
  
  //function for creating the string that adds in the URL as filter are selected
  function createSearchParamsHelper(getFilterParams){
    const queryParams = [];

    for(const [key,value] of Object.entries(getFilterParams)){
      if(Array.isArray(value) && value.length > 0 ){
        const paramvalue =value.join(',');

        queryParams.push(`${key}=${encodeURIComponent(paramvalue)}`);
      }
    }

    return queryParams.join('&');
  }
  
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

  //set sort default to price - low to high and resume the filters store in the section when reloaded 
  useEffect(() => {
  setSort('price-lowtohigh');
  const storedFilters = JSON.parse(sessionStorage.getItem('filters'));
  setFilters(storedFilters || {});
}, [location.pathname, location.state]); // 👈 THIS is the key
  
  //get data every time user do any action
  useEffect(() => {
    //if(filters!==null && sort !==null)
    dispatch(viewFilteredProducts({filterParams:filters ,sortParams:sort}));
  }, [dispatch,sort,filters]);

  //useEffect for setting the URL as per the filter selected
  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      //create string which will be attached to the url so to define the filters
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParam(new URLSearchParams(createQueryString)); // set the string in the URL
    }
  },[filters]);

  //for managing the state of the product detail component
  useEffect(()=>{
    if(productDetail !== null) setOpenProductDetail(true);
  },[productDetail]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-6'>
      <ProductFilter filter={filters} handleFilter={handleFilter}/>

      <div className='bg-background w-full rounded-lg shadow-md'>

        {/* main contain top nav */}
        <div className='p-4 border-b flex items-center justify-between'>

          {/**left part of the main containt navbar */}
          <h2 className='text-lg font-bold text-shadow-lg/10'>All Products</h2>

          {/* right part of the main containt navbar */}
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{productList?.length} Products</span>

            {/** sort button and its form */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowUpDown className='h-4 w-4 '/>
                  <span>sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    setOptions.map(sortItem => 
                      <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                      {  sortItem.label   }
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        {/* render the items cards on the dashboard */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {
            productList && productList.length > 0 ?
            productList.map(productItem => <ProductDashboard key={productItem?._id} product={productItem} handleProductDetails={handleProductDetails} handleAddToCard={handleAddToCard}/>)
            :
            null
          }
        </div>
        
        {/** show the details of the page when it is click otherwise this component will remain hidden */}
        <ProductDetails open={openProductDetail} setOpen={setOpenProductDetail} productDetails={productDetail}/> 
      </div>
    </div>
  )
}

export default List