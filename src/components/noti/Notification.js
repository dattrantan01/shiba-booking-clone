import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import http from "../../config/axiosConfig";
import RentBookingModal from "../rent/RentBookingModal";
import moment from "moment";

const Notification = () => {
  const [showModalDetailBooking, setShowModalDetailBooking] = useState(false);
  const [bookingId, setBookingId] = useState();
  const [showList, setShowList] = useState(false);
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    http.get(`booking/bookings/noti`).then((res) => {
      setNotifications(res.data);
      const countNoti = res.data?.reduce((accumulator, item) => {
        let read = 0;
        if (!item.isRead) read = 1;
        return accumulator + read;
      }, 0);
      setCount(countNoti);
    });
  }, [showList]);
  useEffect(() => {
    http.get(`booking/bookings/noti`).then((res) => {
      setNotifications(res.data);
      const countNoti = res.data?.reduce((accumulator, item) => {
        let read = 0;
        if (!item.isRead) read = 1;
        return accumulator + read;
      }, 0);
      setCount(countNoti);
    });
  }, []);
  const handleShowList = () => {
    setShowList((prev) => !prev);
  };
  const handleClickNoti = (item) => {
    setShowModalDetailBooking(true);
    setShowList(false);
    setBookingId(item.bookingId);
    const read = item.isRead;
    if (!read) {
      http
        .put(`booking/bookings/noti/${item.id}/isRead`)
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div className="w-6 h-6 relative cursor-pointer" onClick={handleShowList}>
      {showModalDetailBooking && (
        <RentBookingModal
          handleClose={() => setShowModalDetailBooking(false)}
          bookingId={bookingId}
        />
      )}
      <IoNotifications className="w-full h-full" />
      {count > 0 && (
        <div className="absolute w-4 h-4 rounded-full text-xs bg-red-500 text-white font-semibold -top-2 -right-2 flex items-center justify-center">
          {count}
        </div>
      )}
      {showList && (
        <div className="w-[400px] max-h-[500px] overflow-y-auto pt-3 relative shadow rounded-xl px-1 z-40 bg-slate-200 opacity-100 -translate-x-3/4 translate-y-3  flex flex-col gap-1">
          {notifications.length > 0 ? (
            notifications.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleClickNoti(item)}
                  className={`w-full flex flex-row gap-3 ${
                    item.isRead ? "bg-slate-200" : "rounded-xl bg-white"
                  }  py-2 px-2`}
                >
                  <div className="w-[70px] h-[70px]">
                    <img
                      src="/notification.svg"
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="h-full w-[calc(100%-70px)] text-sm">
                    <span className="font-bold">{item.username} </span>
                    <span className="font-medium">{item.message}</span>
                    <div className="font-semibold text-slate-400 text-xs flex flex-row gap-1 items-center mt-1">
                      {moment(item.createOn).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-[200px] h-[200px] mx-auto">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 544.16 453.28"
                class="styles_logo__3Jd-a"
                width="200"
                height="185"
              >
                <defs>
                  <linearGradient
                    id="linear-gradient__Mk9D4dKx"
                    x1="291.64"
                    y1="380.92"
                    x2="289.63"
                    y2="204.96"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0"
                      stop-color="#010101"
                      stop-opacity="0"
                    ></stop>
                    <stop offset="0.95" stop-color="#010101"></stop>
                  </linearGradient>
                  <linearGradient
                    id="linear-gradient-2__Mk9D4dKx"
                    x1="188.63"
                    y1="205.15"
                    x2="247.68"
                    y2="205.15"
                  ></linearGradient>
                  <linearGradient
                    id="linear-gradient-3__Mk9D4dKx"
                    x1="312.7"
                    y1="161.49"
                    x2="302"
                    y2="343.42"
                  ></linearGradient>
                  <linearGradient
                    id="linear-gradient-4__Mk9D4dKx"
                    x1="188.98"
                    y1="236.28"
                    x2="190.32"
                    y2="259.03"
                  ></linearGradient>
                </defs>
                <title>Inbox Empty</title>
                <path
                  d="M556.11,354.92a53.22,53.22,0,0,1-1.56,8.7,74.63,74.63,0,0,1-7.86,18.78c-20.07,35-59.37,55.27-98.92,63.54s-80.38,6.47-120.73,8.32c-54.5,2.47-108.86,11.61-163.36,8.62A368.92,368.92,0,0,1,87.26,450.5c-120.37,0-61.52-183.82-54.6-253.51,3-30,6.48-61.49,23.61-86.33,20.27-29.37,56.16-44,91.27-50.4s71.24-6,106.16-13.37c57-12,112.19-44.27,169.74-35.07,56.45,9,102.26,62.77,102.23,119.94,0,40.13-18.21,80-7.76,120C527,286.45,559.61,317.17,556.11,354.92Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#68e1fd"
                  opacity="0.24"
                ></path>
                <path
                  d="M554.55,363.62a74.63,74.63,0,0,1-7.86,18.78c-20.07,35-59.37,55.27-98.92,63.54s-80.38,6.47-120.73,8.32c-54.5,2.47-108.86,11.61-163.36,8.62A368.92,368.92,0,0,1,87.26,450.5c-16.73-4.56-51.3-10.5-61.42-26-6.33-9.67-7.37-27.79-7.58-43.06,3.79.6,7.55,1.5,10.85,1.81,11.2,1.08,22.54,1.15,33.77,1.5q35.68,1.14,71.41,1.53,142.22,1.51,284.23-9.36Q486.65,371.68,554.55,363.62Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#68e1fd"
                  opacity="0.24"
                ></path>
                <rect
                  x="277.56"
                  y="237.48"
                  width="26.76"
                  height="165.03"
                  fill="#68e1fd"
                ></rect>
                <rect
                  x="277.56"
                  y="237.48"
                  width="26.76"
                  height="165.03"
                  fill="url(#linear-gradient__Mk9D4dKx)"
                ></rect>
                <path
                  d="M379.45,197v65.4H196.1V197A34.08,34.08,0,0,1,230.23,163h115.1A34.11,34.11,0,0,1,379.45,197Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#68e1fd"
                ></path>
                <path
                  d="M218.15,158.44h0A29.52,29.52,0,0,1,247.68,188v63.9a0,0,0,0,1,0,0h-59a0,0,0,0,1,0,0V188A29.52,29.52,0,0,1,218.15,158.44Z"
                  fill="url(#linear-gradient-2__Mk9D4dKx)"
                ></path>
                <path
                  d="M379.46,197V262.4h-113V193.19c-3.37-18.09-16.1-26.4-26.57-30.23H345.34A34.1,34.1,0,0,1,379.46,197Z"
                  transform="translate(-12.22 -10.2)"
                  fill="url(#linear-gradient-3__Mk9D4dKx)"
                ></path>
                <rect
                  x="125.02"
                  y="242.83"
                  width="129.25"
                  height="9.39"
                  rx="4.69"
                  fill="#68e1fd"
                ></rect>
                <rect
                  x="125.02"
                  y="242.83"
                  width="129.25"
                  height="9.39"
                  rx="4.69"
                  fill="url(#linear-gradient-4__Mk9D4dKx)"
                ></rect>
                <path
                  d="M232.27,398.24c-15.57,2.78-31,6.39-46.77,7.91-10.22,1-21.5,1.51-28.92,8.62a9.72,9.72,0,0,0-3.29,5.88c-.43,4.92,4.72,8.35,9.31,10.16,13.41,5.3,28,6.82,42.38,7.74,23.45,1.49,47,1.51,70.45,1.53l70,.07c20.66,0,43.6-.84,58.4-15.26,2.93-2.85,5.51-6.37,6-10.43.82-6.58-4.17-12.76-10.2-15.51-10.44-4.77-26.06-3.78-37.44-5-14.79-1.64-29.67-2.54-44.55-2.72A455.74,455.74,0,0,0,232.27,398.24Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#68e1fd"
                  opacity="0.24"
                ></path>
                <path
                  d="M330.16,207.06c-.25.83-1,3.38-1.21,4.29l-2.5,9.26a5,5,0,0,0-.17,1.25,1,1,0,0,0,1.09,1,4.59,4.59,0,0,0,2.63-1.09c2-1.58,3.37-4.67,3.37-7.88a10.45,10.45,0,0,0-4.79-9.05,14.74,14.74,0,0,0-7.47-1.75c-8.8,0-15,5.83-15,14.09,0,8,5.54,13.27,13.93,13.27a22.46,22.46,0,0,0,6.38-.92,18.34,18.34,0,0,0,4.67-2.21l2.55,3.67a19.44,19.44,0,0,1-5.22,2.42,29.92,29.92,0,0,1-8.84,1.34c-5.88,0-10.47-1.67-13.77-5A17.17,17.17,0,0,1,301,217.49a18,18,0,0,1,5.08-13c3.84-3.84,8.89-5.72,15.35-5.72,9.72,0,16.65,6.26,16.65,15a14.09,14.09,0,0,1-4,10.05,11.22,11.22,0,0,1-7.8,3.42,4.11,4.11,0,0,1-3.59-1.62,3.09,3.09,0,0,1-.38-1.3,6.77,6.77,0,0,1-5.59,2.63c-4.13,0-6.76-3.09-6.76-7.84,0-7,4.64-12.89,10.18-12.89,2.34,0,3.51.58,4.63,2.34l.42-1.46Zm-8.59,12.39a15.52,15.52,0,0,0,1.67-6.43c0-1.71-1-2.88-2.42-2.88s-3.05,1.05-4.09,3a14.46,14.46,0,0,0-1.67,6.25c0,2.21.84,3.38,2.42,3.38S320.48,221.57,321.57,219.45Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#68e1fd"
                ></path>
                <path
                  d="M209.55,206.64c-17.47,0-34.4-5.3-47.55-15.07a48.68,48.68,0,0,1-9.16-8.73A34.33,34.33,0,0,1,138.73,178,42.67,42.67,0,0,1,137,105.76l1.92,2.9A39.18,39.18,0,0,0,140.51,175a32.39,32.39,0,0,0,9.66,3.89,25,25,0,0,1-3.46-11.12,19.65,19.65,0,0,1,6.74-15.43,13.49,13.49,0,0,1,21,2.85,16.41,16.41,0,0,1,2.36,12.29c-1.61,7.33-8.16,13.36-16.31,15a24.61,24.61,0,0,1-3,.41,48.16,48.16,0,0,0,6.61,5.88c14.84,11,34.76,16.08,54.63,13.87l.38,3.46A84.81,84.81,0,0,1,209.55,206.64Zm-54.88-27.16a24,24,0,0,0,5.11-.4c6.71-1.35,12.29-6.41,13.59-12.32a13.07,13.07,0,0,0-1.88-9.66,10,10,0,0,0-15.77-2.1,16,16,0,0,0-5.54,12.59A22.8,22.8,0,0,0,154.67,179.48Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#fff"
                ></path>
                <path
                  d="M151.68,98.61a21.57,21.57,0,0,1,9.06-11.83c5.46-3.37,12.16-3.88,18.56-4.31A8.49,8.49,0,0,0,176.21,88c-.39,2.14-.35,4.34-.68,6.49a19.55,19.55,0,0,1-18.78,16.07c-.85-4.59,2.41-8.82,5.47-12.35a10,10,0,0,0-7,7.71,39.61,39.61,0,0,1-.63,4.5c-.28.93-1.53,3.18-2.81,2.7-.93-.35-1-3.75-1.11-4.6A25,25,0,0,1,151.68,98.61Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#68e1fd"
                ></path>
                <path
                  d="M102.13,119.25a37.48,37.48,0,0,0,1,7.32,12.56,12.56,0,0,0,3.68,6.28,41.52,41.52,0,0,1,3.66,2.89.52.52,0,0,0,.27.2c1.15.3,2.27-4.27,2.25-5.06a11.59,11.59,0,0,0-1.81-4.86A13.31,13.31,0,0,0,102.13,119.25Z"
                  transform="translate(-12.22 -10.2)"
                  fill="#68e1fd"
                ></path>
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
