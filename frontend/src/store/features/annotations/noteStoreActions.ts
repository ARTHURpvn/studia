import { JSONContent } from "@tiptap/core";

import { createNote, deleteNote, readNote, updateNote } from "./noteCrud";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noteStoreActions = (set: any) => ({
  addAnnotation: (parentId: string) => {
    createNote(parentId).then();
  },

  updateAnnotation: (folderId: string, data: JSONContent) => {
    updateNote(folderId, data).then();
  },

  deleteAnnotation: async (folderId: string) => {
    deleteNote(folderId).then();
  },

  readAnnotation: async (folderId: string) => {
    const res: JSONContent = await readNote(folderId);
    set({ annotation: res });
  },
});
