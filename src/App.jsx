import Router from '@/routes';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/register';

function App() {
  const token = localStorage.getItem('auth_token') || null;
  const role = localStorage.getItem('role') || null;
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/signin' element={token !== null ? role === 'admin' ? <Navigate replace to={'/dashboard'} /> : <Navigate replace to={'/'} /> : <Login />} />
        <Route path='/signup' element={token !== null ? <Navigate replace to={'/'} /> : <Register />} />
        <Route path='/forgot-password' element={token !== null ? <Navigate replace to={'/'} /> : <Register />} />

        {/* Main Router - This should come before the catch-all route */}
        <Route path='/*' element={<Router />} />

        {/* Catch all route - This should be last */}
        <Route path='*' element={<Navigate replace to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;