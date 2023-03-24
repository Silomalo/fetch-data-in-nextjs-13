
type Props = {
    props: Promise<Post[]>;
};

export default async function UserPosts({ props }: Props) {
    // const userPosts = useSWR("userPosts", () => props);
    const posts = await props;
    return (
      <>
        {posts.map((post) => (
          <article key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </article>
        ))}
      </>
    );
}
