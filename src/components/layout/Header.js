import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { AiOutlineLogout } from "react-icons/ai";
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
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser({
      id: "",
    });
    navigate("/");
  };
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
        {user.id ? (
          <div className="flex flex-row gap-2 items-center">
            <span>{user.fullName}</span>
            <div className="w-12 h-12">
              <img
                src={user?.avatar}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <AiOutlineLogout
              onClick={handleSignOut}
              className="text-2xl cursor-pointer"
            />
          </div>
        ) : (
          <button
            className="px-5 py-2 rounded-full bg-primary text-white"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
