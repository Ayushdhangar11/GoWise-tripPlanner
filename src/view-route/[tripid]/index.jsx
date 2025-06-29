import React, { useEffect,useState } from 'react'
import { db } from '../../services/firebaseConfig.jsx';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Description from '../viewComp/Description.jsx'; // Importing the Description component to display trip details
import Hotels from '../viewComp/Hotels.jsx'; // Importing the Hotels component to display hotel details
import Placetovisit from '../viewComp/Placetovisit.jsx';
import Footer from '../viewComp/Footer.jsx';

function Viewtrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState({}); // State to hold trip details


    useEffect(() => {//used to fetch trip details when the component mounts and empty array ensures it runs only once
        fetchTripDetails();
    }, [tripId]); // tripId as a dependency to refetch if it changes tripId shows the id of the trip we want to view

    const fetchTripDetails = async () => {
       const docRef  = doc(db, 'AiTrips', tripId);
       const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setTrip(docSnap.data()); // Set the trip state with the fetched data
            } else {
                console.log("No such document!");
                toast.error("No such trip found!");
            }
       };
    

  return (
    <div>
      
      {/* Trip Description */}
      <div className='flex flex-col mt-5 p-5 md:px-20 lg:px-30 xl:px-40 2xl:px-80'>
        <Description trip={trip} /> {/* Passing the trip data to the Description component */}
      </div>

      <div className='flex flex-row mt-5 p-5 md:px-20 lg:px-30 xl:px-40 2xl:px-80'>
        <Hotels trip={trip} />
      </div>
      <div className='flex flex-row mt-5 p-5 md:px-20 lg:px-30 xl:px-40 2xl:px-80'>
        <Placetovisit trip={trip} />
      </div>
      <div className='flex flex-row align-center justify-center mt-5 mb-5 p-5 md:px-20 lg:px-30 xl:px-40 2xl:px-80'>
        <Footer />
      </div>
    </div>
  )
}

export default Viewtrip