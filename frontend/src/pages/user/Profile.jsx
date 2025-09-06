import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <p className="p-6 text-gray-500">No user data available</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h2>

      <div className="bg-white shadow rounded-xl p-6 max-w-md">
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="text-lg font-semibold">{user.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Username</p>
            <p className="text-lg font-semibold capitalize">{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
