"use client";

import { JSONContent } from "@tiptap/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { fetchAnnotation } from "@/lib/annotation";

export default function NotePage() {
  const [note, setNote] = useState<JSONContent | null>();
  const { slug } = useParams();
  const folder_id: string = slug as string;

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAnnotation(folder_id);
      setNote(data);
    }
    fetchData();
  }, [folder_id]);

  if (!note) return <p>Loading...</p>;
  return <SimpleEditor folder_id={folder_id} annotation={note!} />;
}
