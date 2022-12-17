import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/search/Search";
import http from "../config/axiosConfig";
import { useSearch } from "../context/search-context";
import Loading from "../components/loading/Loading";

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useSearch();
  const navigate = useNavigate();
  console.log(search);
  useEffect(() => {
    setIsLoading(true);
    const city = search.cityId;
    const district = search.districtId;
    const ward = search.wardId;
    http
      .get(
        `locations/all?cityId=${city || ""}&districtId=${
          district || ""
        }&wardsId=${ward || ""}`
      )
      .then((res) => {
        setLocations(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [search.cityId, search.districtId, search.wardId]);
  const handleSearch = (values) => {
    setIsLoading(true);
    console.log(values.minPrice, values.maxPrice);
    const city = search.cityId;
    const district = search.districtId;
    const ward = search.wardId;
    http
      .get(
        `locations/all?cityId=${city || ""}&districtId=${
          district || ""
        }&wardsId=${ward || ""}&minPrice=${values.minPrice}&maxPrice=${
          values.maxPrice
        }`
      )
      .then((res) => {
        setLocations(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };
  const handleClickLocation = (locationId) => {
    navigate(`/location-detail/${locationId}`);
  };
  console.log("loading", isLoading);
  return (
    <div className="mt-[80px] flex flex-row w-full relative">
      <div className="px-8 py-5 bg-opacity-20  w-[25%] shadow-lg h-[720px] sticky top-0 border border-slate-100">
        <Search handleSearch={handleSearch} col={true} />
      </div>
      <div className="w-[75%] px-5 border">
        <h1 className="text-2xl font-bold mb-5 mt-5">
          Are you looking for an accommodation?
        </h1>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-4 gap-1 ">
            {locations.length > 0 &&
              locations.map((item) => {
                const address = `${item.wards}, ${item.district}, ${item.city}`;
                return (
                  <div key={item.id} className="w-[270px] flex flex-col gap-2">
                    <div
                      onClick={() => handleClickLocation(item.id)}
                      className="w-full h-[250px] cursor-pointer"
                    >
                      <img
                        src={item.imgUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex w-full h-[150px] flex-col px-1 py-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm font-medium text-slate-600">
                        {address}
                      </p>
                      <p className="truncate mt-2 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPage;
