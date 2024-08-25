import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import axios from "axios";

const EntryStsVehicle = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);

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
      stsId: user?.Sts?.id,
      reg_no: Number(data.get("reg_no")),
      waste: Number(data.get("waste")),
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
        `${import.meta.env.VITE_BACKEND_URL}/vehicles/sts-records`,
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
        Entry vehicle leaving from STS
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto space-y-4"
      >
        <div className=" shadow-sm -space-y-px">
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
              <option key={vehicle?.id} value={vehicle?.reg_no}>
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

export default EntryStsVehicle;
