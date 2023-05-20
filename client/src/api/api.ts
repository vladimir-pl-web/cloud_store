import axios from 'axios'
import { token } from '../utils/constants'
import { IAuthData, ISort } from '../utils/types';
export const creds = { headers: { Authorization: `Bearer ${token}` } }

export const instance = axios.create({
 baseURL: 'http://localhost:5000/api/',
 withCredentials: true
})

export const sendAuthData = async (payload: IAuthData, type: string) => {
 const res = await instance.post(`auth${type}`, { ...payload })
 return res
}

export const authInitial = async () => {const res = await instance.get(`auth/auth`, creds)
 return res
}

export const getFiles = async (dirId: string | null, sorts: ISort, search?: string) => {
 const { sort, dir } = sorts

 const res = await instance.get(`files?sort=${sort}&dir=${dir}${dirId ? '&parent=' + dirId : ""}${search ? '&search=' + search : ""}`, creds)
 return res
}

export const createFolder = async (dirId: string | null, name: string) => {
 const res = await instance.post(`files`, {
  name,
  parent: dirId,
  type: "dir"
 }, creds)
 return res
}

export const downloadFile = async (id: string) => {
 const res = await instance.get(`files/download?id=${id}`, {
  headers: { ...creds.headers },
  responseType: 'blob'
 })
 console.log(res, "res")
 return res
}

export const deleteFile = async (id: string) => {
 const res = await instance.delete(`files/delete?id=${id}`, creds)
 return res
}

export const deleteAvatar = async () => {
    const res = await instance.delete(`files/avatar`, creds)
    return res
   }

