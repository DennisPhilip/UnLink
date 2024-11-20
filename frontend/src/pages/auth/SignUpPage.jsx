import React from 'react'
import '../../styles/signup-styles.css';
import SignUpForm from '../../components/auth/SignUpForm';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div className="signup-container">
        <h1 className="headline animate-fade-in">Network and contribute to tech projects</h1>
        <div className="signup-card animate-slide-up">
            <h2>Signup</h2>
            <SignUpForm />
        </div>
    </div>
  )
}

export default SignUpPage