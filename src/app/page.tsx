import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/modeToggle";
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/CreatePost";
import SuggestedForYou from "@/components/SuggestedForYou";
import PostCard from "@/components/PostCard";
import { getPosts } from "../actions/post.action";
import { getDbUserId } from "../actions/user.action";


export default async function Home() {
  const user = await currentUser()
  const post =  await getPosts();
  // console.log(post);
  const dbUserId = await getDbUserId();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          {user ? (<CreatePost />) : null}
          <div className="space-y-6">
            {post.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId}/>
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 sticky top-20 font-mono">
          {user ? <SuggestedForYou/> : null}
        </div>
    </div>
  );
}
