import axios from 'axios'
import { token } from '../utils/constants'
import { IAuthData } from '../utils/types'

const creds = {headers:{Authorization: `Bearer ${token}`}} 

const instance = axios.create({
 baseURL: 'http://localhost:5000/api/',
 withCredentials:true
})

export const sendAuthData = async ( payload: IAuthData,type: string) => {
 const res = await instance.post(`auth${type}`, { ...payload })
 return res
}

export const authInitial = async () => {
 const res = await instance.get(`auth/auth`, creds)
 return res
}

export const getFiles = async (dirId: string | null) => {
 const res = await instance.get(`files${dirId ? 'parent=' + dirId : ""}`, creds)
 return res
}

export const createFile = async (dirId: string | null, name: string) => {
 const res = await instance.post(`files`, {
  name,
  parent: dirId,
  type: "dir"
 }, creds)
 return res
}

