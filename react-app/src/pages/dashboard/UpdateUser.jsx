import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { uid } = useParams();
  const [oldUser, setOldUser] = useState({});
  const [rolesList, setRoleList] = useState([
    { id: 1, title: "SYSTEM_ADMIN" },
    { id: 2, title: "STS_MANAGER", disabled: true },
    { id: 3, title: "LANDFILL_MANAGER", disabled: true },
    { id: 4, title: "UNASSIGNED" },
  ]);

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/users/roles`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setRoleList(res.data);
  //       }
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${uid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setOldUser(res.data);
        }
      });
  }, [uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value.length > 0 ? e.target.role.value : "UNASSIGNED",
    };
    if (window.confirm("Are you sure you want to update this user?")) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/users/${uid}`, payload, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("User updated successfully");
          }
        });
    }
  };

  return (
    <div className="">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Update user
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={oldUser?.name}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              id="email-address"
              name="email"
              type="text"
              defaultValue={oldUser?.email}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          {oldUser?.role && (
            <div>
              <select
                id="role"
                name="role"
                defaultValue={oldUser?.role}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md rounded-t-none  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="" disabled hidden>
                  Assign Role
                </option>
                {rolesList.map((roleItem) => (
                  <option
                    key={roleItem.id}
                    value={roleItem.title}
                    disabled={roleItem?.disabled}
                  >
                    {roleItem.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
