import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import { SignIn } from '@clerk/clerk-react'
import { dark, neobrutalism } from '@clerk/themes'
import Footer from '../components/Footer'
import herodna from '/assets/herodna.jpg'
import { useEffect } from 'react'
import AOS from 'aos'
import Animalogin from '../components/Animalogin'



const Login = () => {
    useEffect(() => {
        AOS.init({
        duration: 1000
        })
    }, [])
  return (
    <>
        
        <Navbar credentials={false} fixed={false}/>
        <div className='flex items-center ' data-theme='dark'
        style={{ backgroundImage: `url(${herodna})`,backgroundSize:'cover',backgroundBlendMode:'soft-light',backgroundPosition:'center',height:'100vh'}}>
            <div className='flex py-20 sm:items-center  w-full h-screen'>
                <div data-aos='fade-right'  className='w-1/2 hidden sm:block'>
                    <Animalogin/>
                </div>
                <div className='clerk-sign-in w-100 px-4 sm:px-10 ' data-aos='zoom-in'  data-aos-easing="linear" data-aos-duration='1000'>
                    <SignIn
                    withSignUp={true}
                    signInUrl='/register'
                    forceRedirectUrl={'/chat'}
                    appearance={{
                        baseTheme: dark,
                    }}
                    />
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Login