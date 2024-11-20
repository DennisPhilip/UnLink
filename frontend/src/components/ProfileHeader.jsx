import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Link } from "react-router-dom";
import './profileheader.css';

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({});
	const queryClient = useQueryClient();

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: connectionStatus, refetch: refetchConnectionStatus } = useQuery({
		queryKey: ["connectionStatus", userData._id],
		queryFn: () => axiosInstance.get(`/connections/status/${userData._id}`),
		enabled: !isOwnProfile,
	});

	const isConnected = userData.connections.some((connection) => connection === authUser._id);

	const { mutate: sendConnectionRequest } = useMutation({
		mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
		onSuccess: () => {
			refetchConnectionStatus();
			queryClient.invalidateQueries(["connectionRequests"]);
		},
		onError: (error) => {
			console.error(error.response?.data?.message || "An error occurred");
		},
	});

	const { mutate: acceptRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			refetchConnectionStatus();
			queryClient.invalidateQueries(["connectionRequests"]);
		},
		onError: (error) => {
			console.error(error.response?.data?.message || "An error occurred");
		},
	});

	const { mutate: rejectRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			refetchConnectionStatus();
			queryClient.invalidateQueries(["connectionRequests"]);
		},
		onError: (error) => {
			console.error(error.response?.data?.message || "An error occurred");
		},
	});

	const { mutate: removeConnection } = useMutation({
		mutationFn: (userId) => axiosInstance.delete(`/connections/${userId}`),
		onSuccess: () => {
			refetchConnectionStatus();
			queryClient.invalidateQueries(["connectionRequests"]);
		},
		onError: (error) => {
			console.error(error.response?.data?.message || "An error occurred");
		},
	});

	const getConnectionStatus = useMemo(() => {
		if (isConnected) return "connected";
		if (!isConnected) return "not_connected";
		return connectionStatus?.data?.status;
	}, [isConnected, connectionStatus]);

	const renderConnectionButton = () => {
		const baseClass = "text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center";
		switch (getConnectionStatus) {
			case "connected":
				return (
					<div className='profile-header-connection-buttons'>
						<div className={`profile-header-connected-button`}>
							Connected
						</div>
						<button
							className={`profile-header-remove-button`}
							onClick={() => removeConnection(userData._id)}
						>
                            X
							Remove Connection
						</button>
					</div>
				);

			case "pending":
				return (
					<button className={`profile-header-pending-button`}>
						Pending
					</button>
				);

			case "received":
				return (
					<div className='profile-header-connection-buttons'>
						<button
							onClick={() => acceptRequest(connectionStatus.data.requestId)}
							className={`profile-header-accept-button`}
						>
							Accept
						</button>
						<button
							onClick={() => rejectRequest(connectionStatus.data.requestId)}
							className={`profile-header-reject-button`}
						>
							Reject
						</button>
					</div>
				);
			default:
				return (
					<button
						onClick={() => sendConnectionRequest(userData._id)}
						className='profile-header-connect-button'
					>
						Connect
					</button>
				);
		}
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setEditedData((prev) => ({ ...prev, [event.target.name]: reader.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		onSave(editedData);
		setIsEditing(false);
	};

	return (
		<div className='profile-header-container'>
			<div
				className='profile-header-banner'
				style={{
					backgroundImage: `url('${editedData.bannerImg || userData.bannerImg }')`,
				}}
			>
				{isEditing && (
					<label className='profile-header-banner-edit'>
						banner
						<input
							type='file'
							className='hidden'
							name='bannerImg'
							onChange={handleImageChange}
							accept='image/*'
						/>
					</label>
				)}
			</div>

			<div className='profile-header-content'>
				<div className='profile-header-avatar'>
					<img
						className='profile-header-avatar-image'
						src={editedData.profilePicture || userData.profilePicture}
						alt={userData.name}
					/>

					{isEditing && (
						<label className='profile-header-avatar-edit'>pfp
							<input
								type='file'
								className='hidden'
								name='profilePicture'
								onChange={handleImageChange}
								accept='image/*'
							/>
						</label>
					)}
				</div>

				<div className='profile-header-info'>
					{isEditing ? (
						<input
							type='text'
							value={editedData.name ?? userData.name}
							onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
							className='profile-header-name-input'
						/>
					) : (
						<h1 className='profile-header-name'>{userData.name}</h1>
					)}

					{isEditing ? (
						<input
							type='text'
							value={editedData.headline ?? userData.headline}
							onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
							className='profile-header-headline-input'
						/>
					) : (
						<p className='profile-header-headline'>{userData.headline}</p>
					)}

					<div className='profile-header-location'>
						{isEditing ? (
							<input
								type='text'
								value={editedData.Semester ?? userData.Semester}
								onChange={(e) => setEditedData({ ...editedData, Semester: e.target.value })}
								className='profile-header-location-input'
							/>
						) : (
							<span className='profile-header-location-text'>{userData.Semester}</span>
						)}
					</div>
				</div>

				{isOwnProfile ? (
					isEditing ? (
						<button
							className='profile-header-save-button'
							onClick={handleSave}
						>
							Save Profile
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='profile-header-edit-button'
						>
							Edit Profile
						</button>
					)
				) : (
					<div className='profile-header-connection-buttons'>{renderConnectionButton()}</div>
				)}
			</div>
		</div>
	);
};

export default ProfileHeader;