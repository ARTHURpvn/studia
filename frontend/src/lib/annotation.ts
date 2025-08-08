import { JSONContent } from "@tiptap/react";
import axios from "axios";

import getCookie from "@/lib/getCookie";

export const fetchAnnotation = async (folder_id: string) => {
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
  const token = await getCookie("accessToken");
  if (!token) return;

  const res = await axios.get(`${backend_host}/api/annotations/${folder_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data.annotations);
  return res.data.annotations;
};

export const updateAnnotation = async (
  folder_id: string,
  data: JSONContent,
) => {
  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;
  const token = await getCookie("accessToken");
  if (!token) return;

  const res = await axios.patch(
    `${backend_host}/api/annotations/${folder_id}`,
    {
      content: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(res.data);
  return res.data;
};
