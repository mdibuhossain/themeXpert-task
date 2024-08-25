import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

const AllUsers = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 204) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          }
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Available users
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">Name</th>
            <th className="ps-4">Email</th>
            <th className="ps-4">Role</th>
            <th className="ps-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="td-class">
                {user.name}
                {currentUser?.email === user.email ? " (You)" : null}
              </td>
              <td className="td-class">
                <NavLink to={`/users/${user.id}`} className="text-blue-600">
                  {user.email}
                </NavLink>
              </td>
              <td className="td-class">{user.role}</td>
              <td className="td-class">
                {currentUser?.email === user.email ? (
                  "No actions available"
                ) : (
                  <div className="flex space-x-4 items-center">
                    <Link to={`/update-user/${user.id}`}>
                      <svg
                        className="w-8 h-8 text-blue-600 hover:text-blue-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    <button onClick={() => handleDelete(user.id)}>
                      <svg
                        className="w-8 h-8 text-red-500 hover:text-red-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
