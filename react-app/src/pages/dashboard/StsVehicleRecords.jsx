import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth.context";

const StsVehicleRecords = () => {
  const { user } = useContext(AuthContext);
  const [vehicleRecords, setVehicleRecords] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/vehicles/sts/${
          user?.Sts?.id
        }/sts-records`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setVehicleRecords(res.data);
        }
      });
  }, [user?.Sts?.id]);
  console.log(vehicleRecords);
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        STS Vehicle Records
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">ID</th>
            <th className="ps-4">STS ward</th>
            <th className="ps-4">Vehicle reg.</th>
            <th className="ps-4">Waste (tons)</th>
            <th className="ps-4">Arrival time</th>
            <th className="ps-4">Departure time</th>
          </tr>
        </thead>
        <tbody>
          {vehicleRecords?.map((rec) => (
            <tr key={rec?.id}>
              <td className="border px-4 py-2">{rec?.id}</td>
              <td className="border px-4 py-2">{rec?.Sts?.ward}</td>
              <td className="border px-4 py-2">{rec?.Vehicle?.reg_no}</td>
              <td className="border px-4 py-2">{rec?.waste}</td>
              <td className="border px-4 py-2">
                {new Date(rec?.arrival_time).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(rec?.departure_time).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StsVehicleRecords;
