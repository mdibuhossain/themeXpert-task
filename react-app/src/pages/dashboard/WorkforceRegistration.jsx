import axios from "axios";
import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";

function WorkforceRegistration() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
      dateOfBirth: new Date(e.target.dateOfBirth.value),
      dateOfHire: new Date(e.target.dateOfHire.value),
      jobTitle: e.target.jobTitle.value,
      paymentRatePerHour: e.target.paymentRatePerHour.value,
      contact: e.target.contact.value,
      collectionRoute: e.target.collectionRoute.value,
      contractorManagerId: user.Contractor.id,
    };

    console.log(payload);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/workforces`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          alert("Workforce registered successfully");
        }
      })
      .catch((err) => {
        alert(err.response.data.errors);
        console.log(err);
      });
    // e.target.reset();
  };
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Workforce Registration
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Full name
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Full name"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dateOfBirth"
          >
            Date of Birth
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            name="dateOfBirth"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dateOfHire"
          >
            Date of Hire
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateOfHire"
            type="date"
            placeholder="Date of Hire"
            name="dateOfHire"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobTitle"
          >
            Job Title
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="jobTitle"
            type="text"
            placeholder="Job Title"
            name="jobTitle"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="paymentRatePerHour"
          >
            Payment Rate Per Hour
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="paymentRatePerHour"
            type="text"
            placeholder="Payment Rate Per Hour"
            name="paymentRatePerHour"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contact"
          >
            Contact Number
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contact"
            type="text"
            placeholder="Contact Number"
            name="contact"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="collectionRoute"
          >
            Assigned collection route
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="collectionRoute"
            type="text"
            placeholder="route speparate by comma"
            name="collectionRoute"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkforceRegistration;
