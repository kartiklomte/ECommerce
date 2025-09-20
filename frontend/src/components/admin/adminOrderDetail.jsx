import React, { useState } from 'react'
import { Label } from '../ui/label'
import { DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import CommonForm from '@/common/form'

const initialFormData = {
    status: ""
}

const AdminOrderDetail = () => {

    const [formData,setFormData] = useState(initialFormData);

    function handleSubmitStatus(event){
        event.preventDefault();
    }

  return (
    <DialogContent className='sm:max-w-[500px]'>

        <div className='grid gap-2'>
            <div className='flex items-center justify-between mt-6'>
                <p className='font-medium'>OrderId</p>
                <Label>341241</Label>
            </div>
            <div className='flex items-center justify-between mt-6'>
                <p className='font-medium'>Order Date</p>
                <Label>17/09/2023</Label>
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

        <div>
            <CommonForm formControls={[
                {
                    name: "status",
                    label: "Order Status",
                    componentType: "select",
                    options: [
                    { id: "pending", label: "Pending" },
                    { id: "inprocess", label: "In Proccess" },
                    { id: "inshipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                    ],
                }
            ]} formData={formData} setFormData={setFormData} buttonText={"Update Order Stauts"} onSubmit={handleSubmitStatus}/>
        </div>

    </DialogContent>
  )
}

export default AdminOrderDetail
