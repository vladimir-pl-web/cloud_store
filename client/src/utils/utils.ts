import { toast } from "react-toastify";

export const displayErrorNotification = (message:string) => {
 toast.error(message); 
};