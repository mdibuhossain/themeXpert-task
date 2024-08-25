import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";

const AssignRole = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [rolesList, setRoleList] = useState([]);

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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/roles`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setRoleList(res.data);
        }
      });
  }, []);

  const handleAssignRole = (id) => {
    const role = document.getElementById(`role-${id}`).value;
    console.log(role);
    if (window.confirm("Are you sure you want to assign this role?")) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/users/${id}/roles`,
          { role: role.length > 0 ? role : "UNASSIGNED" },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("Role assigned successfully");
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
            <th className="ps-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {rolesList?.length
            ? users?.map(
                (user) =>
                  currentUser?.email !== user?.email && (
                    <tr key={user?.id}>
                      <td className="td-class">{user?.name}</td>
                      <td className="td-class">{user?.email}</td>
                      <td className="td-class">
                        <select
                          id={`role-${user?.id}`}
                          name="role"
                          defaultValue={user?.role}
                          className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                          <option value="" disabled hidden>
                            Assign Role
                          </option>
                          {rolesList?.map((roleItem) => (
                            <option key={roleItem.id} value={roleItem.title}>
                              {roleItem.title}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="td-class">
                        <button
                          onClick={() => handleAssignRole(user?.id)}
                          className="py-1 px-3 bg-green-500 hover:bg-green-400 text-xs rounded-full text-red-600 hover:text-red-900"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  )
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default AssignRole;
