import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import ConnectionCard from '../components/ConnectionCard';
import '../styles/networkpage.css';

const NetworkPage = () => {
    const {data: user} = useQuery({ queryKey: ["authUser"] });

    const {data: connections } = useQuery({
        queryKey: ["connections"],
        queryFn: () => axiosInstance.get("/connections"),
    });

    return (
        <div className='main-div'>
            <h2>My Connections</h2>
            {connections?.data?.length > 0 && (
                <div className='card'>
                    <div className='connection'>
                        {connections?.data?.map((connection) => (
                            <ConnectionCard key={connection._id} user={connection}  isConnection={true}/>
                        ))}
                    </div>
                </div>
            )}
    
        </div>
      );


};



export default NetworkPage;
