import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth.context";

const EntryDump = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [stsList, setStsList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sts`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setStsList(res.data);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/vehicles`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setVehicles(res.data);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      landfillId: user?.Landfill?.id,
      stsId: Number(data.get("stsId")),
      vehicleId: Number(data.get("reg_no")),
      weight: Number(data.get("waste")),
      arrival_time: new Date(
        data.get("arrivalDate") + " " + data.get("arrivalTime")
      ),
      departure_time: new Date(
        data.get("departureDate") + " " + data.get("departureTime")
      ),
    };
    console.log(payload);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/vehicles/dump-records`,
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
        Entry vehicle leaving from Landfill
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto space-y-4"
      >
        <div className=" shadow-sm -space-y-px">
          <div>
            <label htmlFor="landfillId">Landfill ID (auto selected)</label>
            <input
              id="landfillId"
              name="landfillId"
              type="text"
              className="appearance-none relative block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="STS id"
              value={user?.Landfill?.id}
              disabled
            />
          </div>
          <label htmlFor="stsId">From STS (ward)</label>
          <select
            id="stsId"
            name="stsId"
            defaultValue=""
            className="appearance-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            required
          >
            <option value="" disabled hidden>
              Select STS
            </option>
            {stsList.map((stsItem) => (
              <option key={stsItem?.id} value={stsItem?.id}>
                {stsItem?.ward}
              </option>
            ))}
          </select>
          <label htmlFor="vehiclaeNo">Vehicle reg. no.</label>
          <select
            id="vehiclaeNo"
            name="reg_no"
            defaultValue=""
            className="appearance-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            required
          >
            <option value="" disabled hidden>
              Select Vehicle reg. No.
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle?.id} value={vehicle?.id}>
                {vehicle?.reg_no}
              </option>
            ))}
          </select>
          <div>
            <label className="block mt-2" htmlFor="weight">
              Weight (in tons)
            </label>
            <input
              id="weight"
              name="waste"
              type="number"
              className="appearance-none relative block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Weight (in tons)"
              required
            />
          </div>

          <label htmlFor="arrivalDate">Arrival time</label>
          <div className="flex -space-x-px">
            <input
              id="arrivalDate"
              name="arrivalDate"
              type="date"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
          <label htmlFor="departureDate">Departure time</label>
          <div className="flex -space-x-px">
            <input
              id="departureDate"
              name="departureDate"
              type="date"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Date"
              required
            />
            <input
              id="departureTime"
              name="departureTime"
              type="time"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Time"
              required
            />
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

export default EntryDump;
