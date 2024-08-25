import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/monitor`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const dataFetchInterval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(dataFetchInterval);
  }, []);

  return (
    <div>
      <div className="flex flex-wra gap-5">
        <div className="bg-gradient-to-tl from-indigo-400 to-violet-500  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Total Vehicles leaving from STS</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_vehicles_leaving_sts}
          </p>
        </div>
        <div className="bg-gradient-to-tl from-pink-300 to-violet-600  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Total Vehicles enter Landfills</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_vehicles_enter_landfill}
          </p>
        </div>
        <div className="bg-gradient-to-tl from-green-400 to-lime-600  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Waste transferred from all STS</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_sts_waste} tons
          </p>
        </div>
        <div className="bg-gradient-to-tl to-green-500 from-lime-500  rounded-lg p-3 space-y-2">
          <h3 className="text-white">Waste dumped to all landfills</h3>
          <p className="text-2xl font-medium text-white">
            {data?.overview?.total_dump_waste} tons
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mt-5">
          Waste transferred from each STS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border border-slate-600 px-4 py-2 text-left">
                  STS ward
                </th>
                <th className="border border-slate-600 px-4 py-2 text-left">
                  Number of Vehicles
                </th>
                <th className="border border-slate-600 px-4 py-2 text-left">
                  Total Waste Collected
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.eachStsVehicleRecord?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-slate-400 px-4 py-2">
                    {item.ward}
                  </td>
                  <td className="border border-slate-400 px-4 py-2">
                    {item.totalVehicle}
                  </td>
                  <td className="border border-slate-400 px-4 py-2">
                    {item.totalWaste} tons
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mt-5">
          Waste dumped to each Landfill sites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border border-slate-600 px-4 py-2 text-left">
                  Landfill ID
                </th>
                <th className="border border-slate-600 px-4 py-2 text-left">
                  Number of Vehicles
                </th>
                <th className="border border-slate-600 px-4 py-2 text-left">
                  Total Waste Dumped
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.eachLandfillDumpRecord?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-slate-400 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-slate-400 px-4 py-2">
                    {item.totalVehicle}
                  </td>
                  <td className="border border-slate-400 px-4 py-2">
                    {item.totalWeight} tons
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
