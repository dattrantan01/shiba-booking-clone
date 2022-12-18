import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../config/axiosConfig";
import RentRoomForm from "../components/rent/RentRoomForm";
import Loading from "../components/loading/Loading";
import ModalLoading from "../components/loading/ModalLoading";

const RoomDetail = () => {
  const params = useParams();
  const id = params.id;
  const locationId = params.locationId;
  const [roomDetail, setRoomDetail] = useState();
  const [reviews, setReviews] = useState([]);
  const [showBooing, setShowBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    http
      .get(`booking/rooms/${id}/detail`)
      .then((res) => {
        setIsLoading(false);
        setRoomDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    http
      .get(`booking/rooms/${id}/reviews`)
      .then((res) => {
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("reviews: ", err);
      });
  }, [id, locationId]);
  const handleRentNow = () => {
    setShowBooking((prev) => !prev);
  };

  return (
    <>
      {isLoading ? (
        <ModalLoading />
      ) : (
        <div className="mt-[80px] w-full max-w-[1250px] mx-auto">
          <div className="flex flex-row gap-5 justify-between">
            <div className="w-[65%]">
              <div className="h-[400px] w-full">
                <img
                  src={roomDetail?.imgUrl}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="Reviews mt-7">
                <h2 className="text-2xl font-bold text-primary mb-8">
                  Reviews
                </h2>
                <div className="flex flex-col gap-4">
                  {reviews.map((review) => (
                    <div className="flex flex-row gap-4 items-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          alt=""
                          src={review.avatar}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="bg-slate-200 px-3 py-3 rounded-2xl">
                        <span className="font-semibold">{review.name}</span>
                        <p className="text-sm">{review.comment}</p>
                        {review.imgUrl && (
                          <div className="w-[300px] h-[300px] mt-3">
                            <img
                              src={review.imgUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-full w-[35%]">
              <div className="flex flex-col gap-3 px-5 py-5 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold">{roomDetail?.name}</h1>
                <div className="flex flex-col gap-2 mt-5">
                  <div>
                    <span className="font-semibold text-xl">Capacity: </span>
                    <span className="text-xl">{roomDetail?.capacity}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-xl">
                      Available from:{" "}
                    </span>
                    <span className="text-xl">
                      {roomDetail?.availableDay?.slice(0, 10)}
                    </span>
                  </div>

                  <div className="text-4xl mt-6">
                    {roomDetail?.price} VND<sub className="text-xs">/Month</sub>
                  </div>
                </div>
                <button
                  onClick={handleRentNow}
                  className="w-full py-3 rounded-full bg-primary text-white font-semibold"
                >
                  Rent Now
                </button>
              </div>
              {showBooing && (
                <RentRoomForm
                  locationId={locationId}
                  roomId={id}
                  roomDetail={roomDetail}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetail;
