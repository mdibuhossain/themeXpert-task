import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import axios from "axios";

const LandfillManager = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [landfillList, setLandfillList] = useState([]);

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
      .get(`${import.meta.env.VITE_BACKEND_URL}/landfills`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setLandfillList(res.data);
        }
      });
  }, []);

  const handleAssignLandfill = (uid) => {
    const lid = document.getElementById(`role-${uid}`).value;
    if (window.confirm("Are you sure you want to assign this role?")) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/landfills/managers`,
          { uid, lid },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            alert(res.data.message || "Landfill assigned successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.errors || "Something went wrong!");
        });
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Landfill Manager
      </h2>
      {landfillList.length > 0 ? (
        <table className="border-separate w-full border-spacing-y-2 text-sm">
          <thead className="text-left">
            <tr>
              <th className="ps-4">Name</th>
              <th className="ps-4">Email</th>
              <th className="ps-4">Landfill</th>
              <th className="ps-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(
              (user) =>
                user?.role !== "SYSTEM_ADMIN" &&
                currentUser?.email !== user?.email && (
                  <tr key={user?.id}>
                    <td className="td-class">{user?.name}</td>
                    <td className="td-class">{user?.email}</td>
                    <td className="td-class">
                      {user?.Sts ? (
                        `STS_MANAGER at ward-${user?.Sts?.ward}`
                      ) : (
                        <select
                          id={`role-${user?.id}`}
                          name="role"
                          defaultValue={user?.Landfill?.id || -1}
                          className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                          {/* <option value="" disabled hidden>
                        Assign STS
                      </option> */}
                          <option value={-1}>UNASSIGNED</option>
                          {landfillList.map((landItem) => (
                            <option key={landItem.id} value={landItem.id}>
                              Landfill {landItem.id}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="td-class">
                      {user?.Sts ? null : (
                        <button
                          onClick={() => handleAssignLandfill(user?.id)}
                          className="py-1 px-3 bg-green-500 hover:bg-green-400 text-xs rounded-full text-red-600 hover:text-red-900"
                        >
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      ) : (
        "No Landfill site found."
      )}
    </div>
  );
};

export default LandfillManager;
