import axios from "axios";

function RegisterContractor() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
      contractId: e.target.contractId.value,
      registrationId: e.target.registrationId.value,
      tin: e.target.tin.value,
      contact: e.target.contact.value,
      area: e.target.area.value,
      workforce: e.target.workforce.value,
      paymentPerTon: e.target.paymentPerTon.value,
      requiredWasteAmount: e.target.requiredWasteAmount.value,
      contractDuration: e.target.contractDuration.value,
      registrationDate: new Date(e.target.registrationDate.value),
    };

    console.log(payload);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/contractors`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          alert("Contractor registered successfully");
        }
      })
      .catch((err) => {
        alert(err.response.data.errors);
        console.log(err);
      });
    e.target.reset();
  };
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Registration of Contractor
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name of the company
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Company Name"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contractId"
          >
            Contract ID
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contractId"
            type="number"
            placeholder="Contract ID"
            name="contractId"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="registrationId"
          >
            Registration ID
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="registrationId"
            type="text"
            placeholder="Registration ID"
            name="registrationId"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tin"
          >
            TIN Number
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tin"
            type="number"
            placeholder="TIN Number"
            name="tin"
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
            htmlFor="area"
          >
            Area of operation
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="area"
            type="text"
            placeholder="Area of operation"
            name="area"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="workforce"
          >
            Workforce
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="workforce"
            type="number"
            placeholder="Workforce"
            name="workforce"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="paymentPerTon"
          >
            Payment per tonnage of waste
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="paymentPerTon"
            type="number"
            min={0}
            placeholder="Payment per ton"
            name="paymentPerTon"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="requiredWasteAmount"
          >
            Required waste amount per day
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="requiredWasteAmount"
            type="number"
            min={0}
            placeholder="Required waste amount"
            name="requiredWasteAmount"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contractDuration"
          >
            Contract Duration in days
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contractDuration"
            type="number"
            placeholder="Contract Duration in days"
            name="contractDuration"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="registrationDate"
          >
            Registration Date
          </label>
          <input
            id="registrationDate"
            name="registrationDate"
            type="date"
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Date"
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

export default RegisterContractor;
