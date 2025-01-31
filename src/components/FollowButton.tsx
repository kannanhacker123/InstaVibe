"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { toggleFollow } from '@/actions/user.action'

const FollowButton = ({userId}: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleFollow = async () => {
    setIsLoading(true)
    try {
      await toggleFollow(userId);
      toast.success('User followed successfully')
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <Button 
      variant="secondary"
      size={"sm"}
      disabled={isLoading}
      className="w-20 rounded-md"
      onClick={handleFollow}>
      {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : 'Follow'}
    </Button>
  )
}

export default FollowButton