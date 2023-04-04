import axios from 'axios'
import { IAuthData } from '../utils/types'

const instance = axios.create({
 baseURL: 'http://localhost:5000/api/',
 withCredentials:true
})

export const sendAuthData = async ( payload: IAuthData,type: string) => {
 const res = await instance.post(`auth${type}`, { ...payload })
 return res
}


