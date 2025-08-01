import { get3RandomUsers } from '@/actions/user.action'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Avatar, AvatarImage } from './ui/avatar'
import FollowButton from './FollowButton'

const SuggestedForYou = async () => {
    const users = await get3RandomUsers()
    if(!users) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Suggested For You</CardTitle>
          <Link href="/explore" className="text-primary text-sm font-semibold hover:underline">
            See all
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex gap-2 items-center justify-between ">
              <div className="flex items-center gap-1">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage src={user.img ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link href={`/profile/${user.username}`} className="font-medium cursor-pointer">
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">{user._count.followers} followers</p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SuggestedForYou