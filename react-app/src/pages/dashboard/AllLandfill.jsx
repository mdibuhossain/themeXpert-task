import { useEffect, useState } from "react";
import axios from "axios";

const AllLandfill = () => {
  const [landfillList, setLandfillList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/landfills`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setLandfillList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Landfill?")) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/landfills/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Landfill deleted successfully");
            setLandfillList(landfillList.filter((land) => land.id !== id));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Available landfill
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">ID</th>
            <th className="ps-4">Capacity (tons)</th>
            <th className="ps-4">Location coordinates</th>
            <th className="ps-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {landfillList.map((land) => (
            <tr key={land.id}>
              <td className="td-class">{land.id}</td>
              <td className="td-class">{land.capacity}</td>
              <td className="td-class">
                <p>Latitude: {land.latitude}</p>
                <p>Longitude: {land.longitude}</p>
              </td>
              <td className="td-class">
                <button
                  onClick={() => handleDelete(land.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default AllLandfill;
