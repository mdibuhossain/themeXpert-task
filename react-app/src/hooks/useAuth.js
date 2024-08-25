import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const location = useLocation();
  const history = useNavigate();

  const redirect = useCallback(() => {
    const { state } = location;
    state?.from ? history(state?.from?.pathname) : history("/");
  }, [history, location]);

  const login = (payload) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          checkProfile();
        }
      })
      .catch((err) => {
        alert(err.response.data.errors);
      });
  };

  const logout = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        redirect("/login");
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkProfile = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkProfile();
  }, []);

  useEffect(() => {
    user && location.pathname === "/login" && redirect();
  }, [location, redirect, user]);

  return {
    user,
    setUser,
    login,
    checkProfile,
    logout,
  };
};

export default useAuth;
