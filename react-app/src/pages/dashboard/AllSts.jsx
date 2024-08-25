import { useEffect, useState } from "react";
import axios from "axios";

const AllSts = () => {
  const [stsList, setStsList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sts`, {
        withCredentials: true,
      })
      .then((response) => {
        setStsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this STS?")) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/sts/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("STS deleted successfully");
            setStsList(stsList.filter((sts) => sts.id !== id));
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
        Available sts
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">Ward no.</th>
            <th className="ps-4">Capacity (tons)</th>
            <th className="ps-4">Location coordinates</th>
            <th className="ps-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stsList.map((sts) => (
            <tr key={sts.id}>
              <td className="td-class">{sts.ward}</td>
              <td className="td-class">{sts.capacity}</td>
              <td className="td-class">
                <p>Latitude: {sts.latitude}</p>
                <p>Longitude: {sts.longitude}</p>
              </td>
              <td className="td-class">
                <button
                  onClick={() => handleDelete(sts.id)}
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

export default AllSts;
