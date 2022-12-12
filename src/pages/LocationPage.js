import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/search/Search";
import http from "../config/axiosConfig";
import { useSearch } from "../context/search-context";

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const { search } = useSearch();
  const navigate = useNavigate();
  console.log(search);
  useEffect(() => {
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, [search.cityId, search.districtId, search.wardId]);
  const handleSearch = (values) => {};
  const handleClickLocation = (locationId) => {
    navigate(`/location-detail/${locationId}`);
  };
  return (
    <div className="mt-[100px] flex flex-row gap-8">
      <div className="px-8 py-5 bg-opacity-20 rounded-3xl">
        <Search handleSearch={handleSearch} col={true} />
      </div>
      <div className="grid grid-cols-2 w-full">
        {locations.length > 0 &&
          locations.map((item) => {
            const address = `${item.wards}, ${item.district}, ${item.city}`;
            return (
              <div key={item.id} className="w-[350px] flex flex-col gap-2">
                <div
                  onClick={() => handleClickLocation(item.id)}
                  className="w-full h-[300px] cursor-pointer"
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
                  <p className="mt-2">{item.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LocationPage;
