import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src={'/educraftlogo.svg'} width={40} height={40} alt='Image not working'/>
        <UserButton/>
    </div>
  )
}

export default Header