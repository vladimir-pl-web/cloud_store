import { FC, useRef} from "react"
import classes from './auth.module.scss'
import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidation } from '../../../utils/constants'
import Field from "../input/input";
import { useLocation } from 'react-router-dom';
import { IAuthData } from "../../../utils/types";
import { fetchAuth } from "../../../store/redux/users/actionUsers";
import { useAppDispatch } from "../../../hooks/hooks";


interface IAuth {
 title: string
 btnName: string
}

const Auth: FC<IAuth> = ({ title, btnName }) => {
 const ref = useRef<any>(null)
 const location = useLocation();
 const dispatch = useAppDispatch()

 const {
  register,
  formState: { errors },
  handleSubmit
 } = useForm<IAuthData>({ mode: "onChange" })


 const onSubmit: SubmitHandler<IAuthData> = (data) => {
  dispatch(fetchAuth(data, location.pathname))
 }

 return (
  <form className={classes.form} onSubmit={handleSubmit(onSubmit)} ref={ref}>
   <h3 className={classes.header}>{title}</h3>
   <Field
    {...register('email', {
     required: 'Required',
     pattern: {
      value: emailValidation,
      message: "Please enter a valid email"
     }
    })}
    placeholder="Enter email"
    error={errors.email}
   />
   <Field
    {...register('password', {
     required: 'Required',
     minLength: {
      value: 5,
      message: "Length must be at least 5 symbols"
     }
    })}
    placeholder="Enter password"
    error={errors.password}
   />
   <button type="submit" className={classes.btn}>
    {btnName}
   </button>
  </form>
 )
}

export default Auth