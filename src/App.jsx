import { useState } from 'react'
import Header from '@/components/Header';
import { useUser } from '@clerk/clerk-react';
import { ThemeProvider } from '@/components/theme'
import { Navigate, Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import './App.css'


function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to='/auth/sign-in' />;
  }
  if (!isSignedIn && isLoaded) {
    return <Navigate to='/auth/admin' />;
  }

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <Header />
      <Outlet />
      <Toaster />
    </ThemeProvider>

    </>
  )
}

export default App
