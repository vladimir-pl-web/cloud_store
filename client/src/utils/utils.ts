
import { toast } from "react-toastify";
import { Messages } from "./enums";

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
