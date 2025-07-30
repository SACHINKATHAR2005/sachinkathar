import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import BlogPage from './pages/blogPage'
import CretificatePage from './pages/certificatePage'
import LoginPage from './components/admin-component/login/Index'
import ProtectedRoute from './components/protedtedRoute/Index'
import AdminDashboard from './components/admin-component/dashboard/Index'
import { authContext } from './context/context'
import { useContext } from 'react'
import AdminLayoutPage from './components/admin-component/admin layout/laout'

import AdminCertificatePage from './components/admin-component/pages/certificate'
import AdminBlogPage from './components/admin-component/pages/blog'
import AdminProfilePage from './components/admin-component/pages/profile'
import ProjectPage from './components/admin-component/pages/project'


function App() {

  const { admin ,loading} = useContext(authContext);

  


if (admin === null) return <div>Loading...</div>; 

loading && <div>Loading...</div>;
 

  return (
    <>

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/blog/:id' element={<BlogPage/>}/>
      <Route path='/certificate/:id' element={<CretificatePage/>}/>
      <Route path ='/login' element={<LoginPage/>}/>
      <Route path='/admin' 
      element={
        <ProtectedRoute>
            <AdminLayoutPage/>
        </ProtectedRoute>
      }>
        
        <Route index element={<AdminDashboard/>} />
        <Route path='project' element={<ProjectPage/>}/>
        <Route path='certificate' element={<AdminCertificatePage/>}/>
        <Route path='blog' element={<AdminBlogPage/>}/>
        <Route path='profile' element={<AdminProfilePage/>}/>
      </Route>
    </Routes>

    </>
  )
}

export default App
