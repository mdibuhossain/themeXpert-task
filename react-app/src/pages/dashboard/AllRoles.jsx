import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllRoles = () => {
  const [rolesList, setRoleList] = useState([]);

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

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Available Roles
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <tbody>
          {rolesList.map((role) => (
            <tr key={role.id}>
              <td className="td-class">{role.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRoles;
