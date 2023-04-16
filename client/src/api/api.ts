import axios from 'axios'
import { token } from '../utils/constants'
import { IAuthData } from '../utils/types';
export const creds = { headers: { Authorization: `Bearer ${token}` } }

export const instance = axios.create({
 baseURL: 'http://localhost:5000/api/',
 withCredentials: true
})

export const sendAuthData = async (payload: IAuthData, type: string) => {
 const res = await instance.post(`auth${type}`, { ...payload })
 return res
}

export const authInitial = async () => {
 const res = await instance.get(`auth/auth`, creds)
 return res
}

export const getFiles = async (dirId: string | null) => {
 const res = await instance.get(`files${dirId ? '?parent=' + dirId : ""}`, creds)
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

// export const uploadFile = async (form: Object, uploadedFile:IUploadedFile, dispatch:Dispatch) => {
//  const res = await instance.post(`files/upload`, form, {
//   headers: { ...creds.headers },
//   onUploadProgress: progressEvent => {
//    const percentCompleted = progressEvent.total ? (progressEvent.loaded / progressEvent.total) * 100 : 0
//    dispatch(changeUploadedFile({id: uploadedFile.id, progress: +percentCompleted.toFixed()}))
//   }
//  })
//  return res
// }

