import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import axios from "axios";

const ContractorManager = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [contractorList, setContractorList] = useState([]);

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
      .get(`${import.meta.env.VITE_BACKEND_URL}/contractors`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setContractorList(res.data);
        }
      });
  }, []);

  const handleAssignLandfill = (uid) => {
    const cid = document.getElementById(`role-${uid}`).value;
    if (
      window.confirm(
        "Are you sure you want to assign this user as Contractor manager?"
      )
    ) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/contractors/managers`,
          { uid, cid },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            alert(res.data.message || "Successfully assigned.");
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
        Contractor Manager
      </h2>
      {contractorList.length > 0 ? (
        <table className="border-separate w-full border-spacing-y-2 text-sm">
          <thead className="text-left">
            <tr>
              <th className="ps-4">Name</th>
              <th className="ps-4">Email</th>
              <th className="ps-4">Contractor company</th>
              <th className="ps-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(
              (user) =>
                user?.role !== "SYSTEM_ADMIN" &&
                currentUser?.email !== user?.email &&
                !(user?.Sts || user?.Landfill) && (
                  <tr key={user?.id}>
                    <td className="td-class">{user?.name}</td>
                    <td className="td-class">{user?.email}</td>
                    <td className="td-class">
                      {user?.Sts || user?.Landfill ? null : (
                        <select
                          id={`role-${user?.id}`}
                          name="role"
                          defaultValue={user?.Contractor?.id || -1}
                          className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                          {/* <option value="" disabled hidden>
                        Assign STS
                      </option> */}
                          <option value={-1}>UNASSIGNED</option>
                          {contractorList.map((contractor) => (
                            <option key={contractor.id} value={contractor.id}>
                              {contractor.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="td-class">
                      {user?.Sts || user?.Landfill ? null : (
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
        "No contractor available."
      )}
    </div>
  );
};

export default ContractorManager;
