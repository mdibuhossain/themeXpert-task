import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import axios from "axios";

const ThirdPartyToSTS = () => {
  const { user } = useContext(AuthContext);
  const [contractors, setContractors] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/contractors`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setContractors(res.data);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      arrival_time: new Date(
        data.get("arrivalDate") + " " + data.get("arrivalTime")
      ),
      waste: parseInt(data.get("waste")),
      stsId: user?.Sts?.id,
      vehicleType: data.get("vehicleType"),
      typeOfWaste: data.get("typeOfWaste"),
      contractorId: parseInt(data.get("contractorId")),
    };
    console.log(payload);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/sts/third-party-to-sts`,
        payload,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          alert("Successfully recorded.");
        }
      })
      .catch((err) => {
        alert(err.response.data.errors);
      });
    e.target.reset();
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Third Party to STS
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto space-y-4"
      >
        <div className=" shadow-sm -space-y-px">
          <label htmlFor="arrivalDate">Arrival time</label>
          <div className="flex -space-x-px">
            <input
              id="arrivalDate"
              name="arrivalDate"
              type="date"
              className="appearance-none relative block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Date"
              required
            />
            <input
              id="arrivalTime"
              name="arrivalTime"
              type="time"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Time"
              required
            />
          </div>
          <div>
            <label className="block mt-2" htmlFor="waste">
              Amount of waste collected (in kilograms)
            </label>
            <input
              id="waste"
              name="waste"
              type="number"
              className="appearance-none relative block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Weight (in kilograms)"
              required
            />
          </div>
          <div>
            <label htmlFor="contractorId">Contractor Id</label>
            <select
              id="contractorId"
              name="contractorId"
              defaultValue=""
              className="appearance-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
            >
              <option value="" disabled hidden>
                Select Contractor
              </option>
              {contractors.map((vehicle) => (
                <option key={vehicle?.name} value={vehicle?.id}>
                  {vehicle?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="stsId">STS ID (auto selected)</label>
            <input
              id="stsId"
              name="stsId"
              type="text"
              className="appearance-none relative block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="STS id"
              value={user?.Sts?.id}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="typeOfWaste"
            >
              Type of Waste
            </label>
            <select
              className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="typeOfWaste"
              name="typeOfWaste"
              required
            >
              <option value={"Domestic waste"}>Domestic waste</option>
              <option value={"Plastic waste"}>Plastic waste</option>
              <option value={"Construction waste"}>Construction waste</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="vehicleType"
            >
              Vehicle Type
            </label>
            <select
              className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vehicleType"
              name="vehicleType"
              required
            >
              <option value={"Open Truck"}>Open Truck</option>
              <option value={"Dump Truck"}>Dump Truck</option>
              <option value={"Compactor"}>Compactor</option>
              <option value={"Container Carrier"}>Container Carrier</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThirdPartyToSTS;
