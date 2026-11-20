import React from "react";
import Menu from "../components/Menu";
import LongPress from "../components/LongPress";
import Stepper from "../components/Stepper";

const MenuPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 100,
        backgroundColor: "#edc4ff",
        padding: "20px",
      }}
    >
      <Menu />
      <LongPress />
      <Stepper />
    </div>
  );
};

export default MenuPage;
