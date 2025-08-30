import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios'; // Adjust path if needed
import toast from 'react-hot-toast';
import { Loader2, UserPlus, Check,UserCheck } from 'lucide-react'; // 1. IMPORT THE LOADER ICON

// Helper function to format the date (no changes here)
const formatDate = (dateString) => {
  if (!dateString) return 'a while ago';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/user/${username}`);
        setUser(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'User not found';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleSendRequest = async () => {
    setIsSendingRequest(true);
    setRequestStatus('');
    try {
      // Replaced axiosInstance with the mock API call
      await axiosInstance.post(`/friends/sendrequest/${username}`);
      setUser((prevUser) => ({
        ...prevUser,
        friendshipStatus: 'request_sent',
      }))

      toast.success(`Friend request sent to ${username}`);
      setRequestStatus('sent');

    } catch (err) {
      const errorMessage = err.message || 'Could not send request.';
      toast.error(errorMessage);
      setRequestStatus('error');
    } finally {
      setIsSendingRequest(false);
    }
  };


   const renderFriendshipButton = () => {
    switch (user.friendshipStatus) {
      case 'friends':
        return (
          <button className="btn btn-primary w-full text-white" disabled>
            <UserCheck className="h-6 w-6" />
            Already Friends
          </button>
        );
      case 'request_sent':
        return (
          <button className="btn btn-info w-full" disabled>
            <Check className="h-6 w-6" />
            Request Sent
          </button>
        );
      case 'none':
      default:
        return (
          <button
            className="btn btn-primary w-full"
            onClick={handleSendRequest}
            disabled={isSendingRequest}
          >
            {isSendingRequest ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <UserPlus className="h-6 w-6" />
                Add Friend
              </>
            )}
          </button>
        );
    }
  };

  // 2. REPLACED THE SKELETON WITH THE LUCIDE LOADER
  //    This block now shows a centered, spinning icon when isLoading is true.
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin opacity-60" />
      </div>
    );
  }

  // Renders an error message if the fetch fails (no changes here)
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 rounded-lg shadow-md bg-base-200">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Renders the user profile card on successful fetch (no changes here)
  return (
    <div className="select-none min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto rounded-2xl shadow-xl p-8 bg-base-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full ring-4 ring-offset-4 ring-offset-base-100 ring-primary">
            <img
              src={user.profilePic || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
              alt={`${user.username}'s profile`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User Details */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-lg opacity-80">{user.fullName}</p>
          </div>

          {/* Member Since */}
          <div className="text-sm opacity-60 pt-2">
            <span>Member since {formatDate(user.createdAt)}</span>
          </div>

          {/* Action Buttons (Future) */}
          <div className="pt-4 w-full">
            {renderFriendshipButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

// We no longer need the UserProfileSkeleton component, so you can delete it.

export default UserProfile;