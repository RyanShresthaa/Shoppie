import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './redux/userSlice'
import { useDispatch } from 'react-redux'

function App(){
  const dispatch = useDispatch()

  const fetchUser = async()=>{
     const userData = await fetchUserDetails()
     dispatch(setUserDetails(userData?.data || {}))
    }

  useEffect(()=>{
   fetchUser()
    },[])
  return (
<>
<Header/>
<main className='flex-1 min-h-0 w-full pb-8'>
<Outlet/>
</main>
<Footer/>
<Toaster
        position="top-center"
        toastOptions={{
          duration: 3200,
          style: {
            borderRadius: "14px",
            padding: "12px 16px",
            fontSize: "0.9rem",
            boxShadow: "0 4px 24px rgba(15, 23, 42, 0.12)",
          },
          success: {
            iconTheme: { primary: "#059669", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#dc2626", secondary: "#fff" },
          },
        }}
      />
</>
  )
}

export default App