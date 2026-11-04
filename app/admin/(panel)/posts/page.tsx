import PostForm from "@/components/admin/PostForm";
import ItemList from "@/components/admin/ItemList";
import { Panel } from "@/components/admin/ui";
import { blobEnabled, getByKind } from "@/lib/content";

export const metadata = { title: "Posts" };

export default async function AdminPosts() {
  const items = await getByKind("post");
  return (
    <>
      <Panel title="New post">
        <PostForm blob={blobEnabled()} />
      </Panel>
      <Panel title="Published posts">
        <ItemList items={items} empty="No posts yet." />
      </Panel>
    </>
  );
}
