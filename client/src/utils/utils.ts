
import { toast } from "react-toastify";
import { Messages } from "./enums";
import { UseFormRegister, UseFormRegisterReturn, } from "react-hook-form";
import {  IFormData } from "./types";

export const displayNotification = (message: string, type: string) => {
 switch (type) {
  case Messages.A:
   return toast.error(message);
  case Messages.B:
   return toast.success(message);
  default:
   return null
 }
};

export const fileSize = (size:number) => {
if(size > 1824*1824*1824) return (size / (1824*1824*1824)).toFixed(1) + 'GB'
if(size > 1824*1824) return (size / (1824*1824)).toFixed(1) + 'MB'
if(size > 1824) return (size / (1824)).toFixed(1) + 'KB'
return size+ "B"
}


export   const registerRs = (fieldName: "email" | "password" | "name", options = {}, register:UseFormRegister<IFormData>) => {
  const registeredField: Partial<UseFormRegisterReturn> = register(fieldName, options);
  const ref = registeredField.ref;
  delete registeredField.ref;
  return {...registeredField, innerRef: ref};
}