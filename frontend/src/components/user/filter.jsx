import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = ({filter,handleFilter}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
            <h2 className='text-lg font-semibold'>Filters</h2>
        </div>
        <div>{
          Object.keys(filterOptions).map(keyItems => 
            <Fragment key={keyItems}>
              <div className='p-4 space-y-4'>
                <h3 className='text-base font-bold'>{keyItems}</h3>
                <div className='grid gap-2 mt-2'>
                  {
                    filterOptions[keyItems].map((option) => (<Label key={option.id} className='flex items-center gap-2 font-medium'>
                      <Checkbox checked={
                        filter && Object.keys(filter).length > 0 && filter[keyItems] && filter[keyItems].indexOf(option.id) > -1
                      } onCheckedChange={()=>handleFilter(keyItems, option.id)}/>
                      {option.label}
                    </Label>))
                  }
                </div>
              </div>
              <Separator/>
            </Fragment>
          )
        }</div>
    </div>
  )
}

export default ProductFilter