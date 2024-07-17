import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import HomePage from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { EditIcon } from 'lucide-react'
import EditResume from './dashboard/resume/[resumeid]/edit/index.jsx'
import ViewResume from './my-resume/[resumeid]/view/index.jsx'
import About from './home/about.jsx'
import Admin from './auth/admin/index.jsx'

 

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY){
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
     
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path:'/dashboard/resume/:resumeid/edit',
        element:<EditResume/>
      },
      {
        path:'/my-resume/:resumeid/view',
        element:<ViewResume/>
      }
    ],
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <About/>
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage/>,
  },
  {
    path: '/auth/admin',
    element: <Admin/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <RouterProvider router={router} />
    </ClerkProvider> 
  </React.StrictMode>
)
