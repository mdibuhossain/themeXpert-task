import { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import { ADMIN_NAVs, COMMON_NAVs } from "../../utils/links";

const NavListView = (NavList) => {
  return NavList.map((nav) => (
    <NavLink
      key={nav.path}
      // className="p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
      className={({ isActive }) =>
        isActive
          ? "p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden bg-gray-400"
          : "p-1 ps-2 hover:bg-gray-400 rounded-md overflow-hidden"
      }
      to={nav.path}
    >
      {nav.name}
    </NavLink>
  ));
};

const DashboardNav = () => {
  const { user, logout, history } = useContext(AuthContext);

  const handleWriteStory = () => {
    history("/write-story");
  };

  return (
    <div>
      <div className="flex flex-row w-full relative">
        {/* Slidebar */}
        <div className="flex w-[300px] h-screen">
          {/* slidebar innner floating bar */}
          <div className="p-3 m-3 w-full bg-[#1c2333] rounded-lg overflow-y-auto relative space-y-2">
            <div className="p-1 ps-2 text-white font-extrabold text-4xl mb-10">
              StoryHunter
            </div>
            <div className="flex flex-col gap-y-2 font-light text-white overflow-auto">
              {user?.role === "ADMIN" ? NavListView(ADMIN_NAVs) : null}
              {NavListView(COMMON_NAVs)}
            </div>
            <button
              onClick={logout}
              className="font-semibold p-1 px-3 hover:bg-gray-400 bg-gray-300 rounded-md overflow-hidden  bottom-3"
            >
              Logout
            </button>
            <button
              onClick={handleWriteStory}
              className="absolute bottom-2 left-2 hover:bg-gray-400 bg-gray-300 rounded-full font-semibold p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
              </svg>
            </button>
          </div>
        </div>
        {/* Dynamic page */}
        <div className="overflow-auto w-full p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
