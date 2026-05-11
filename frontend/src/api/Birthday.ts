import { instanceAxios } from "./Axios";
import type { BirthdayCreate } from "@/types/Birthday";

export const URL = "/birthday-person"

export const createBirthday = async (data: BirthdayCreate) => {
  try {
    const response = await instanceAxios.post("/birthday-person/create-birthday", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const allBirthdays = async () => {
  try {
    const response = await instanceAxios.get("/birthday-person/birthdays");
    return response.data;
  } catch (error: any) {
    throw new error ('Error al obtener los cumpleaños')
  }
}

export const getNumbersBirthdaysByMonth = async () => {
  try {
    const response = await instanceAxios.get(`${URL}/birthdays`)
    const month = new Date().getMonth() + 1
    const birthdaysInMonth = response.data.data.reduce(
      (acc: number, cur: any) => {
        if (Number(cur.birthday_date.slice(5, 7)) === month) {
          acc ++
        }
        return acc
      },
      0
    )
    return birthdaysInMonth
  } catch (error: any) {
    throw new error ('Algo salio mal')
  }
}

export const getNumberFamilyBirthdays = async () => {
  try {
    const birthdays = await allBirthdays()
    const total = birthdays.data.reduce((acc: number, cur: any) => {
      if (cur.social_circle === 'FAMILY') {
        acc ++
      }
      return acc
    }, 0)
    return total
  } catch (error) {
    throw new error('error')
  }
}

export const getNumberFriendsBirthdays = async () => {
  try {
    const birthdays = await allBirthdays()
    const total = birthdays.data.reduce((acc: number, cur: any) => {
      if (cur.social_circle === 'FRIENDS') {
        acc ++
      }
      return acc
    }, 0)
    return total
  } catch (error) {
    throw new error('error')
  }
}
