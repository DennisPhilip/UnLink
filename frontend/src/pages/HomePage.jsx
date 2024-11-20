import React from 'react'
import {useQuery} from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'
import UserCard from '../components/UserCard'
import '../styles/homepage.css'
import RecommendedUser from '../components/RecommendedUser'

const HomePage = () => {
  const {data: authUser} = useQuery({ queryKey: ["authUser"]});
  const {data: recommendedUsers} = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async() => {
        const res = await axiosInstance.get("/users/suggestions");
        return res.data;
    }
  })

  console.log("recommendedUsers", recommendedUsers);
  return (
    <div className='outer-div'>
      <div className='inner-div'>
        <UserCard user={authUser} />
      </div>

      {recommendedUsers?.length > 0 && (
        <div className='container'>
          <div className='card'>
            <h2 className='header'>People you may know</h2>
            {recommendedUsers?.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
)}

    </div>
  );
  
}

export default HomePage