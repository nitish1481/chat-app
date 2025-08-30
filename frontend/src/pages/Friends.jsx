import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, UserX } from 'lucide-react';
import {axiosInstance} from '../lib/axios';
import FriendCard from '../components/FriendCard';


const FriendsPage = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setError(null);
      try {
        const friendsResponse = await axiosInstance.get('/friends');
        setFriends(friendsResponse.data);

      } catch (err) {
        const errorMessage = err.response?.data?.message || "Failed to fetch friends";
        setError(errorMessage);
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // Render an error message if something goes wrong
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-error">Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 mt-12">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center">My Friends</h1>
        
        {/* Conditional rendering for when there are no friends */}
        {friends.length === 0 ? (
          <div className="text-center p-12 rounded-lg bg-base-200">
            <UserX className="mx-auto h-16 w-16 text-base-content/40 mb-4" />
            <h3 className="text-xl font-semibold">No Friends Yet</h3>
            <p className="text-base-content/60 mt-2">
              Use the search page to find and add new friends!
            </p>
          </div>
        ) : (
          // Grid layout for the friend cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {friends.map(friend => (
              <FriendCard
                key={friend._id}
                username={friend.username}
                fullName={friend.fullName}
                profilePic={friend.profilePic}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;