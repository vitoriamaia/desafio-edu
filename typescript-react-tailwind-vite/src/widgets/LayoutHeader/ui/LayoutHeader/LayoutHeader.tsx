import { Logo } from "@/widgets";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";

const LayoutHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <header>
        
          
      </header>
    </>
  );
};

export default LayoutHeader;
