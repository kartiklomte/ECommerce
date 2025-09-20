import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, PackageCheck, ShoppingBasket, ChartNoAxesCombined } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';


const AdminSidebarMenuItems = [
    {
        id : 'dashboard',
        label : 'Dashboard',
        path : '/admin/dashboard',
        icon : <LayoutDashboard />
    },
    {
        id : 'products',
        label : 'Products',
        path : '/admin/products',
        icon : <ShoppingBasket />
    },
    {
        id : 'orders',
        label : 'Orders',
        path : '/admin/orders',
        icon : <PackageCheck />
    },
];


const MenuItem = ({setOpen}) => {
  const navigate = useNavigate();
  return <nav className='mt-8 flex-col flex gap-2'>
    {
      AdminSidebarMenuItems.map(menuItem=> <div key={menuItem.id} onClick={()=> {
        navigate(menuItem.path);
        setOpen ? setOpen(false) : null;
      }} className='flex items-center gap-2 rounded-md px-3 py-2 text-xl text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer'>
        {menuItem.icon}
        <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
}


const AdminSideBar = ({open,setOpen}) => {
  const navigate = useNavigate();


  return (
    <>

    {/* the sheet made for the small screen devices menu bar. this will get ativated once the menu btn is pressed */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className="w-64">
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b'>
              <SheetTitle className="flex gap-2 mt-5 mb-4">
                <ChartNoAxesCombined size={25}/>
                <span className='font-bold text-2xl text-shadow-lg'>Admin Panel</span> 
              </SheetTitle>
              <MenuItem setOpen={setOpen}/>
            </SheetHeader>
          </div>
        </SheetContent>
      </Sheet>

      {/* for destop */}
      <aside className='hidden w-[260] flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={()=>navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer'>
          <ChartNoAxesCombined size={25}/>
          <h1 className='font-bold text-2xl text-shadow-lg '>
            Admin Dashboard</h1>
        </div>
        <MenuItem />
      </aside>
    </>
  )
}

export default AdminSideBar