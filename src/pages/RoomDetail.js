import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../config/axiosConfig";
import RentRoomForm from "../components/rent/RentRoomForm";
import ModalLoading from "../components/loading/ModalLoading";
import { useAuth } from "../context/auth-context";
import ConfirmModal from "../components/modal/ConfirmModal";
import { BiRightArrow } from "react-icons/bi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import useUploadImage from "../hooks/useUploadImage";
import { AiOutlineClose } from "react-icons/ai";
import Rating from "../components/rating/Rating";
import { toast } from "react-toastify";
import moment from "moment";

const RoomDetail = () => {
  const params = useParams();
  const id = params.id;
  const locationId = params.locationId;
  const [roomDetail, setRoomDetail] = useState();
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showBooing, setShowBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [review, setReview] = useState("");
  const { user } = useAuth();

  const {
    handleUploadImage,
    handleDeleteImage,
    file,
    imgUpload,
    setFile,
    setImgUpload,
  } = useUploadImage();
  const navigate = useNavigate();
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
    if (!user.id) {
      setShowConfirmation(true);
    } else {
      setShowBooking((prev) => !prev);
    }
  };
  const handleCloseConfirm = () => {
    setShowConfirmation(false);
  };
  const handleConfirm = () => {
    navigate("/login");
  };
  const handleAddReviews = (e) => {
    e.preventDefault();
    if (!imgUpload && !review) return;
    http
      .post(`booking/rooms/${id}/reviews`, {
        comment: review,
        imgId: imgUpload,
        rating: rating,
      })
      .then((res) => {
        setReview("");
        setFile("");
        setImgUpload(null);
        setRating(0);
        http
          .get(`booking/rooms/${id}/reviews`)
          .then((res) => {
            setReviews(res.data);
          })
          .catch((err) => {
            console.log("reviews: ", err);
          });
      })
      .catch((err) => {
        console.log("reviews: ", err);
        toast.error(err.data.message);
      });
  };
  const handleRating = (index) => {
    setRating(index);
  };
  return (
    <>
      {showConfirmation && (
        <ConfirmModal
          message="You have to login first !!!"
          handleClose={handleCloseConfirm}
          handleConfirm={handleConfirm}
        />
      )}
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
                {user.id && (
                  <>
                    <Rating handleRating={handleRating} rating={rating} />
                    <form
                      onSubmit={handleAddReviews}
                      className="relative w-full mb-5"
                    >
                      <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="outline-none py-2 pl-4 pr-[80px] w-full text-sm border-b-2 border-slate-200"
                        placeholder="Write yout review..."
                      />
                      <label htmlFor="uploadImage" className="">
                        <input
                          id="uploadImage"
                          type="file"
                          className="hidden"
                          onChange={handleUploadImage}
                        />
                        <MdOutlineAddAPhoto className="absolute bottom-3 right-10 cursor-pointer" />
                      </label>
                      <button
                        type="submit"
                        className="px-3 py-2 absolute bottom-1 right-1"
                      >
                        <BiRightArrow />
                      </button>
                    </form>
                  </>
                )}
                {file && imgUpload ? (
                  <div className="image upload w-full h-[110px] relative flex items-center justify-start bg-slate-100">
                    <div
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={handleDeleteImage}
                    >
                      <AiOutlineClose />
                    </div>
                    <img
                      src={file}
                      alt=""
                      className="w-[100px] h-[100px] object-cover"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex flex-col gap-4 mt-5">
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
                        <div className="flex flex-row gap-3">
                          <span className="font-semibold">{review.name}</span>
                          <Rating readonly={true} rating={review.rating} />
                        </div>
                        <p className="text-sm">{review.comment}</p>
                        {review.imgUrl && (
                          <div className="w-[250px] h-[240px] mt-3">
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
              <div className="flex flex-col gap-3 px-5 py-5 rounded-xl shadow-lg relative">
                <div className="absolute top-5 right-2">
                  <Rating readonly={true} rating={roomDetail?.rating} />
                </div>
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
                      {moment(roomDetail?.availableDay).format("DD-MM-YYYY")}
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
