import React, { useEffect, useState } from "react";
import http from "../../config/axiosConfig";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

import RoomSwiper from "./RoomSwiper";
import moment from "moment";

const ListRoomSwiper = () => {
  const [listRoom, setListRoom] = useState([]);
  useEffect(() => {
    http.get(`booking/rooms/top-7`).then((res) => {
      setListRoom(res.data);
    });
  }, []);

  return (
    <div className="movie-list">
      <Swiper spaceBetween={20} slidesPerView={3.5}>
        {listRoom.length > 0 &&
          listRoom.map((room, index) => {
            const availableDate = moment(room.availableDay).format(
              "DD-MM-YYYY"
            );
            return (
              <SwiperSlide key={index}>
                <RoomSwiper
                  key={room.id}
                  id={room.id}
                  locationId={room.locationId}
                  url={
                    room.imgUrl ||
                    " https://images.unsplash.com/photo-1670366732840-f34c7c12fd5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  }
                  availableDate={availableDate}
                  roomName={room.name}
                  capacity={room.capacity}
                  price={room.price}
                  rating={room.rating}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ListRoomSwiper;
