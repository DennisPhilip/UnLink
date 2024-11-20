import React from 'react'
import { useState } from 'react'
import '../../styles/loginform.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios.js';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate: loginMutation } = useMutation({
    mutationFn: (userData) =>  axiosInstance.post("/auth/login", userData),
    onSuccess: () => {
      console.log("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  })

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  }

  return (
    <form onSubmit={handleLogin}>
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">LOGIN</button>
      <div className="signup-link">
        <span>New to UnLink?</span>
        <a href="/signup">Join now</a>
      </div>
    </form>
  )
}

export default LoginForm