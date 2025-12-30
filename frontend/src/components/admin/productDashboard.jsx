

import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const ProductDashboard = ({product,setCurrentEditedId,setOpenCreateProduct,setFormData,deleteProductHadler}) => {
    
    //function for showing details of the product when click on the edit button
    function editProductFunction(){
        setOpenCreateProduct(true);
        setCurrentEditedId(product?._id);
        setFormData(product);
    }

  return (
    <Card className='w-full max-w-sm mx-auto pt-0 hover:shadow-2xl hover:scale-105'>
        <div className=''>
            <img src={product?.image} alt={product?.title} className='w-full h-[350px] object-cover rounded-t-lg' loading="lazy" />
        </div>
        <CardContent>
            <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
            <div className='flex justify-between items-center mb-2'>
                <span className={`
                    ${product?.salePrice > 0 ? 
                    'line-through' 
                    : 
                    '' }text-lg font-semibold text-primary`}>${product?.price}</span>
                <span>{
                    product?.salePrice>0 ? 
                    <span className='text-lg font-bold'>${product?.salePrice}</span> 
                    : 
                    null
                    }</span>
            </div>
        </CardContent>
        <CardFooter className={'flex justify-between items-center'}>
            <Button onClick={()=>editProductFunction()}>Edit</Button>
            <Button onClick={()=>deleteProductHadler(product._id)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default ProductDashboard