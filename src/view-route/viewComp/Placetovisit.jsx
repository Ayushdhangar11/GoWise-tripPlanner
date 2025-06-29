import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const PHOTO = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_API_KEY;
import { getPlaceDetails } from '../../services/findlocation';

function Placetovisit({ trip }) {
const [selectedDay, setSelectedDay] = React.useState(null);
const [photoUrl, setPhotoUrl] = React.useState('');

const GetPlacePhoto = async ()=>{
        const data = {
            textQuery: trip.userSelection.place,
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
        if (trip && trip.userSelection) {
            GetPlacePhoto();
        }
    }, [trip]);

// Extract days from tripData.itinerary
const days = trip?.tripData?.itinerary || [];

const [photoUrls, setPhotoUrls] = React.useState({});

useEffect(() => {
    const fetchPhotos = async () => {
        if (!days.length) return;
        const urls = {};
        for (const day of days) {
            if (day.activities && Array.isArray(day.activities)) {
                for (const activity of day.activities) {
                    if (activity.placeName) {
                        try {
                            const data = { textQuery: activity.placeName };
                            const res = await getPlaceDetails(data);
                            const photoName = res?.data?.places?.[0]?.photos?.[0]?.name;
                            if (photoName) {
                                urls[activity.placeName] = PHOTO.replace('{NAME}', photoName);
                            }
                        } catch {
                            urls[activity.placeName] = "/placeholder.png";
                        }
                    }
                }
            }
        }
        setPhotoUrls(urls);
    };
    fetchPhotos();
    // eslint-disable-next-line
}, [trip]);

console.log()

return (
    <div>
        <h2 className="text-2xl font-bold mt-5 underline underline-offset-4 mb-4">
            Places to Visit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {days.map((day, idx) => (
                <div
                    key={idx}
                    className={`cursor-pointer border rounded-lg shadow-md p-4 bg-white hover:bg-blue-50 transition ${selectedDay === idx ? 'ring-2 ring-blue-400' : ''}`}
                    onClick={() => setSelectedDay(selectedDay === idx ? null : idx)}
                >
                    <h3 className="text-xl font-semibold mb-2"> {day.day} </h3>
                    <p className="text-gray-600">{day.theme}</p>
                </div>
            ))}
        </div>

        {selectedDay !== null && (
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">{days[selectedDay].day} - {days[selectedDay].theme}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {days[selectedDay].activities?.map((activity, idx) => (
                        <div key={idx} className="border rounded-lg shadow p-4 bg-white flex flex-col md:flex-row gap-4">
                            <img
                                src={photoUrls[activity.placeName] || "/placeholder.png"}
                                alt={activity.placeName}
                                className="w-full md:w-40 h-40  rounded"
                            />
                            <div className="flex-1 flex flex-col gap-2">
                                <h4 className="text-lg font-bold">{activity.placeName}</h4>
                                <div className="text-sm text-gray-600">
                                    <div>💵 <b>Pricing:</b> {activity.pricing}</div>
                                    <div>🕰️ <b>Timings:</b> {activity.timings}</div>
                                    <div>
                                        📍 <b>Location:</b>{" "}
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.placeName)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View on Map
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {days[selectedDay].budgetTip && (
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                        <b>Budget Tip:</b> {days[selectedDay].budgetTip}
                    </div>
                )}
            </div>
        )}
    </div>
);
}

export default Placetovisit