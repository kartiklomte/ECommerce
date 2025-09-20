import CommonForm from '@/common/form';
import Imageuploader from '@/components/admin/imageuploader';
import ProductDashboard from '@/components/admin/productDashboard';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { addNewProduct, viewProducts, editProduct, deleteProduct} from '@/store/admin/product-slice';
import { Item } from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//initial state of the form 
const initialFormData = {
  image : null,
  title : '',
  description : '',
  category : '',
  brand : '',
  price : '',
  salePrice : '',
  totalStock : ''
}

const AdminProduct = () => {
  const [openCreateProduct,setOpenCreateProduct] = useState(false); 
  const [formData,setFormData] = useState(initialFormData);
  const [imagefile,setImageFile] = useState(null);
  const [imageUrl,setImageUrl] = useState('');
  const [imageLoadingState,setImageLoadingState] = useState(false);
  const [currentEditedId,setCurrentEditedId] = useState(null);

  //taking out all the products send from the backend
  const productList = useSelector(state=> state.adminProducts.ProductList );
  const dispatch = useDispatch();

  //function for the submit button with respect to use of time 
  function onSubmit(event){
    event.preventDefault();
    if (currentEditedId !== null) {
      // update product submit logic
      dispatch(editProduct({ id: currentEditedId, formData: formData })).then((data) => {
        if (data?.payload?.success) {
          toast.success('Product updated successfully');
          setFormData(initialFormData);
          setCurrentEditedId(null);
          setOpenCreateProduct(false);
          dispatch(viewProducts());
        }
      });
    } else {
      // create product submit logic
      dispatch(addNewProduct({...formData, image : imageUrl})).then((data) => {
        if (data?.payload?.success) {
          toast.success('Product added successfully');
          setFormData(initialFormData);
          setCurrentEditedId(null);
          setOpenCreateProduct(false);
          dispatch(viewProducts());
        }
      });
    }
  }

  function deleteProductHadler(getCurrentProductId){
    console.log(getCurrentProductId);
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
        if (data?.payload?.success) {
          toast.success('Product deleted successfully');
          dispatch(viewProducts());
        }
    });
  }
  //function to disable the button upto all the fileds in the form are fill up
  function isFormValid(){
    return Object.keys(formData)
      .map((key) => formData[key]  !== "")
      .every(item => item);
  }

  //useEffect so that the all the products should be visible when this page opens
  useEffect(()=>{
    dispatch(viewProducts());
  },[dispatch])

  return (
    <>
    {/* button for the opening the add new product form */}
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=>setOpenCreateProduct(true)}> Add New Product </Button>
      </div>

      {/* grid for showing the products */}
      <div className=' grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          productList && productList.length > 0 ?
          ( productList.map((productItem) => ( <ProductDashboard key={productItem._id} product={productItem} setCurrentEditedId={setCurrentEditedId} setOpenCreateProduct={setOpenCreateProduct} setFormData={setFormData} deleteProductHadler={deleteProductHadler}/> ))) 
          : 
          null
        }
      </div>

      {/*sheet is used here for the right side part to come over the all part*/}
      <Sheet open={openCreateProduct} onOpenChange={()=>{
        setOpenCreateProduct(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
      }}>
        <SheetContent side='right' className="overflow-auto p-5">
          <SheetHeader>
            <SheetTitle>Add new Product</SheetTitle>
          </SheetHeader>  
          
          {/* imageuploader to send image to the cloud and get the url from their */}
          <Imageuploader imagefile={imagefile} setImageFile={setImageFile} imageUrl={imageUrl} setImageUrl={setImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isEditMode={currentEditedId}/>
          <div className='py-6'>
            {/* remaining part of the form for the rest of the detail of the product/*/}
            <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText="Add" formControls={addProductFormElements} isBtnDisabled={!isFormValid()}/>
          </div>
        </SheetContent> 
      </Sheet>
    </>
  )
}

export default AdminProduct