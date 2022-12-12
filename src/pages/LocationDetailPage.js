import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomItem from "../components/roomItem/RoomItem";
import http from "../config/axiosConfig";
import { FiEdit2 } from "react-icons/fi";
import { IoMdPricetag } from "react-icons/io";

const LocationDetailPage = () => {
  const params = useParams();
  const [locationDetail, setLocationDetail] = useState();
  const [rooms, setRooms] = useState([]);
  const id = params.id;

  const getDetailRoom = () => {
    http.get(`locations/${id}`).then((res) => {
      console.log(res.data);
      setLocationDetail(res.data);
    });
  };
  const getListRoom = () => {
    http.post(`locations/${id}/rooms/all`, {}).then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  };
  useEffect(() => {
    getDetailRoom();
    getListRoom();
  }, []);
  return (
    <>
      <div className="mt-[100px] h-full w-full flex flex-row mb-10 justify-between">
        <div className="w-[35%] h-full relative py-3 px-3 rounded-lg bg-slate-200">
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-primary">
              {locationDetail?.name}
            </h1>
            <div className="w-full h-[300px] mt-3">
              <img
                src={locationDetail?.imgUrl}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Address: </span>
              <span className="font-medium text-slate-600 ">
                {locationDetail &&
                  `${locationDetail?.address}, ${locationDetail?.wards}, ${locationDetail?.district}, ${locationDetail?.city}`}
              </span>
            </div>
            <div className="font-medium flex flex-row gap-3">
              <FiEdit2 />
              {locationDetail?.description}
            </div>
            <div className="flex flex-col gap-2">
              {locationDetail &&
                locationDetail?.utilityResponses.map((item) => (
                  <div className="flex flex-row gap-2 items-center">
                    <IoMdPricetag />
                    <span>{item.name}:</span>
                    <span>{item.price}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-[62%] grid grid-cols-2 gap-1 gap-y-3 scrollbar overflow-y-auto">
          {rooms.map((room) => {
            const availableDate = room.availableDay?.slice(0, 10);
            return (
              <RoomItem
                key={room.id}
                id={room.id}
                locationId={id}
                url={
                  room.imgUrl ||
                  " https://images.unsplash.com/photo-1670366732840-f34c7c12fd5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                }
                availableDate={availableDate}
                roomName={room.name}
                capacity={room.capacity}
                price={room.price}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LocationDetailPage;
