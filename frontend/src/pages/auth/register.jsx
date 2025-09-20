import CommonForm from '@/common/form'
import RegisterFormControls from '../../config/index'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/auth-slice/auth'
import { toast } from 'react-toastify';


const initialState = {
  userName : '',
  email : '', 
  password : ''
}


const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(event) {
  event.preventDefault();
  console.log(formData);

  try {
    const res = await dispatch(registerUser(formData)).unwrap();
    toast.success(res.message || 'Registered successfully');
    navigate('/auth/login');
  } catch (err) {
    console.error("Registration error:", err?.message);
    toast.error(err?.message || 'Registration failed');
  }
}

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>create new account</h1>
        <p className='mt-2'>
          already have an account
          <Link to='/auth/login' className='font-medium ml-2 text-primary hover:underline'> Login </Link>
        </p>
      </div>
      <CommonForm
      formControls={RegisterFormControls}
      buttonText={'signUp'}
      formData={formData}
      setFormData={setFormData}
      onSubmit = {onSubmit}
      />
    </div>
  )
}

export default AuthRegister