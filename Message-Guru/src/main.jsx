import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login.jsx'
import RegisterPage from './components/Register/RegisterPage.jsx'
import Form from './components/form/Form.jsx'
import ViewSavedCredentials from './components/navbar/viewSavedCredentials/ViewSavedCredentials.jsx'
import SaveMailCredentials from './components/navbar/saveMailCredentials/SaveMailCredentials.jsx'
import Folder from './components/folder/Folder.jsx'
import EmailForm from './components/form/EmailForm.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path = 'login' element={<Login/>}/>
        <Route path = '/' element={<RegisterPage/>}/>
        <Route path = 'form' element={<EmailForm/>}/>
        <Route path = 'SaveMailCredentials' element={<SaveMailCredentials/>}/>
        <Route path = 'ViewSavedCredentials' element={<ViewSavedCredentials/>}/>
        <Route path = 'folder' element={<Folder/>}/>
        {/* <Route path = 'CreateAccount' element={<CreateAccountPage/>}/>
        <Route path = 'form' element={<Form/>}/>
        <Route path = 'SaveMailCredentials' element={<SaveMailCredentials/>}/>
        <Route path = 'ViewSavedCredentials' element={<ViewSavedCredentials/>}/> */}
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
