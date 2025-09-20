import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/store/auth-slice/auth";
import { toast } from 'react-toastify';


const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch();

  function handleLogOut(){
    dispatch(logoutUser());
    toast.success('LogOut successfully');
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={()=> setOpen(true)} className=" lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">toggle menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow" onClick={()=>handleLogOut()}>
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader