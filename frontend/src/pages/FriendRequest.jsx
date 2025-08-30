import React, { useState, useEffect } from 'react';
import { Users, LoaderCircle, ServerCrash, Check, X } from 'lucide-react';
import {axiosInstance} from '../lib/axios';
import RequestCard from '../components/RequestCard';


const FriendRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/friends/requests');
        if (response.status === 200) {
          setRequests(response.data);
        } else {
          throw new Error("API response was not successful.");
        }
      } catch (err) {
        setError("Could not fetch friend requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  const handleAction = (userId) => {
    setRequests(currentRequests =>
      currentRequests.filter(req => req._id !== userId)
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 font-sans">
        <LoaderCircle size={32} className="animate-spin text-blue-500" />
        <p className="mt-4">Loading Friend Requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-red-500 font-sans">
        <ServerCrash size={32} />
        <p className="mt-4 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="font-sans max-w-2xl my-16 pt-4 mx-auto h-screen">
      <h1 className="text-2xl font-bold mb-6">Friend Requests</h1>
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onAction={handleAction}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 rounded-lg border border-dashed border-gray-500/50">
          <Users size={48} className="text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold">No New Requests</h3>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default FriendRequestsPage;
