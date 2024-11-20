import React from 'react'
import { useState } from 'react'
import '../../styles/signupform.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {axiosInstance} from '../../lib/axios.js'; 

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: signUpMutation} = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data); 
      return res.data     
    },
    onSuccess: () => {
      console.log("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      console.log(error.response.data.message);
    }, 
  })
  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation({ name, email, username, password });
  }

  return(
    <form onSubmit={handleSignUp}>
    <div className="form-group">
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit" className="submit-button">JOIN</button>
    <div className="signin-link">
      <span>Already on UnLink?</span>
      <a href="/login">Login</a>
    </div>
  </form>
  
  )
}

export default SignUpForm