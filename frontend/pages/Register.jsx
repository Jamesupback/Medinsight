import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import { SignUp } from '@clerk/clerk-react'
import { dark, neobrutalism } from '@clerk/themes'
import Footer from '../components/Footer'
import herodna from '/assets/herodna.jpg'
import { useEffect } from 'react'
import AOS from 'aos'
import Animaloglap from '../components/Animaloglap'


const Register = () => {
    useEffect(() => {
        AOS.init({
        duration: 500
        })
    }, [])
  return (
    <>
        <Navbar credentials={false} fixed={false}/>
        <div className='flex items-center ' data-theme='dark'
        style={{ backgroundImage: `url(${herodna})`,backgroundSize:'cover',backgroundBlendMode:'soft-light',backgroundPosition:'center',height:'100vh'}}>
            <div className='flex items-center py-20 w-full h-screen'>
                <div data-aos='fade-right'  className='w-1/2 hidden sm:block'>
                    <Animaloglap/>
                </div>
                <div className='clerk-sign-in w-24 px-5 sm:px-16 ' data-aos='zoom-out'  data-aos-easing="linear" data-aos-duration='1000'>
                    <SignUp
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

export default Register