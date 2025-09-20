import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'

const UserOrderDetail = () => {
  return (
    <DialogContent className='sm:max-w-[500px]'>

        <div className='grid gap-2'>
            <div className='flex items-center justify-between mt-6'>
                <p className='font-medium'>OrderId</p>
                <Label>7383263</Label>
            </div>
            <div className='flex items-center justify-between mt-6'>
                <p className='font-medium'>Order Date</p>
                <Label>23/09/2023</Label>
            </div>
            <div className='flex items-center justify-between mt-6'>
                <p className='font-medium'>Order Price</p>
                <Label>500</Label>
            </div>
            <div className='flex items-center justify-between mt-6'>
                <p className='font-medium'>Order Status</p>
                <Label>Delivered</Label>
            </div>
        </div>

        <Separator/>

        <div className='grid gap-4'>
            <div className='grid gap-2'>
                <div className='font-medium'>Order Details</div>
                <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                        <span>Product One</span>
                        <span>$500</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className='grid gap-4'>
            <div className='grid gap-2'>
                <div className='font-medium'>Shpping Information</div>
                <div className='grid gap-0.5 text-muted-foreground'>
                    <span>Baburao Ganpatrao Apte</span>
                    <span>Address</span>
                    <span>City</span>
                    <span>Pincode</span>
                    <span>Phone Number</span>
                    <span>Notes</span>
                </div>
            </div>
        </div>

    </DialogContent>
  )
}

export default UserOrderDetail
