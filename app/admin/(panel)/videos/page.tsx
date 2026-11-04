import VideoForm from "@/components/admin/VideoForm";
import ItemList from "@/components/admin/ItemList";
import { Panel } from "@/components/admin/ui";
import { blobEnabled, getByKind } from "@/lib/content";

export const metadata = { title: "Videos" };

export default async function AdminVideos() {
  const items = await getByKind("video");
  return (
    <>
      <Panel title="Upload a video">
        <VideoForm blob={blobEnabled()} />
      </Panel>
      <Panel title="Published videos">
        <ItemList items={items} empty="No videos yet." />
      </Panel>
    </>
  );
}
