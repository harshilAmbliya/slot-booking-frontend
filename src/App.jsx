import Router from '@/routes';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/register';
import BookSlot from '@/pages/slots/BookSlot';
import AdminUser from './pages/admin/AdminUser';

function App() {
  const token = localStorage.getItem('auth_token') || null;
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isToken = localStorage.getItem('auth_token') || null;

  return (
    <>
      <Routes>
        <Route path='/signin' element={isToken !== null ? user === 'admin' ? <Navigate replace to={'/admin'} /> : <Navigate replace to={'/'} /> : <Login />} />
        <Route path='/signup' element={token !== null ? <Navigate replace to={'/'} /> : <Register />} />
        <Route path='/forgot-password' element={token !== null ? <Navigate replace to={'/'} /> : <Register />} />

        {(user?.role || "user") === 'user' ? <Route path='/' element={token !== null ? <BookSlot /> : <Navigate replace to={'/signin'} />} /> :
          <Route path='/admin' element={token !== null ? <><AdminUser /></> : <Navigate replace to={'/signin'} />} />}
        <Route path='/*' element={<Router />} />
        <Route path='*' element={<Navigate replace to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;