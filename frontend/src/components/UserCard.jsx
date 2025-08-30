import {Link} from "react-router-dom";

export const UserCard = ({ profilePic, username, fullName }) => (
  <Link to={`/userprofile/${username}`} className="flex items-center gap-4 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-base-100">
    {/* Profile picture container */}
    <div className="flex-shrink-0">
      <img
        src={profilePic}
        alt={`${username}'s profile`}
        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/100x100/E5E7EB/4B5563?text=user";
        }}
      />
    </div>
    {/* Username and name container */}
    <div className="flex flex-col">
      <div className="text-lg font-semibold text-gray-300">{username}</div>
      <div className="text-sm text-gray-400">{fullName}</div>
    </div>
  </Link>
);
