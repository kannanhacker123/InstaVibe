import React from 'react'
import Link from 'next/link'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import { currentUser } from '@clerk/nextjs/server'
import { syncUser } from '@/actions/user.action'
import { SignInButton } from '@clerk/nextjs'

const NavBar = async () => {
  const user =  await currentUser()

  if(user) {await syncUser()} else return null;
  return (
    <nav className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='text-xl text-primary font-bold font-mono tracking-wider'>
              InstaVibe
            </Link>
          </div>
            <DesktopNav />
            <MobileNav />
        </div>
      </div>
    </nav>
  )
}

export default NavBar