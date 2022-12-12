import moment from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  MdLocationPin,
  MdMeetingRoom,
  MdPeople,
  MdCalendarToday,
  MdFormatListBulleted,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import { toast } from "react-toastify";
import http from "../../config/axiosConfig";

const RentModal = ({
  handleClose,
  roomDetail,
  locationDetail,
  startDate,
  monthRent,
  utilities,
}) => {
  if (typeof document === "undefined") return <div className="Modal"></div>;
  const utilitiesClient = [];
  utilities.forEach((utility) => {
    if (utility.checked === true) utilitiesClient.push(utility.value);
  });
  const endDate = moment(startDate)
    .add(monthRent, "months")
    .toISOString()
    .slice(0, 10);
  const handleRent = () => {
    const booking = {
      roomId: roomDetail.id,
      startDay: startDate.toISOString(),
      monthNumber: monthRent,
      utilities: utilitiesClient,
    };
    console.log(booking);
    http
      .post(`bookings`, booking)
      .then((res) => {
        console.log("booking", res);
        toast.success("Booking success");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.data.message);
      });
  };
  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div
        onClick={handleClose}
        className="w-8 h-8 absolute top-5 right-5 cursor-pointer z-60"
      >
        <AiOutlineCloseCircle className="w-full h-full" />
      </div>
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[550px]  bg-slate-100 px-5 py-5 flex flex-col">
        <h2 className="font-bold text-3xl text-center text-primary">
          YOUR BOOKING
        </h2>
        <p className="font-semibold text-xl text-center mt-4">
          {locationDetail?.name}
        </p>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-row gap-2 items-start">
            <div className="flex flex-row gap-2 items-center">
              <MdLocationPin />
              <span className="font-semibold">Location:</span>
            </div>
            <span>
              {`${locationDetail?.address}, ${locationDetail?.wards}, ${locationDetail?.district}, ${locationDetail?.city}`}
            </span>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdMeetingRoom />
              <span className="font-semibold">Room name:</span>
              <span>{roomDetail?.name}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdPeople />
              <span className="font-semibold">Capacity:</span>
              <span>{roomDetail?.capacity}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdCalendarToday />
              <span className="font-semibold">Start Date:</span>
              <span>{startDate.toISOString().slice(0, 10)}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdCalendarToday />
              <span className="font-semibold">End Date:</span>
              <span>{endDate}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <MdFormatListBulleted />
              <span className="font-semibold">Utilities:</span>
            </div>
            <div className="mt-3 ml-5">
              {utilitiesClient.map((item) => {
                return (
                  <div className="flex flex-row gap-2 items-center">
                    <MdOutlineCheckCircleOutline />
                    {`${item.price} ${item.name}`}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          onClick={handleRent}
          className="outline-none px-4 py-2 text-white bg-primary rounded-lg max-w-[200px] mt-auto mx-auto"
        >
          Rent Now
        </button>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default RentModal;
