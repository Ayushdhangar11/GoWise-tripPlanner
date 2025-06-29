import React from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails } from "../../services/findlocation.jsx";
import { useEffect } from "react";

const PHOTO = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_API_KEY;


function HotelCardItem({index,hotel }) {

const [photoUrl, setPhotoUrl] = React.useState('');
const cardRefs = React.useRef([]);


  const GetPlacePhoto = async ()=>{
        const data = {
            textQuery: hotel.hotelName,
        }
        try {
            const res = await getPlaceDetails(data);
            console.log(res.data);
            console.log(res.data.places[0].photos[0].name);
            const  PhotoUrl  = PHOTO.replace('{NAME}', res.data.places[0].photos[0].name);
            console.log(PhotoUrl);
            setPhotoUrl(PhotoUrl);

        } catch (err) {
            console.error("Error fetching place details:", err);
            return null;
        }
    };

    useEffect(() => {
        GetPlacePhoto();
    }, [hotel]);

  

  return (
    <div>

  <div>
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + hotel.hotelName}
    >
      <div
        ref={(el) => (cardRefs.current[index] = el)}
        className="w-80 h-[420px] flex flex-col border rounded-lg shadow-md bg-white hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden"
        style={{ minWidth: "320px", maxWidth: "320px" }} // Optional: for stricter sizing
      >
        <img
          src={photoUrl}
          alt=""
          className="w-full h-48 object-cover"
        />
        <div className="flex flex-col gap-2 flex-1 p-4">
          <h2 className="text-xl font-bold">{hotel.hotelName}</h2>
          <h2 className="text-s text-gray-600 font-semibold">💰{hotel.price}</h2>
          <h2 className="text-s text-gray-600 font-semibold">⭐{hotel.rating} stars</h2>
          <h2 className="text-s text-gray-600">📍{hotel.address}</h2>
        </div>
      </div>
    </Link>
  </div>

    </div>
  );
}

export default HotelCardItem;


