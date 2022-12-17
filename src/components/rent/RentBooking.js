import moment from "moment";
import React from "react";

import { FiClipboard } from "react-icons/fi";
import {
  MdMeetingRoom,
  MdPeople,
  MdCalendarToday,
  MdFormatListBulleted,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import http from "../../config/axiosConfig";
const RentBooking = ({
  roomName,
  userName,
  startDate,
  status,
  monthRent,
  utilities,
  id,
  handlePayment,
  handleDuePayment,
  imgUrl,
}) => {
  const endDate = moment(startDate)
    .add(monthRent, "months")
    .toISOString()
    .slice(0, 10);
  return (
    <div className="relative z-10 rounded-lg w-full bg-slate-100 px-5 py-5 flex flex-col">
      <h2 className="font-bold text-3xl text-center text-primary">#{id}</h2>
      <div className="mt-5 text-lg">
        <div className="w-full flex flex-row gap-3">
          <div className="w-[150px] h-[150px]">
            <img src={imgUrl} alt="" className="object-contain w-full h-full" />
          </div>
          <div className="w-[calc(100%-150px)]">
            <div className="w-full grid grid-cols-2">
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdMeetingRoom />
                  <span className="font-semibold">Room name:</span>
                  <span>{roomName}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdPeople />
                  <span className="font-semibold">User:</span>
                  <span>{userName}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">Month Rent:</span>
                  <span>{monthRent}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">Start Date:</span>
                  <span>{startDate.slice(0, 10)}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <FiClipboard />
                  <span className="font-semibold">Status:</span>
                  <div
                    className={`${
                      status === "Approved"
                        ? "bg-green-400"
                        : status === "Pending"
                        ? "bg-yellow-400"
                        : status === "Reject"
                        ? "bg-red-400"
                        : "bg-purple-400"
                    } text-white font-semibold px-2 py-1 rounded-full`}
                  >
                    {status}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">End Date:</span>
                  <span>{endDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-row gap-2 items-center">
                <MdFormatListBulleted />
                <span className="font-semibold">Utilities:</span>
              </div>
              <div className="mt-3 ml-5 flex flex-row gap-5 text-base">
                {utilities.map((item) => {
                  return (
                    <div className="flex flex-row gap-1 items-center">
                      <IoMdPricetag />
                      <span>{item.name}:</span>
                      <span>{item.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {status === "Approved" && (
          <div className="w-full mt-5 mx-auto max-w-[200px] ">
            <button
              onClick={() => handlePayment(id)}
              className="outline-none px-5 py-3 text-white bg-primary rounded-lg "
            >
              Payment
            </button>
          </div>
        )}
        {status === "DuePayment" && (
          <div className="w-full mt-5 mx-auto max-w-[200px] ">
            <button
              onClick={() => handleDuePayment(id)}
              className="outline-none px-5 py-3 text-white bg-primary rounded-lg "
            >
              Due Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentBooking;
