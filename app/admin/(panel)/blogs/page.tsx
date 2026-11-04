import BlogForm from "@/components/admin/BlogForm";
import ItemList from "@/components/admin/ItemList";
import { Panel } from "@/components/admin/ui";
import { blobEnabled, getByKind } from "@/lib/content";

export const metadata = { title: "Blogs" };

export default async function AdminBlogs() {
  const items = await getByKind("blog");
  return (
    <>
      <Panel title="Write a blog">
        <BlogForm blob={blobEnabled()} />
      </Panel>
      <Panel title="Published blogs">
        <ItemList items={items} empty="No blogs yet." />
      </Panel>
    </>
  );
}
