import React from 'react';
import {Button, Form} from "semantic-ui-react";
import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify";
import { loginApi } from "../../API/user";
import { useAuth } from "../../Hooks";
import "./LoginForm.scss";


export function LoginForm() {
  
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);
        const { access } = response;
        login(access);

      } catch (error) {
        toast.error(error.message);
      }
    }
  })

  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input 
      name="email" 
      placeholder="Corro Elctronio" 
      value={formik.values.email}
      onChange={formik.handleChange}
      error={formik.errors.email}
      />

      <Form.Input 
      name="password"  
      type="password" 
      placeholder="Contaseña" 
      value={formik.values.password} 
      onChange={formik.handleChange}
      error={formik.errors.password}
      />

      <Button 
      type='submit' 
      className='fluid ui red button'  
      content="Iniciar Sesion"  />

    </Form>
  )
}

// Para poder insertar valores en el input
function initialValues(){
  return {
    email: "",
    password: "",
  }
}

// Para poder enviar valores
function validationSchema(){
  return {
    email: yup.string().email(true).required(true),  //solo recibe correos que esten bien redactados
    password: yup.string().required(true),
  }
}