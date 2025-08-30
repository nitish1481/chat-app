import React, { useState, useEffect } from 'react';
import  {axiosInstance}  from '../lib/axios';

const RequestCard = ({ request, onAction }) => {
  const { _id, username, fullName, profilePic } = request;
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [error, setError] = useState('');

  const handleAccept = async () => {
    setIsAccepting(true);
    setError('');
    try {
      await axiosInstance.post(`/friends/acceptrequest/${username}`);
      onAction(_id);
    } catch (err) {
      console.error("Failed to accept request:", err);
      setError('Failed to accept. Please try again.');
    }
    finally{{
      setIsAccepting(false);
    }}
  };

  const handleDecline = async () => {
    setIsDeclining(true);
    setError('');
    try {
      await axiosInstance.post(`/friends/declinerequest/${username}`);
      onAction(_id);
    } catch (err) {
      console.error("Failed to decline request:", err);
      setError('Failed to decline. Please try again.');
    }
    finally{
      setIsDeclining(false);
    }
  };

  return (
    <div className="border border-gray-500/30 rounded-lg p-4 transition-all">
      <div className="flex items-center gap-4">
        <img
          src={profilePic}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-grow">
          <span className="font-bold">{fullName}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            disabled={isAccepting}
            className="flex items-center justify-center w-24 h-9 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isAccepting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Accept'}
          </button>
          <button
            onClick={handleDecline}
            disabled={isDeclining}
            className="flex items-center justify-center w-24 h-9 rounded-md font-semibold bg-gray-600/50 text-white hover:bg-gray-500/50 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            {isDeclining ? <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div> : 'Decline'}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}
    </div>
  );
};

export default RequestCard;