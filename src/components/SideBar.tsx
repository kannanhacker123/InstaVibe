import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { get } from 'http'
import { getUserByClerkId } from '@/actions/user.action'
import { log } from 'console'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { LinkIcon, MapPinIcon } from 'lucide-react'


const SideBar = async () => {
  const authuser = await currentUser()
  if (!authuser) return <UnAuthSidebar />
  const user = await getUserByClerkId(authuser.id);
  if (!user) return null;

  // console.log(user);

  return (
    <div className='sticky top-20'>
      <Card className='pt-5'>
        <CardContent>
          <div className="flex flex-col items-center text-center">
          <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className='w-20 h-20 border-2'>
                <AvatarImage src={user.img || "/avatar.png"} alt='ProfileImg' />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className='mt-2 space-y-2'>
                <h3 className='font-semibold'>{user.name}</h3>
                <p className='text-sm text-muted-foreground'>{user.username}</p>
              </div>
            </Link>
            {user.bio && <p className='text-sm text-muted-foreground mt-2'>{user.bio}</p>}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
            
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2"/>
                {user.location || " "}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0"/>
                {user.website ? (
                  <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
                    {user.website}
                  </a>
                ) : (
                  " "
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SideBar

export const UnAuthSidebar = () => (
  <div>
    <Card>
      <CardHeader>
        <CardTitle className='text-center font-semibold text-xl'>Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-center text-muted-foreground mb-4'>Login to access your profile and connect with others</p>
        <div className='flex flex-col gap-4'>
          <SignInButton mode='modal'>
            <Button variant={'outline'}>Login</Button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      </CardContent>
    </Card>
  </div>
)