import React from 'react';
import './Sidebar.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { data: authUser } = useQuery({ queryKey: ['authUser'] });
  const queryClient = useQueryClient();

  const { data: connectionRequests, isLoading: loadingRequests } = useQuery({
    queryKey: ['connectionRequests'],
    queryFn: async () => axiosInstance.get('/connections/requests').then(res => res.data),
    enabled: !!authUser
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post('/auth/logout'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    }
  });

  const handleLogout = () => {
    logout();
  };

  const hasConnectionRequest = connectionRequests && connectionRequests.length > 0;

  return (
    <div className={`sidebar ${authUser ? 'auth' : 'no-auth'}`}>
      <a href="/" className="sidebar-link">Unlink.</a>
      {authUser ? (
        <div className="sidebar-content">
          <Link to={`/profile/${authUser.username}`} className='sidebar-item'>Profile</Link>
          <div className="sidebar-item">
            <a href="/network" className="sidebar-item">Network</a>
            {!loadingRequests && hasConnectionRequest && <span className="notification-badge">{connectionRequests.length-1}</span>}
          </div>
          <a href="/project" className="sidebar-item">Projects</a>
          <a href="/clubs" className="sidebar-item">Clubs</a>
        </div>
      ) : (
        <div className="auth-buttons">
          <a href="/signup" className="auth-button">SignUp</a>
          <a href="/login" className="auth-button">Login</a>
        </div>
      )}
      {authUser && (
        <div className="sidebar-footer">
          <a href="/team" className="auth-button">The Team</a>
          <div className="sidebar-socials">
            <a href="https://twitter.com" className="social-link">Twitter</a>
            <a href="https://instagram.com" className="social-link">Instagram</a>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
