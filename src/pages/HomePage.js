import React from "react";
import { GiFlowerStar } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import Search from "../components/search/Search";
import { useSearch } from "../context/search-context";
import ListRoomSwiper from "../components/swiper/ListRoomSwiper";

const HomePage = () => {
  const navigate = useNavigate();
  const { search } = useSearch();
  console.log(search);
  const handleSearch = (values) => {
    navigate(`location`);
  };
  return (
    <>
      <section className=" w-full max-w-[1250px] mx-auto mt-6 relative">
        <div className="w-full h-[500px] relative rounded-3xl overflow-auto">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80"
            alt=""
            className="w-full h-full object-cover scale-30"
          />
          <div className="w-full h-full absolute z-10 top-0 left-0 bg-black bg-opacity-20 flex flex-col justify-center items-center">
            <div className=" text-white  text-center flex flex-col gap-5">
              <span className="text-6xl font-bold">
                Explore beautiful places
              </span>
              <div className="font-semibold flex flex-row gap-3 items-center justify-center">
                <GiFlowerStar />
                <span>All you need is Shiba Booking</span>
                <GiFlowerStar />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[85%] z-10 h-[120px] bg-white bg-opacity-80 rounded-3xl bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] flex flex-row px-8 py-4 gap-4 shadow-lg">
          <Search handleSearch={handleSearch} />
        </div>
      </section>
      <section className="w-full max-w-[1250px] mx-auto mt-[150px] relative">
        <h2 className="text-3xl font-bold mb-10">Choose your rooms now</h2>
        <ListRoomSwiper></ListRoomSwiper>
      </section>
    </>
  );
};

export default HomePage;
