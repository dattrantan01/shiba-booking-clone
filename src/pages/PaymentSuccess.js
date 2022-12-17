import React, { useEffect } from "react";
import Button from "../components/button/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import http from "../config/axiosConfig";
import { FcApproval } from "react-icons/fc";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = [];
  for (const entry of searchParams.entries()) {
    query.push(`${entry[0]}=${entry[1]}`);
  }
  useEffect(() => {
    const queryUrl = query.join("&");
    http.get(`payment/return?${queryUrl}`).then((res) => {
      console.log(res);
    });
  }, []);
  const handleBackToPage = () => {
    navigate("/booking/4");
  };
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[300px] h-[200px] shadow-lg rounded-xl flex flex-col items-center justify-center gap-3 pb-5">
        <div className="w-[50px] h-[50px]">
          <FcApproval className="w-full h-full" />
        </div>
        <h2 className="text-xl font-semibold text-green-500">
          Pay Successfully !!!
        </h2>
        <div className="mt-auto">
          <Button onClick={handleBackToPage}>Done</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
