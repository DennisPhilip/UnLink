import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'
import { Link } from 'react-router-dom'
import './RecommendedUser.css'

const RecommendedUser = ({ user }) => {
  const queryClient = useQueryClient()
  const [error, setError] = useState(null)
  const {data: connectionRequests} = useQuery({queryKey: ["conectionRequests"]} )
  // Get connection status
  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ['connectionStatus', user._id],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/connections/status/${user._id}`)
        console.log('Connection status response:', res.data)
        return res.data
      } catch (error) {
        console.error('Error fetching connection status:', error)
        throw error
      }
    }
  })


  const { mutate: sendConnectionRequest, isError: sendError } = useMutation({
    mutationFn: async (userId) => {
      try {
        console.log('Sending connection request to userId:', userId)
        const response = await axiosInstance.post(`/connections/request/${userId}`)
        console.log('Connection request response:', response.data)
        return response.data
      } catch (error) {
        console.error('Error in mutation:', error.response || error)
        throw error
      }
    },
    onSuccess: (data) => {
      console.log('Connection request sent successfully:', data)
      // Immediately update the cache with the new status
      queryClient.setQueryData(['connectionStatus', user._id], {
        status: 'pending'
      })
      // Then invalidate to refetch fresh data
      queryClient.invalidateQueries({
        queryKey: ['connectionStatus', user._id]
      })
      setError(null)
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error.message
      console.error('Error sending connection request:', errorMessage)
      setError(errorMessage)

      if (errorMessage === 'Connection request already exists') {
        queryClient.setQueryData(['connectionStatus', user._id], {
          status: 'pending'
        })
        queryClient.invalidateQueries({
          queryKey: ['connectionStatus', user._id]
        })
      }
    }
  })


  const { mutate: acceptRequest } = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosInstance.put(`/connections/accept/${requestId}`)
      return response.data
    },
    onSuccess: () => {
      // Immediately update the cache with the new status
      queryClient.setQueryData(['connectionStatus', user._id], {
        status: 'connected'
      })
      queryClient.invalidateQueries({
        queryKey: ['connectionStatus', user._id]
      })
      queryClient.invalidateQueries({
        queryKey: ['connectionRequests']
      })
      setError(null)
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error.message
      console.error('Error accepting connection:', errorMessage)
      setError(errorMessage)
    }
  })


  const { mutate: rejectRequest } = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosInstance.put(`/connections/reject/${requestId}`)
      return response.data
    },
    onSuccess: () => {
      // Immediately update the cache with the new status
      queryClient.setQueryData(['connectionStatus', user._id], {
        status: 'Not Connected'
      })
      queryClient.invalidateQueries({
        queryKey: ['connectionStatus', user._id]
      })
      queryClient.invalidateQueries({
        queryKey: ['connectionRequests']
      })
      setError(null)
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error.message
      console.error('Error rejecting connection:', errorMessage)
      setError(errorMessage)
    }
  })

  const handleConnect = async () => {
    try {
      console.log('Handle connect clicked for user:', user._id)
      // Changed case to match backend status
      if (!connectionStatus?.status || connectionStatus.status === 'Not Connected') {
        sendConnectionRequest(user._id)
      }
    } catch (error) {
      console.error('Error in handleConnect:', error)
    }
  }

  const handleAccept = () => {
    if (connectionStatus?.requestId) {
      acceptRequest(connectionStatus.requestId)
    }
  }

  const handleReject = () => {
    if (connectionStatus?.requestId) {
      rejectRequest(connectionStatus.requestId)
    }
  }

  const renderButton = () => {
    if (isLoading) {
      return <button className="status-button loading">Loading...</button>
    }

    console.log('Current connection status:', connectionStatus?.status)
    const status = connectionStatus?.status?.toLowerCase()

    switch (status) {
      case 'pending':
        return <button className="status-button pending">Pending</button>
      case 'received':
        return (
          <div className="button-group">
            <button className="status-button accept" onClick={handleAccept}>
              Accept
            </button>
            <button className="status-button reject" onClick={handleReject}>
              Reject
            </button>
          </div>
        )
      case 'connected':
        return <button className="status-button connected">Connected</button>
      default:
        return (
          <button 
            className="status-button connect" 
            onClick={handleConnect}
            disabled={sendError}
          >
            Connect
          </button>
        )
    }
  }

  return (
    <div className="recommended-user">
      <div className="recommended-user-info">
        <Link to={`/profile/${user.username}`} className="user-link">
          <h3 className="user-name">{user.name}</h3>
        </Link>
        <p className="user-headline">{user.headline}</p>
      </div>
      <div className="recommended-user-action">
        {renderButton()}
      </div>
      {error && <div className="error-message text-red-500 text-sm mt-2">{error}</div>}
    </div>
  )
}

export default RecommendedUser
