import axios from "axios";

import { FolderItem } from "@/lib/features/types";
import { getRootFolders } from "@/lib/folder";
import getCookie from "@/lib/getCookie";
import { Materias } from "@/store/features/materias/useMateriasStore";

// Create a folder with the same name as the materia
export const createFolder = async (
  name: string,
): Promise<string | undefined> => {
  const token = await getCookie("accessToken");
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    // Create a folder with the materia name
    const folderData: Partial<FolderItem> = {
      name,
      type: "folder",
      is_materia: true,
    };

    const res = await axios.post(`${backend_host}/api/folders`, folderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the folder ID
    if (res.data && res.data.folder_id) {
      return res.data.folder_id;
    }

    return undefined;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Erro Axios ao criar pasta:",
        err.response?.data || err.message,
      );
    } else {
      console.error(
        "Erro desconhecido ao criar pasta:",
        (err as Error).message,
      );
    }
    throw err;
  }
};

// Update a folder name
export const updateFolderName = async (
  folderId: string,
  name: string,
): Promise<void> => {
  const token = await getCookie("accessToken");
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    await axios.patch(
      `${backend_host}/api/folders/${folderId}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Erro Axios ao atualizar pasta:",
        err.response?.data || err.message,
      );
    } else {
      console.error(
        "Erro desconhecido ao atualizar pasta:",
        (err as Error).message,
      );
    }
    throw err;
  }
};

// Create a new materia
export const createMateria = async (
  materia: Materias,
): Promise<Materias | undefined> => {
  const token = await getCookie("accessToken");
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    // First, create a folder with the same name as the materia
    const folderId = await createFolder(materia.name);
    if (!folderId) {
      console.error("Failed to create folder for materia");
      return undefined;
    }

    // Then create the materia with the folder ID
    try {
      const res = await axios.post(
        `${backend_host}/api/materia`,
        {
          name: materia.name,
          teacher: materia.teacher,
          semester: materia.semester,
          media: materia.rating,
          folder_id: folderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data) {
        await getRootFolders();
        return {
          id: folderId,
          name: materia.name,
          teacher: materia.teacher,
          semester: materia.semester,
          rating: materia.rating,
        };
      }

      return undefined;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Erro Axios:", err.response?.data || err.message);
      } else {
        console.error("Erro desconhecido:", (err as Error).message);
      }
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

// Read a materia
export const readMateria = async (
  folderId: string,
): Promise<Materias | undefined> => {
  const token = await getCookie("accessToken");
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    const res = await axios.get(`${backend_host}/api/materia/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data && res.data.data) {
      const materiaData = res.data.data;
      return {
        name: materiaData.name || "",
        teacher: materiaData.teacher || "",
        semester: materiaData.semester || 0,
        rating: materiaData.media || 0,
      };
    }

    return undefined;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

// Update a materia
export const updateMateria = async (
  folderId: string,
  data: Partial<Materias>,
): Promise<void> => {
  const token = await getCookie("accessToken");
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    // If the name is being updated, also update the folder name
    if (data.name) {
      await updateFolderName(folderId, data.name);
    }

    // Update the materia
    await axios.patch(
      `${backend_host}/api/materia/${folderId}`,
      {
        name: data.name,
        teacher: data.teacher,
        semester: data.semester,
        media: data.rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

// Delete a materia
export const deleteMateria = async (folderId: string): Promise<void> => {
  const token = await getCookie("accessToken");
  if (!token) return;

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    await axios.delete(`${backend_host}/api/materia/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    throw err;
  }
};

// Get all materias
export const getAllMaterias = async (): Promise<Materias[]> => {
  const token = await getCookie("accessToken");
  if (!token) return [];

  const backend_host: string = process.env.NEXT_PUBLIC_API_URL!;

  try {
    const res = await axios.get(`${backend_host}/api/materia/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data && res.data.data) {
      // Define a type for the API response
      interface MateriaResponse {
        folder_id?: string;
        name?: string;
        teacher?: string;
        semester?: number;
        media?: number;
      }

      return res.data.data.map((item: MateriaResponse) => ({
        id: item.folder_id || "",
        name: item.name || "",
        teacher: item.teacher || "",
        semester: item.semester || 0,
        rating: item.media || 0,
      }));
    }

    return [];
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro desconhecido:", (err as Error).message);
    }
    return [];
  }
};
