import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { brandOptionMap, catagoryOptionMap } from '@/config'

const ProductDashboard = ({product, handleProductDetails, handleAddToCard}) => {

  return (
    <Card className='w-full max-w-sm pt-0 mx-auto hover:scale-101 hover:shadow-2xl'>
        <div onClick={()=>handleProductDetails(product?._id)} className=''>
            <div className='relative'>
                <img src={product?.image} alt={product?.title} className='w-full h-[370px] object-cover rounded-t-lg' loading="lazy"/>
                {
                    product?.salePrice > 0 ?
                    <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                        Sale
                    </Badge>
                    :
                    null
                }
            </div>
            <CardContent className='flex flex-col'>
                <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''}text-lg font-semibold text-primary`}>{catagoryOptionMap[product?.category]}</span>
                    {
                        product?.salePrice > 0 ?
                        <span className='text-lg font-semibold text-primary'>{brandOptionMap[product?.brand]}</span>
                        :
                        null 
                    }
                </div>
                <div className='flex justify-between items-center mb-2'>
                <span className={`
                    ${product?.salePrice> 0  ? 
                    'line-through ' 
                    : 
                    '' }text-lg font-semibold text-primary`}>${product?.price}</span>
                <span>{
                    product?.salePrice> 0 ? 
                    <span className='text-lg font-bold text-red-600'>${product?.salePrice}</span> 
                    : 
                    null
                    }</span>
            </div>
            </CardContent>

            
        </div>
        <CardFooter>
                <Button className={'w-full'} onClick={()=>handleAddToCard(product?._id)}> Add To Cart</Button>
        </CardFooter>
    </Card>
  )
}

export default ProductDashboard