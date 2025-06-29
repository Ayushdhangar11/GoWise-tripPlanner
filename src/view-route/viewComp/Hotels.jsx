import { Hotel } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";


import HotelCardItem from "./HotelCardItem.jsx";



function Hotels({ trip }) {
    // Guard: check if tripData and hostelOptions exist and are arrays
    //   if (!trip || !trip.tripData || !Array.isArray(trip.tripData.hostelOptions)) {
    //     return <div className="text-red-500">No hotel recommendations available.</div>;
    //   }





    return (
        <div>
            <h2 className="text-2xl font-bold mt-5 underline underline-offset-4 mb-4">
                Hotel Recommendations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <HotelCardItem
                        key={index}
                        hotel={hotel}
                    />
                ))}
            </div>
        </div>
    );
}

export default Hotels;
