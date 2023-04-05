import axios from 'axios'
import { token } from '../utils/constants'
import { IAuthData } from '../utils/types'

const instance = axios.create({
 baseURL: 'http://localhost:5000/api/',
 withCredentials:true
})

export const sendAuthData = async ( payload: IAuthData,type: string) => {
 const res = await instance.post(`auth${type}`, { ...payload })
 return res
}

export const authInitial = async () => {
 const creds = token ? {headers:{Authorization: `Bearer ${token}`}} : ""
 const res = await instance.get(`auth/auth`, {headers:{Authorization: `Bearer ${token}`}})
 return res
}


