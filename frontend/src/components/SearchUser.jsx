import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { UserCard } from './UserCard';
import { useEffect } from 'react';

import { axiosInstance } from "../lib/axios.js";
import toast from 'react-hot-toast';

const SearchPage =  () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchTerm.trim() === '') {
        setUsers(null);
        return;
      }
      
      setIsLoading(true);
      try{
        const data=await axiosInstance.get(`/search?query=${searchTerm}`);
        setUsers(data.data);
      }
      catch(error){
        toast.error(error.response.data.message);
      }
      finally{
        setIsLoading(false);
      }

    }, 500); // Debounce delay

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return (
    <div className="min-h-screen  p-4 font-sans">
      <div className="container mx-auto max-w-2xl space-y-6 mt-14">
        {/* Search Bar */}
        <div className="relative rounded-xl shadow-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Search for users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Search Results Display */}
        <div className="space-y-4">
          {/* Conditional rendering based on search state */}
          {users !== null && !isLoading && users.length > 0 && (
            <div className="grid gap-4">
              {users.map(user => (
                <UserCard
                  key={user.username}
                  profilePic={user.profilePic}
                  username={user.username}
                  fullName={user.fullName}
                />
              ))}
            </div>
          )}

          {/* No results message */}
          {users && users.length === 0 && searchTerm.trim() !== '' && !isLoading && (
            <div className="text-center p-8 text-gray-500">
              <p>No users found with that name.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;