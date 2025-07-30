import { JSONContent } from "@tiptap/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { noteStoreActions } from "./noteStoreActions";

interface NoteStore {
  annotation: JSONContent;
  setAnnotation: (annotation: JSONContent) => void;
  addAnnotation: (parentId: string) => void;
  updateAnnotation: (folderId: string, data: JSONContent) => void;
  deleteAnnotation: (folderId: string) => void;
  readAnnotation: (folderId: string) => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      annotation: [],
      setAnnotation: (annotation: JSONContent) => set({ annotation }),
      ...noteStoreActions(set),
    }),
    {
      name: "folder-store",
    },
  ),
);
