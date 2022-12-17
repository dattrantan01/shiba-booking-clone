import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  {
    url: "/",
    name: "Home",
  },
  {
    url: "/location",
    name: "Location",
  },
  {
    url: "/booking",
    name: "Booking",
  },
];

const Header = () => {
  return (
    <div className="header flex flex-row justify-between items-center text-primary h-[70px] pt-6">
      <div className="cursor-pointer font-bungee text-2xl">Shiba Booking</div>
      <div className="flex flex-row gap-10 font-medium">
        {items.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.url}
              className={({ isActive }) =>
                `cursor-pointer inline-block border-b-[3px] border-transparent hover:border-primary pb-1 ${
                  isActive ? "border-primary" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <div>
        <button className="px-5 py-2 rounded-full bg-primary text-white">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Header;
