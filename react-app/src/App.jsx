import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/dashboard/Profile";
import { AuthProvider } from "./contexts/auth.context";
import RequireAuth from "./routes/PrivateRoute";
import DashboardNav from "./pages/dashboard/DashboardNav";
import AdminRoute from "./routes/AdminRoute";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Write from "./pages/Write";

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
            <Route index element={<Home />} />
            <Route path="/write-story" element={<Write />} />
            <Route path="/profile" element={<Profile />} />
            <Route element={<AdminRoute />}></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
