import CommonForm from '@/common/form'
import { LoginFormControls } from '@/config/index'
import { loginUser } from '@/store/auth-slice/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState = {
  email : '', 
  password : ''
}

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState )
  const dispatch = useDispatch();

  async function onSubmit(event){
    event.preventDefault();

    try {
        const res = await dispatch(loginUser(formData)).unwrap();
        toast.success(res.message || 'log in successfully');
      } catch (err) {
        console.error("Registration error:", err?.message);
        toast.error(err?.message || 'error occur while logging');
      }
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Login to your account</h1>
        <p className='mt-2'>
          Don't have account 
          <Link to='/auth/register' className='font-medium ml-2 text-primary hover:underline'> Register </Link>
        </p>
      </div>
      <CommonForm
      formControls={LoginFormControls}
      buttonText={'sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit = {onSubmit}
      />
    </div>
  )
}

export default AuthLogin