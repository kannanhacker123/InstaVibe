import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { ModeToggle } from '@/components/modeToggle'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Bell, HomeIcon, User2 } from 'lucide-react'
import { SignInButton, UserButton } from '@clerk/nextjs'

const DesktopNav = async () => {
    const user = await currentUser()
    // console.log(user)
    return (
        <div className='hidden md:flex items-center space-x-4'>
            <ModeToggle />

            <Button variant={"ghost"} className='flex items-center gap-2' asChild>
                <Link href={"/home"} >
                    <HomeIcon className="h-4 w-4" />
                    <span className='hidden lg:inline'>Home</span>
                </Link>
            </Button>
            {user ? (
            <div className='flex items-center space-x-4'>
                <Button variant={"ghost"} className='flex items-center gap-2'asChild> 
                    <Link href={'/notifications'}>
                        <Bell className="h-4 w-4" />
                        <span className='hidden lg:inline'>Notification</span>
                    </Link>
                </Button>
                <Button variant={"ghost"} className='flex items-center gap-2'asChild> 
                    <Link href={'/profile'}>
                        <User2 className="h-4 w-4" />
                        <span className='hidden lg:inline'>Profile</span>
                    </Link>
                </Button>
                <UserButton />
            </div>
            ) :
                <SignInButton mode='modal'>
                    <Button variant={"default"}>Sign In</Button>
                </SignInButton>}
        </div>
    )
}

export default DesktopNav