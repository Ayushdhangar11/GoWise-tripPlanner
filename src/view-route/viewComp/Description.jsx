import React, {  useEffect } from 'react'
import { FaShare } from "react-icons/fa";
import { Button } from '../../components/ui/button';
import { getPlaceDetails } from '../../services/findlocation.jsx';

const PHOTO = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_API_KEY;

function Description({ trip }) {

     const [PhotoUrl, setPhotoUrl] = React.useState('');

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

    if (!trip || !trip.userSelection) {
        return <div className="text-red-500">Trip details not available.</div>;
    }

    

    // return result;


    return (
        <div>
            <img src={PhotoUrl} alt="" className='h-[390px] w-full object-cover rounded-xl ' />

            <div>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='text-3xl font-bold mt-5 underline underline-offset-4 mb-4'>{trip.userSelection.place}</h2>
                    <div className='flex gap-5 w-auto'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-4xl sm:text-md md:text-md lg:text-lg'><span className='font-bold'>📅 Duration : </span>{trip.userSelection.noOfDays} Days </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-4xl sm:text-md md:text-md lg:text-lg'><span className='font-bold'>💰 Budget : </span>{trip.userSelection.budget} </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-4xl sm:text-md md:text-md lg:text-lg'><span className='font-bold'>👥 No. of Persons : </span>{trip.userSelection.noOfPersons} </h2>
                    </div>
                </div>

               
            </div>
        </div>
    )
}

export default Description