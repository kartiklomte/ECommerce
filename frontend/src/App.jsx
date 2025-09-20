import './App.css'
import { Routes, Route , Navigate } from 'react-router-dom';
import AuthLayout from './components/auth/layout.jsx';
import AuthLogin from './pages/auth/login.jsx'
import AuthRegister from './pages/auth/register.jsx';
import AdminLayout from './components/admin/layout.jsx'
import AdminDashboard from './pages/admin/dashboard.jsx';
import AdminFeatures from './pages/admin/features.jsx';
import AdminOrders from './pages/admin/orders.jsx';
import AdminProduct from './pages/admin/product.jsx';
import UserLayout from './components/user/layout.jsx'
import NotFound from './pages/NotFound/index.jsx';
import UserHome from './pages/user/home.jsx';
import UserAccount from './pages/user/account.jsx';
import Checkout from './pages/user/checkout.jsx';
import ProductList from './pages/user/list.jsx';
import Checking from './common/checking.jsx';
import UnAuthPage from './pages/unauth/index.jsx';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { chechAuth } from './store/auth-slice/auth';
import { Skeleton } from "@/components/ui/skeleton"
import PaymentInfo from './pages/user/paymentInfo';
import Paymentfail from './pages/user/paymentfail';

function App() {

  const {isauthenticated, user , isLoading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  //cheking every time if the user is authicated or not
  useEffect(()=>{
    dispatch(chechAuth())
  },[dispatch])

  //animation while the page is loading
  if(isLoading) return <Skeleton className="h-[400px] w-[400px] rounded-4xl bg-gray-300 mx-auto items-center mt-[10%]" />

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
    
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        <Route path='/auth' element={<Checking isauthenticated={isauthenticated} user={user}> <AuthLayout/> </Checking> }>
          <Route path='login' element={<AuthLogin/>} />
          <Route path='register' element={<AuthRegister/>} />
        </Route>

        <Route path='/admin' element={<Checking isauthenticated={isauthenticated} user={user}> <AdminLayout/></Checking>}>
          <Route path='dashboard' element={<AdminDashboard/>} />
          <Route path='features' element={<AdminFeatures/>} />
          <Route path='orders' element={<AdminOrders/>} />
          <Route path='products' element={<AdminProduct/>} />
        </Route>

        <Route path='/user' element={<Checking isauthenticated={isauthenticated} user={user}> <UserLayout/></Checking>}> 
          <Route path='home' element={<UserHome/>} />
          <Route path='list' element={<ProductList/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='account' element={<UserAccount/>} />
          <Route path='paypal-return' element={<PaymentInfo/>}/>
          <Route path='paypal-cancel' element={<Paymentfail/>}/>
        </Route>

        <Route path='unauth-page' element={<UnAuthPage/>}> </Route>

        <Route path='*' element={<NotFound/>}> </Route>
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
