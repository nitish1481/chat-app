import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const FriendCard = ({ username, fullName, profilePic }) => {
  const{onlineUsers}=useAuthStore();
  return (
    <Link 
      to={`/userprofile/${username}`} 
      className="group"
    >
      <div className="flex flex-col items-center p-6 bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform group-hover:-translate-y-1">
        <div className="relative">
          <img
            src={profilePic || `https://ui-avatars.com/api/?name=${fullName}&background=random`}
            alt={`${fullName}'s profile`}
            className="w-24 h-24 rounded-full object-cover border-4 border-transparent group-hover:border-primary transition-colors duration-300"
          />
          {/* Optional: Online status indicator */}
          {onlineUsers.includes(username) && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="text-center mt-4">
          <h3 className="text-lg font-bold">{fullName}</h3>
          <p className="text-sm text-base-content/60">@{username}</p>
        </div>
      </div>
    </Link>
  );
};

export default FriendCard;