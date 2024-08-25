import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/auth.context";

const ThirdPartyList = () => {
  const { user } = useContext(AuthContext);
  const [contractors, setContractors] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  const [billFile, setBillFile] = useState(null);

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

  const generateBills = (contractorId) => {
    const payload = {
      stsId: user?.Sts?.id,
      contractorId: contractorId,
      date: selectDate,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/sts/generate-bills`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        setBillFile(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.errors);
      });
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Third Party List
      </h2>
      <table className="border-separate w-full border-spacing-y-2 text-sm">
        <thead className="text-left">
          <tr>
            <th className="ps-4">ID</th>
            <th className="ps-4">Registration ID</th>
            <th className="ps-4">Company name</th>
            <th className="ps-4">Registration Date</th>
            <th className="ps-4">Workforce</th>
            <th className="ps-4">Payment per on</th>
            <th className="ps-4">Required Waste Amount</th>
            <th className="ps-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contractors?.map((rec) => (
            <tr key={rec?.id}>
              <td className="border px-4 py-2">{rec?.id}</td>
              <td className="border px-4 py-2">{rec?.registrationId}</td>
              <td className="border px-4 py-2">{rec?.name}</td>
              <td className="border px-4 py-2">
                {new Date(rec?.registrationDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{rec?.workforce}</td>
              <td className="border px-4 py-2">{rec?.paymentPerTon}</td>
              <td className="border px-4 py-2">{rec?.requiredWasteAmount}</td>
              <td className="border px-4 py-2 flex">
                <input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Date"
                  onChange={(e) => setSelectDate(e.target.value)}
                />
                <button
                  onClick={() => generateBills(rec?.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Generate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Bill billFile={billFile} />
    </div>
  );
};

const Bill = ({ billFile }) => {
  if (billFile) {
    return (
      <>
        {billFile?.totalBill > 0 ? (
          <>
            <p>Bill: {Math.abs(billFile.basicPay)} Taka</p>
            <p>Fine: {Math.abs(billFile.fine)} Taka</p>
          </>
        ) : (
          <>
            <p>Bill: {Math.abs(billFile.basicPay)} Taka</p>
            <p>Fine: {Math.abs(billFile.fine)} Taka</p>
          </>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default ThirdPartyList;
