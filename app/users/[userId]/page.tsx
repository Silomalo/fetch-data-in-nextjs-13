import React from "react";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata} from "next";

type Params = {
  params: {
    userId: string;
  };
};

export async function  generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user = await userData;
  return {
    title: `${user.name}'s Posts`,
    description: `Posts by ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);
  //not that we are requesting this data in parallel
  // const [user, userPosts] = await Promise.all([userData, userPostsData]);
const user = await userData;
  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <h3>Posts</h3>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <UserPosts props={userPostsData} />
      </Suspense>
    </>
  );
}
