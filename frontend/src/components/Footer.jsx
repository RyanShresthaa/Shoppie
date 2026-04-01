import React from 'react'
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";



const Footer = () => {
  return (
<footer className="border-t bg-white pb-[env(safe-area-inset-bottom)]">
<div className="container mx-auto px-4 py-5 text-center flex flex-col lg:flex-row lg:justify-between gap-4">
    <p> © All rights reserved</p>
    <div className='flex items-center gap-4 justify-center text-2xl'>
        <a href="" className='hover:text-primary-light'>
            <IoLogoInstagram/>
        </a>
        <a href="" className='hover:text-primary-light'>
            <FaFacebook/>
        </a>
        <a href="" className='hover:text-primary-light'>
            <FaLinkedin/>
        </a>
        <a href="" className='hover:text-primary-light'>
            <SiGmail/>
        </a>
    </div>
</div>
</footer>
  )
}

export default Footer