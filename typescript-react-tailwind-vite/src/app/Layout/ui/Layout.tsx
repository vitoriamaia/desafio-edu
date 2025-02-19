import { LayoutFooter, LayoutHeader } from "@/widgets";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="h-screen overflow-x-hidden">
      <LayoutHeader />
      <main>
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
