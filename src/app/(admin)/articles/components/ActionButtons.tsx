"use client";
import { useRouter } from "next/navigation";
import { AppEndpointDynamic } from "@/core/constants/endpoints";

type Props = {
  article: {
    id: number;
    status: string | null;
  };
};

export default function ActionButtons({ article }: Props) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(AppEndpointDynamic.PUBLIC_ARTICLES_EDIT(article.id));
  };

  const handleDelete = () => {
    // TODO: Thêm logic xoá bài viết ở đây
  };

  const handlePublish = () => {
    // TODO: Thêm logic publish bài viết ở đây
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={handleEdit}
        className="px-2 py-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-2 py-1 text-xs text-red-600 border border-red-600 rounded hover:bg-red-50"
      >
        Delete
      </button>
      {article.status !== "published" && (
        <button
          onClick={handlePublish}
          className="px-2 py-1 text-xs text-green-600 border border-green-600 rounded hover:bg-green-50"
        >
          Publish
        </button>
      )}
    </div>
  );
}
