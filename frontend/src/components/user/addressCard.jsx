import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressinfo,handleDeleteAddress,handleUpdateAddress,setCurrentSelectedAddress}) => {
  
  return (
    <div>
      <Card onClick={setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressinfo): null}>
        <CardContent className={'grid gap-4 '}>
            <Label>Address: {addressinfo?.address}</Label>
            <Label>City: {addressinfo?.city}</Label>
            <Label>Pincode: {addressinfo?.pincode}</Label>
            <Label>Phone no: {addressinfo?.phone}</Label>
            <Label>note: {addressinfo?.notes}</Label>
        </CardContent>

        <CardFooter className={'flex justify-between px-3'}>
          <Button onClick={()=>handleUpdateAddress(addressinfo)}>Edit</Button>
          <Button onClick={()=>handleDeleteAddress(addressinfo)}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddressCard
