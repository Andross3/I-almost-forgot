import { instanceAxios } from "./Axios";
import type { BirthdayCreate } from "@/types/Birthday";

export const createBirthday = async (data: BirthdayCreate) => {
  try {
    const response = await instanceAxios.post("/birthday-person/create-birthday", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};
