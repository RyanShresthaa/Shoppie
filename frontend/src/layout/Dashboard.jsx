import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4 grid  lg:grid-cols-[260px,1fr]">
        <div>
          {/* menu part */}
          <div className="py-4 sticky top-24 overflow-y-auto lg:block hidden border-r-2">
            <UserMenu/>
          </div>
        </div>

          {/* content part */}
          <div className="bg-white min-h-[72vh] ">
            <Outlet/>
          </div>

      </div>
    </section>
  );
};

export default Dashboard;
