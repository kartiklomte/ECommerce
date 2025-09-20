import {  LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.jpg'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { userViewMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { logoutUser } from '@/store/auth-slice/auth'
import { toast } from 'react-toastify'
import CartWapper from './cartWapper'
import { fetchCartItems } from '@/store/user/cart-slice'
import { Label } from '../ui/label'

const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet,setOpenCartSheet] = useState(false);

  //for taking data from the store(token) for getting user data
  const { user} = useSelector(state => state.auth);

  //for fetching data of the included card items
  const {cartItems} = useSelector(state => state.shopCart)

  function handleNavigate(getcurrentMenuItem){
    sessionStorage.removeItem('filters'); 
    
    const currentFilter = 
      getcurrentMenuItem.id !== 'home' ? 
      {
        category : [getcurrentMenuItem.id]
      }
      :
      null;

    sessionStorage.setItem('filters',JSON.stringify(currentFilter));

    navigate(getcurrentMenuItem.path);
  }

  // for mapping the header components which will be taken from the userMenuItem array store in index.js in config
  function MenuItems(){
    return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        userViewMenuItems.map(menuItems => <Label key={menuItems.id} onClick={()=>handleNavigate(menuItems)} className='text-sm font-medium'>{ menuItems.label}</Label>)
      }
    </nav>
  }

  // log out function
   function handleLogout(){
    dispatch(logoutUser());
    toast.success('log out successfull');
  }

  //for mapping the components which will be only visible to authonticated user
  function HeaderRightContent (){
    return <div className='flex flex-col lg:flex-row gap-4 lg:items-center'>

      {/** shopping card button */}
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
        <Button variant='outline' onClick={()=>setOpenCartSheet(true)}>
          <ShoppingCart  className='h-6 w-6'/>
          <span className='sr-only'> User Card</span>
        </Button>
        <CartWapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items : []}/>
      </Sheet>

      {/** green dot name logo */}
      <DropdownMenu>
        {/** big dot with first name letter inside */}
        <DropdownMenuTrigger asChild>
          <Avatar className='bg-green-800'>
            <AvatarFallback className='bg-green-800 text-white font-bold text-md'>
              { user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/** content to show when down menu is triggered */}
        <DropdownMenuContent side='right' className='w-56'>
          <DropdownMenuLabel> logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />  {/* for marking line between the name below things */}
          <DropdownMenuItem onClick={()=> navigate('/user/account')}>
            <UserCog />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />  {/* for marking line between the name below things */}
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut/>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  }

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])  

  return (
    <header className=' sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-20 items-center justify-between px-6 md:px-6'>

        {/* logo of the header */}
        <Link to='/user/home' className='flex items-center p-1 gap-2 rounded-full bg-[#CEF0FF]'>
          <img src={logo} className='h-12 hadow-2xl'/>
        </Link>

        {/* component rendering  for small screens*/}
        <Sheet>
          {/* toggle button for the opening and closing of the menu of small screens */}
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6'/>
              <span className='sr-only'> Toggle Menu Bar </span>
            </Button>
          </SheetTrigger>

          {/* main content of the header with all component*/}
          <SheetContent side='left' className='w-full max-w-xs p-5'>
            <HeaderRightContent />
            <MenuItems />
          </SheetContent>
        </Sheet>

        {/** filter header component for lg screen */}
        <div className='hidden lg:block'>
          <MenuItems />
        </div>

        {/** name  */}
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div> 
      </div>
    </header>
  )
}

export default UserHeader