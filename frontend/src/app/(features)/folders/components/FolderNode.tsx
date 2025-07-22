"use client";

import { FileIcon, FolderIcon, KanbanSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FolderItem } from "@/lib/features/types";

const FolderNode = ({ item }: { item: Omit<FolderItem, "id"> }) => {
  const router = useRouter();
  const device: "desktop" | "mobile" = useWindowSize();

  const handleClick = () => {
    if (item.type === "folder") {
      router.push(`/folders/${encodeURIComponent(item.name)}`);
    } else {
    }
  };

  const Icon =
    item.type === "folder"
      ? FolderIcon
      : item.type === "note"
        ? FileIcon
        : KanbanSquareIcon;

  return (
    <Button
      onClick={handleClick}
      variant={device === "mobile" ? "folder" : "secondary"}
      size={device === "mobile" ? "folder" : "button"}
      className="flex flex-col gap-2"
    >
      <Icon className="size-7" />
      <p className={"text-lg"}>{item.name}</p>
    </Button>
  );
};

export default FolderNode;
