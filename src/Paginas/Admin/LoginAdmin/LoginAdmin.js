import React from 'react';
import "./LoginAdmin.scss";
import "../../../Componentes/Admin/LoginForm"
import { LoginForm } from '../../../Componentes/Admin/LoginForm';

export function LoginAdmin() {
  return (
    <div className='login-admin'>
      <div className='login-admin_content'>
        <h1>SalsaBar</h1>
        <LoginForm />
      </div>      
    </div>
  );
}
