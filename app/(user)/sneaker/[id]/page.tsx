export default async function User({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/getMe?id=${params.id}`
  );

  const userData = await response.json();
  return (
    <div className="flex flex-col gap-4 rounded-xl p-4 bg-primary/10">
      <p>{userData.userName}</p>
      <p>{userData.userId}</p>
      <p>{userData.createdAt}</p>
      <div className="flex flex-col gap-4">
        {userData.Posts.map((post: any) => {
          return <p>{post.message}</p>;
        })}
      </div>
    </div>
  );
}
