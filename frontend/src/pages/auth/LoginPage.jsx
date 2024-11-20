import React from 'react'
import '../../styles/login-styles.css';
import LoginForm from '../../components/auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-container">
        <h1 className="headline animate-fade-in">Welcome back to your tech community</h1>
        <div className="login-card animate-slide-up">
            <h2>Login</h2>
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage