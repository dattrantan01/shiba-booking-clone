import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomItem from "../components/roomItem/RoomItem";
import http from "../config/axiosConfig";
import { FiEdit2 } from "react-icons/fi";
import { IoMdPricetag } from "react-icons/io";
import ModalLoading from "../components/loading/ModalLoading";
import { set } from "react-hook-form";

const LocationDetailPage = () => {
  const params = useParams();
  const [locationDetail, setLocationDetail] = useState();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id = params.id;

  const getDetailRoom = async () => {
    setIsLoading(true);
    http
      .get(`locations/${id}`)
      .then((res) => {
        console.log(res.data);
        setLocationDetail(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const getListRoom = async () => {
    setIsLoading(true);
    http
      .post(`locations/${id}/rooms/all`, {})
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  console.log("loading", isLoading);
  const getData = async () => {
    await getDetailRoom();
    await getListRoom();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <ModalLoading></ModalLoading>
      ) : (
        <div className="mt-[100px] h-full w-full flex flex-col mb-10 max-w-[1450px] mx-auto">
          <div className="w-full h-[300px] h-fit relative py-3 px-3 rounded-lg bg-slate-200">
            <div className="w-full flex flex-row gap-3 items-start">
              <div className="w-[300px] h-[300px] mt-3">
                <img
                  src={locationDetail?.imgUrl}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="py-3 w-[calc(100%-300px)]">
                <h1 className="text-3xl font-bold text-primary">
                  {locationDetail?.name}
                </h1>
                <div className="flex flex-row gap-2 mt-3">
                  <span className="font-bold">Address: </span>
                  <span className="font-medium text-slate-800 ">
                    {locationDetail &&
                      `${locationDetail?.address}, ${locationDetail?.wards}, ${locationDetail?.district}, ${locationDetail?.city}`}
                  </span>
                </div>
                <div className="w-full font-medium flex flex-row gap-3 items-start mt-3 text-slate-600">
                  <div>
                    <FiEdit2 />
                  </div>
                  {locationDetail?.description}
                </div>
                <div className="flex flex-row gap-3 mt-3">
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
          </div>
          <div className="w-full grid grid-cols-4 gap-1 gap-y-3 mt-5">
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
      )}
    </>
  );
};

export default LocationDetailPage;
