import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth.context";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
    };
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/profile`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Profile updated successfully!");
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Profile
      </h2>
      <div>
        <p className="text-center text-xl font-semibold">
          Welcome, <span className="text-lime-600 font-bold">{user.name}</span>
        </p>
        <p className="text-center text-base font-normal">{user.email}</p>
        <p className="text-center">
          <span className="bg-indigo-300 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {user?.role}
          </span>
        </p>
        {user?.email && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.name}
                className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your name"
              />
              <button
                type="submit"
                className="py-1 px-3 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
