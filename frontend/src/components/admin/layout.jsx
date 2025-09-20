import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";

import React, { useState } from 'react'

const AdminLayout = () => {
  const [opensidebar,setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">

            {/* admin sidebar */}
            <AdminSideBar open={opensidebar} setOpen={setOpenSidebar}/>

            <div className="flex flex-1 flex-col">

                {/* admin header */}
                <AdminHeader setOpen={setOpenSidebar}/>
                
                {/* admin main section */}
                <main className="flex flex-1 flex-col p-4 md:p-6">
                    <Outlet />
                </main>
            </div>

        </div>
  )
}

export default AdminLayout;