import { useState } from "react";
import axios from "axios";

const AddVehicle = () => {
  const [capacity, setCapacity] = useState(3);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      reg_no: Number(data.get("reg_no")),
      type: e.target.type.options[e.target.type.selectedIndex].text,
      capacity: Number(capacity),
      loaded_cost: Number(data.get("loaded_cost")),
      unloaded_cost: Number(data.get("unloaded_cost")),
    };
    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/vehicles`, payload, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("Vehicle added successfully");
          }
        })
        .catch((error) => alert(error.response.data.errors));
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Add Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleRegNo"
          >
            Vehicle Registration no.
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehicleRegNo"
            type="number"
            placeholder="Vehicle Reg. no."
            name="reg_no"
            required
          />
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
            name="type"
            required
            onChange={(e) => setCapacity(e.target.value)}
          >
            <option value={3}>Open Truck</option>
            <option value={5}>Dump Truck</option>
            <option value={7}>Compactor</option>
            <option value={15}>Container Carrier</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleCapacity"
          >
            Vehicle Capacity
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehicleCapacity"
            type="number"
            placeholder="in tons"
            name="capacity"
            value={capacity}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleLoadedCost"
          >
            Fuel cost per kilometer - fully loaded
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehicleLoadedCost"
            type="number"
            placeholder="Fuel cost per kilometer"
            name="loaded_cost"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleUnloadedCost"
          >
            Fuel cost per kilometer - unloaded
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vehicleUnloadedCost"
            type="number"
            placeholder="Fuel cost per kilometer"
            name="unloaded_cost"
            required
          />
        </div>
        <div className="flex items-center justify-between" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
