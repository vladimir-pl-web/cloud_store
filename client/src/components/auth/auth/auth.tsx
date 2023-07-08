import { FC } from "react";
import classes from "./auth.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidation } from "../../../utils/constants";
import { useLocation } from "react-router-dom";
import {  IFormData } from "../../../utils/types";
import { fetchAuth } from "../../../store/redux/users/actionUsers";
import { useAppDispatch } from "../../../hooks/hooks";
import { Button, Form, FormFeedback, FormGroup, Input } from "reactstrap";
import { registerRs } from "../../../utils/utils";

interface IAuth {
  title: string;
  isPasswordForgotten?: boolean
}

const Auth: FC<IAuth> = ({ title, isPasswordForgotten=false}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(fetchAuth(data, location.pathname));
  };



  return (
    <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={classes.header}>{title}</h3>
      <FormGroup className={classes.group} >
        <Input
          {...registerRs ("email", {
            required: { value: true, message: "Email required" },
            pattern: {
              value: emailValidation,
              message: "Please enter a valid email",
            },
          },register)}
          placeholder="Enter email"
          invalid={errors.email ? true : false}
        />
        <FormFeedback 
        className={classes.errorMessage}
        tooltip>{errors.email?.message}</FormFeedback>
      </FormGroup>
      {!isPasswordForgotten && <FormGroup className={classes.group}>
      <Input
        {...registerRs("password", {
          required: { value: true, message: "Password required" },
          minLength: {
            value: 5,
            message: "Password must be at least 5 symbols",
          },
        },register)}
        placeholder="Enter password"
        invalid={errors.password ? true : false}
      />
      <FormFeedback 
      className={classes.errorMessage}
      tooltip>{errors.password?.message}</FormFeedback>
      </FormGroup>}
      <Button 
      color='primary'
      outline
      className={classes.btn}>
        Submit
      </Button>
    </Form>
  );
};

export default Auth;
