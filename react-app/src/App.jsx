import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/dashboard/Home";
import AllUsers from "./pages/dashboard/AllUsers";
import AllRoles from "./pages/dashboard/AllRoles";
import CreateUser from "./pages/dashboard/CreateUser";
import AssignRole from "./pages/dashboard/AssignRole";
import Profile from "./pages/dashboard/Profile";
import { AuthProvider } from "./contexts/auth.context";
import RequireAuth from "./routes/PrivateRoute";
import UpdateUser from "./pages/dashboard/UpdateUser";
import DashboardNav from "./pages/dashboard/DashboardNav";
import CreateSts from "./pages/dashboard/CreateSts";
import CreateLandfill from "./pages/dashboard/CreateLandfill";
import StsManager from "./pages/dashboard/StsManager";
import LandfillManager from "./pages/dashboard/LandfillManager";
import AddVehicle from "./pages/dashboard/AddVehicle";
import EntryStsVehicle from "./pages/dashboard/EntryStsVehicle";
import EntryDump from "./pages/dashboard/EntryDump";
import AdminRoute from "./routes/AdminRoute";
import StsRoute from "./routes/StsRoute";
import LandfillRoute from "./routes/LandfillRoute";
import StsVehicleRecords from "./pages/dashboard/StsVehicleRecords";
import DumpRecords from "./pages/dashboard/DumpRecords";
import SingleUser from "./pages/dashboard/SingleUser";
import AllSts from "./pages/dashboard/AllSts";
import AllLandfill from "./pages/dashboard/AllLandfill";
import RegisterContractor from "./pages/dashboard/RegisterContractor";
import ContractorManager from "./pages/dashboard/ContractorManager";
import ContractorRoute from "./routes/ContractorRoute";
import WorkforceRegistration from "./pages/dashboard/WorkforceRegistration";
import ThirdPartyToSTS from "./pages/dashboard/ThirdPartyToSTS";
import ThirdPartyList from "./pages/dashboard/ThirdPartyList";
import CreateCollectionPlan from "./pages/dashboard/CreateCollectionPlan";
import ViewCollectionPlan from "./pages/dashboard/ViewCollectionPlan";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <DashboardNav />
              </RequireAuth>
            }
          >
            <Route element={<AdminRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/users/:uid" element={<SingleUser />} />
              <Route path="/roles" element={<AllRoles />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/register-contractor" element={<RegisterContractor />} />
              <Route path="/contractor-manager" element={<ContractorManager />} />
              <Route path="/update-user/:uid" element={<UpdateUser />} />
              <Route path="/assign-role" element={<AssignRole />} />
              <Route path="/all-sts" element={<AllSts />} />
              <Route path="/all-landfill" element={<AllLandfill />} />
              <Route path="/create-sts" element={<CreateSts />} />
              <Route path="/create-landfill" element={<CreateLandfill />} />
              <Route path="/sts-manager" element={<StsManager />} />
              <Route path="/landfill-manager" element={<LandfillManager />} />
              <Route path="/add-vehicle" element={<AddVehicle />} />
            </Route>
            <Route element={<StsRoute />}>
              <Route path="/third-party-to-sts" element={<ThirdPartyToSTS />} />
              <Route path="/sts-vehicle-entry" element={<EntryStsVehicle />} />
              <Route path="/sts-vehicle-records" element={<StsVehicleRecords />} />
              <Route path="/contractor-list" element={<ThirdPartyList />} />
            </Route>
            <Route element={<LandfillRoute />}>
              <Route path="/landfill-vehicle-entry" element={<EntryDump />} />
              <Route path="/landfill-vehicle-records" element={<DumpRecords />} />
            </Route>
            <Route element={<ContractorRoute />}>
              <Route path="/register-workforce" element={<WorkforceRegistration />} />
              <Route path="/create-collection-plan" element={<CreateCollectionPlan />} />
              <Route path="/collection-plan" element={<ViewCollectionPlan />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
