"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { use } from "react";

export async function syncUser() {
    try {
        const {userId} = await auth();
        const user = await currentUser();
        if(!user || !userId) return;
        // check if user exists
        const existsingUser = await prisma.user.findFirst({
            where: {
                clerkId: userId
            }
        })
        if(existsingUser) return existsingUser;
        const dbUser =  await prisma.user.create({
            data: {
                clerkId: userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ??user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                img: user.imageUrl,
            }
        })
    } catch (error) {
        
    }
}

export async function getUserByClerkId(clerkId: string) {
    return await prisma.user.findFirst({
        where: {
            clerkId
        },
        include: {
            _count:{
                select: {
                    followers: true,
                    following: true,
                    posts: true
                }
            }
        }
    })
}

export async function getDbUserId() {
    const { userId:clerkId } = await auth();
    if(!clerkId) return null
    
    const user  = await getUserByClerkId(clerkId)
    if(!user) throw new Error("User not Found")

    return user.id
}

export async function get3RandomUsers() {
    const dbUserId = await getDbUserId();
    // find 3 random users
    try {
        if(!dbUserId) return ;
        const randomUsers = await prisma.user.findMany({
            where: {
                AND: [{
                  NOT: {id: dbUserId}  
                },{
                    NOT: {followers:{some: {
                                followerId: dbUserId}}
                    }
                }]},
                select:{
                    id: true,
                    name: true,
                    username: true,
                    img: true,
                    _count: {
                        select: {followers: true,}
                    }},
                take: 3,
        })
        return randomUsers
    } catch (error) {
        console.log("Error getting random users", error);
        return [];
    }
    
}

export async function toggleFollow(tagetUserId: string){
    try {
        const userId = await getDbUserId();
        if(!userId) return ;

        if(userId === tagetUserId) throw new Error("You can't follow yourself");
        const existingFollow = await prisma.follows.findUnique({
            where:{
                followerId_followingId:{
                    followerId: userId,
                    followingId: tagetUserId
                }
            }
        })
        if(existingFollow){
            // unfollow
            await prisma.follows.delete({
                where:{
                    followerId_followingId:{
                        followerId: userId,
                        followingId: tagetUserId
                    }
                }
            })
        }else{
            // follow
            await prisma.$transaction([
                prisma.follows.create({
                    data: {
                        followerId: userId,
                        followingId: tagetUserId
                    }
                }),
                prisma.notification.create({
                    data: {
                        type: "FOLLOW",
                        userId: tagetUserId, // user being followed
                        creatorId: userId // user who is following
                    }
                })
            ])
        }
        revalidatePath("/");
        return {success: true}
    } catch (error) {
        console.log("Error following user in user.action", error);
        return {success: false, message: "Failed to follow user"}
    }
}