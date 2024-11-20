import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/layout";


import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from './lib/axios';
import ProjectsPage from "./pages/ProjectsPage";
import NetworkPage from "./pages/NetworkPage";
import ProfilePage from "./pages/ProfilePage";
import ClubPage from "./pages/ClubPage";
import TeamPage from "./pages/TeamPage";

function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/auth/me');
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        console.log(error.response.data.message);
      }
    },
  });
  
  if(isLoading) return null; 
  console.log(authUser);
   
  return <Layout>
    <Routes>
      <Route path="/" element={authUser ? <HomePage />: <Navigate to={'/login'} />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
      <Route path="/project" element={authUser ? <ProjectsPage />: <Navigate to={'/login'} />} />
      <Route path="/network" element={authUser ? <NetworkPage />: <Navigate to={'/login'} />} />
      <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      <Route path="/clubs" element={authUser ? <ClubPage />: <Navigate to={'/login'} />} />
      <Route path="/team" element={authUser ? <TeamPage />: <Navigate to={'/login'} />} />
    </Routes>
    </Layout>
}

export default App
