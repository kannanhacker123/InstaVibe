import { prisma } from "@/lib/prisma";

export const searchPosts = async (query: string) => {
  const posts = await prisma.post.findMany({
    where: {
      content: {
        contains: query,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          img: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              img: true,
            },
          },
        },
      },
      likes: true,
      _count: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};
