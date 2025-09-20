import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '@/common/form'
import { addressFormControls } from '@/config'
import { Item } from '@radix-ui/react-dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, fetchAllAddresses, updateAddress } from '@/store/user/address-slice'
import { toast } from 'react-toastify';
import AddressCard from './addressCard'

const initialAddressFormData ={
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: ""
}

const Address = ({setCurrentSelectedAddress}) => {
    const dispatch = useDispatch();
    const [formData,setFormData] = useState(initialAddressFormData);
    const {user} = useSelector(state=>state.auth);
    const {addressList} = useSelector(state=>state.userAddress);
    const [currentUpdatedId, setCurrentUpdatedId] = useState(null);

    // this function will work when the add or update button is hit
    function handleManageAddress(event){
        event.preventDefault();

        // only three address can be store for one user.
        if(addressList.length>=3 && currentUpdatedId === null){
            setFormData(initialAddressFormData);
            toast.warning("upto only 3 Addresses can be added");
            return;
        }

        currentUpdatedId !== null ? 
            dispatch(updateAddress({userId: user?.id, addressId: currentUpdatedId,formData}))
            .then(data=>{
                if(data.payload.success){
                    toast.success('Address Updated successfully');
                    dispatch(fetchAllAddresses(user?.id));
                    setFormData(initialAddressFormData);
                    setCurrentUpdatedId(null);
                }
            })
        : 
            dispatch(addNewAddress({...formData,userId: user?.id}))
            .then(data=>{
                if(data.payload.success){
                    toast.success('Address add successfully');
                    dispatch(fetchAllAddresses(user?.id));
                    setFormData(initialAddressFormData);
                }else{
                    toast.error('some thing wrong happen please try again');
                }
            })
    }
    
    function isFormValid(){
        return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
    }

    //for deleting the address
    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAddress({userId: user.id, addressId: getCurrentAddress._id}))
        .then(data=>{
            if(data.payload.success){
                toast.success('Address deleted successfully');
                dispatch(fetchAllAddresses(user?.id));
            }
        })
    }

    // for updating/ editing address
    function handleUpdateAddress(getCurrentAddress){
        setCurrentUpdatedId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes
        })
    }

    useEffect(() => {
      dispatch(fetchAllAddresses(user?.id));
      }, [dispatch]);

  return (
    <Card>
        <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
                addressList && addressList.length>0 ?
                    addressList.map(itemAddress=><AddressCard addressinfo={itemAddress} key={itemAddress._id} handleDeleteAddress={handleDeleteAddress} handleUpdateAddress={handleUpdateAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}/>)
                :
                    null
            }
        </div>

        <CardHeader>
            <CardTitle>{ currentUpdatedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
        </CardHeader>

        <CardContent className={'space-y-3'}>
            <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={ currentUpdatedId !== null ? "Update" : "Add"} onSubmit={handleManageAddress} isBtnDisabled={!isFormValid()}/>
        </CardContent>
    </Card>
  )
}

export default Address
