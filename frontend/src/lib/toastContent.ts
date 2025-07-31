"use server";
import { toast } from "sonner";

const toastContent = (message: string, status_code: number) => {
  if (status_code >= 200 && status_code < 300) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

export default toastContent;
