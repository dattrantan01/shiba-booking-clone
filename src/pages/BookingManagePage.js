import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RentBooking from "../components/rent/RentBooking";
import http from "../config/axiosConfig";
import Loading from "../components/loading/Loading";
import { toast } from "react-toastify";

const BookingManagePage = () => {
  const params = useParams();
  const status = params.status;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
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
  }, [status]);
  const handlePayment = (id) => {
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
        window.location.replace(res.data.response);
        console.log(res);
      })
      .catch((err) => {});
  };
  const handleDuePayment = (id) => {
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
        console.log(res);
      })
      .catch((err) => {});
  };
  const handleExtendDue = (id, months) => {
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
            console.log(res);
          })
          .catch((err) => {
            toast.error(err);
          });
      });
  };
  const handleDoneExtendDue = (id) => {
    http
      .put(`booking/bookings/${id}/done`)
      .then((res) => {
        toast.success(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="px-5 pt-5 w-full">
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
