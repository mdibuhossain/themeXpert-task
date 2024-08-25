import axios from "axios";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";

const CreateCollectionPlan = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      area: e.target.area.value,
      collectionStart: new Date(
        data.get("arrivalDate") + " " + data.get("arrivalTime")
      ),
      duration: e.target.duration.value,
      numberOfLabour: e.target.numberOfLabour.value,
      numberofVans: e.target.numberofVans.value,
      expectedWaste: e.target.expectedWaste.value,
      contractorId: user?.Contractor?.id,
    };
    try {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/contractors/collection-plan`,
          payload,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            alert("Collection Plan created successfully");
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
    // e.target.reset();
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Create Collection Plan
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="area"
          >
            Area of collection
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="area"
            type="text"
            placeholder="area"
            name="area"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="arrivalDate">Collection start time</label>
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
        </div>
        <div className="mb-4">
          <label htmlFor="duration">Duration of collection</label>
          <div className="flex -space-x-px">
            <input
              id="duration"
              name="duration"
              type="string"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="In hour"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="numberOfLabour">Number of Labour</label>
          <div className="flex -space-x-px">
            <input
              id="numberOfLabour"
              name="numberOfLabour"
              type="number"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Number of Labour"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="numberofVans">Number of Vans</label>
          <div className="flex -space-x-px">
            <input
              id="numberofVans"
              name="numberofVans"
              type="number"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Number of Vans"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="expectedWaste">
            Expected weight of daily solid waste
          </label>
          <div className="flex -space-x-px">
            <input
              id="expectedWaste"
              name="expectedWaste"
              type="number"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="weight"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCollectionPlan;
