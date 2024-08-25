import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth.context";

const ViewCollectionPlan = () => {
  const { user } = useContext(AuthContext);
  const [collectionPlans, setCollectionPlans] = useState([]);
  const [selectDate, setSelectDate] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/contractors/collection-plan`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setCollectionPlans(res.data);
        }
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/contractors/collection-plan/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setCollectionPlans(collectionPlans.filter((rec) => rec.id !== id));
        }
      })
      .catch((err) => {
        alert(err.response.data.errors);
      });
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        STS Vehicle Records
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">Area</th>
            <th className="ps-4">Collection Start</th>
            <th className="ps-4">Duration</th>
            <th className="ps-4">Number of Labour</th>
            <th className="ps-4">Number of Vans</th>
            <th className="ps-4">Expected Waste</th>
            <th className="ps-4">Contractor company</th>
            <th className="ps-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {collectionPlans?.map((rec) => (
            <tr key={rec.id}>
              <td className="p-4">{rec.area}</td>
              <td className="p-4">
                {new Date(rec.collectionStart).toLocaleString()}
              </td>
              <td className="p-4">{rec.duration}</td>
              <td className="p-4">{rec.numberOfLabour}</td>
              <td className="p-4">{rec.numberofVans}</td>
              <td className="p-4">{rec.expectedWaste}</td>
              <td className="p-4">{rec.Contractor.name}</td>
              <td className="p-4">
                <button
                  onClick={() => handleDelete(rec.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCollectionPlan;
