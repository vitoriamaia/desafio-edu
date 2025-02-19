import type { Logo as LogoType } from "@/widgets/LayoutHeader/model/types";
import React from 'react';

const Logo: React.FC<LogoType> = ({ logoName }) => {
  return (
    <div className="logo">
      {logoName}
    </div>
  );
};

export default Logo;
