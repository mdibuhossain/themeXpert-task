import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import axios from "axios";

const DumpRecords = () => {
  const { user } = useContext(AuthContext);
  const [dumpRecords, setDumpRecords] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/vehicles/landfills/${
          user?.Landfill?.id
        }/dump-records`,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setDumpRecords(res.data);
        }
      });
  }, [user?.Landfill?.id]);

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Dump Records
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">ID</th>
            <th className="ps-4">Landfill ID</th>
            <th className="ps-4">From STS (ward)</th>
            <th className="ps-4">Vehicle reg.</th>
            <th className="ps-4">Weight of waste (tons)</th>
            <th className="ps-4">Arrival time</th>
            <th className="ps-4">Departure time</th>
          </tr>
        </thead>
        <tbody>
          {dumpRecords?.map((rec) => (
            <tr key={rec?.id}>
              <td className="border px-4 py-2">{rec?.id}</td>
              <td className="border px-4 py-2">{rec?.Landfill?.id}</td>
              <td className="border px-4 py-2">{rec?.Sts?.ward}</td>
              <td className="border px-4 py-2">{rec?.Vehicle?.reg_no}</td>
              <td className="border px-4 py-2">{rec?.weight}</td>
              <td className="border px-4 py-2">
                {new Date(rec?.arrival_time).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(rec?.departure_time).toLocaleString()}
              </td>
            </tr>
          ))}
          {/* <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">Landfill 1</td>
            <td className="border px-4 py-2">KAB 123</td>
            <td className="border px-4 py-2">2</td>
            <td className="border px-4 py-2">2</td>
            <td className="border px-4 py-2">2021-10-01 12:00:00</td>
            <td className="border px-4 py-2">2021-10-01 14:00:00</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">2</td>
            <td className="border px-4 py-2">Landfill 2</td>
            <td className="border px-4 py-2">KAB 124</td>
            <td className="border px-4 py-2">3</td>
            <td className="border px-4 py-2">3</td>
            <td className="border px-4 py-2">2021-10-02 12:00:00</td>
            <td className="border px-4 py-2">2021-10-02 14:00:00</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">3</td>
            <td className="border px-4 py-2">Landfill 3</td>
            <td className="border px-4 py-2">KAB 125</td>
            <td className="border px-4 py-2">4</td>
            <td className="border px-4 py-2">4</td>
            <td className="border px-4 py-2">2021-10-03 12:00:00</td>
            <td className="border px-4 py-2">2021-10-03 14:00:00</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default DumpRecords;
