import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleUser = () => {
  const { uid } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${uid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setUser(res.data);
        }
      });
  }, [uid]);

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        User information
      </h2>
      <div className="w-1/2 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Name:</p>
          <p>{user.name}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Email:</p>
          <p>{user.email}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Role:</p>
          <p>
            <span className="bg-indigo-300 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {user?.role}
            </span>
            {user.role !== "UNASSIGNED" && (user?.Sts || user?.Landfill) ? (
              <>
                {" at "}
                {user?.Sts ? `ward: ${user?.Sts?.ward}` : null}
                {user?.Landfill ? `Landfill-${user?.Landfill?.id}` : null}
              </>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
