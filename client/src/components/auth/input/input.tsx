import { FC, InputHTMLAttributes } from "react"
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import classes from './input.module.scss'



export interface IFieldProps{
 error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps
export interface IInput extends TypeInputPropsField { }

const Field = forwardRef<HTMLInputElement, IInput>(({ error, type="text", ...rest }, ref) => {
 return (
  <div className={classes.wrapper}>
   <input ref={ref} type={type} {...rest} className={classes.input} />
   <div className={classes.error}>{ error && error.message}</div>
  </div>
 )

}
)
Field.displayName = 'Field'
export default Field