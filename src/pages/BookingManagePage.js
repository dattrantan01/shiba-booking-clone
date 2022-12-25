import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import RentBooking from "../components/rent/RentBooking";
import http from "../config/axiosConfig";
import Loading from "../components/loading/Loading";
import { toast } from "react-toastify";
import ModalLoading from "../components/loading/ModalLoading";

const BookingManagePage = () => {
  const params = useParams();
  const status = params.status;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const navigate = useNavigate();

  const getBookings = () => {
    setIsLoading(true);
    http
      .get(`booking/bookings/current-user?status=${status}`)
      .then((res) => {
        console.log(res);
        setBookings(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getBookings();
  }, [status]);

  const handlePayment = (id) => {
    setIsLoadingButton(true);
    http
      .post(`booking/payment`, {
        bookingId: id,
        orderDesc: "string",
        language: 1,
        bank: 8,
        orderCategory: 4,
        billingMobile: "string",
        billingEmail: "string",
        billingFirstName: "string",
        billingLastName: "string",
        billingAddress: "string",
        billingCity: "string",
        billingCountry: "string",
        shippingMobile: "string",
        shippingEmail: "string",
        shippingCustomer: "string",
        shippingAddress: "string",
        shippingCompany: "string",
        shippingTaxCode: "string",
        shippingBillType: 1,
      })
      .then((res) => {
        setIsLoadingButton(false);
        window.location.replace(res.data.response);
        console.log(res);
      })
      .catch((err) => {
        setIsLoadingButton(false);
      });
  };
  const handleDuePayment = (id) => {
    setIsLoadingButton(true);
    http
      .post(`booking/payment`, {
        bookingId: id,
        orderDesc: "string",
        language: 1,
        bank: 8,
        orderCategory: 4,
        billingMobile: "string",
        billingEmail: "string",
        billingFirstName: "string",
        billingLastName: "string",
        billingAddress: "string",
        billingCity: "string",
        billingCountry: "string",
        shippingMobile: "string",
        shippingEmail: "string",
        shippingCustomer: "string",
        shippingAddress: "string",
        shippingCompany: "string",
        shippingTaxCode: "string",
        shippingBillType: 1,
      })
      .then((res) => {
        setIsLoadingButton(false);
        window.location.replace(res.data);
        console.log(res);
      })
      .catch((err) => {
        setIsLoadingButton(false);
      });
  };
  const handleExtendDue = (id, months) => {
    setIsLoadingButton(true);
    http
      .put(`booking/bookings/${id}/extend`, {
        monthNumber: months,
      })
      .then((res) => {
        http
          .post(`booking/payment`, {
            bookingId: id,
            orderDesc: "string",
            language: 1,
            bank: 8,
            orderCategory: 4,
            billingMobile: "string",
            billingEmail: "string",
            billingFirstName: "string",
            billingLastName: "string",
            billingAddress: "string",
            billingCity: "string",
            billingCountry: "string",
            shippingMobile: "string",
            shippingEmail: "string",
            shippingCustomer: "string",
            shippingAddress: "string",
            shippingCompany: "string",
            shippingTaxCode: "string",
            shippingBillType: 1,
          })
          .then((res) => {
            window.location.replace(res.data);
            setIsLoadingButton(false);
            console.log(res);
          })
          .catch((err) => {
            setIsLoadingButton(false);
            toast.error(err);
          });
      });
  };
  const handleDoneExtendDue = (id) => {
    setIsLoadingButton(true);
    http
      .put(`booking/bookings/${id}/done`)
      .then((res) => {
        setIsLoadingButton(false);
        toast.success(res);
      })
      .catch((err) => {
        setIsLoadingButton(false);
        console.error(err);
      });
  };
  const handleDonePendingBooking = (id) => {
    setIsLoadingButton(true);
    http
      .put(`booking/bookings/${id}/reject`)
      .then((res) => {
        toast.success("success");
        setIsLoadingButton(false);
        getBookings();
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingButton(false);
      });
  };
  return (
    <div className="px-5 pt-5 w-full">
      {isLoadingButton && <ModalLoading />}
      {isLoading ? (
        // <div className="w-9 h-9 border-8 rounded-full border-t-transparent animate-spin border-slate-400 mx-auto"></div>
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1  gap-6 w-full">
          {bookings.map((item) => {
            return (
              <RentBooking
                key={item.id}
                id={item.id}
                roomName={item.roomName}
                userName={item.userName}
                startDate={item.startDay}
                monthRent={item.monthNumber}
                status={item.status}
                utilities={item.utilities}
                handlePayment={handlePayment}
                handleDuePayment={handleDuePayment}
                handleExtendDue={handleExtendDue}
                handleDoneExtendDue={handleDoneExtendDue}
                imgUrl={item.imgUrl}
                isLoadingButton={isLoadingButton}
                handleDonePendingBooking={handleDonePendingBooking}
                overDueDay={item.overDueDay}
              ></RentBooking>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingManagePage;
