import React, { useEffect,useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
 import { db } from '../services/firebaseConfig.jsx';
 import HistoryCard from './component/HistoryCard.jsx';
function History() {

    const navigate = useNavigation();
    const [userTripHistory, setUserTripHistory] = useState([]);

    useEffect(() => {
        const tripHistory = GetUserTripHistory();
        console.log("Trip History:", tripHistory);
      }, []);

    const GetUserTripHistory =async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/");
            return;
        }
        setUserTripHistory([]); // Reset the trip history before fetching new data
        const q=query(collection(db,'AiTrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTripHistory((prev) => [...prev, doc.data()]);
        });
    }

  return (
    <div className='flex flex-col mt-5 p-5 md:px-20 lg:px-30 xl:px-40 2xl:px-80'>
      <h2 className='text-2xl font-bold'>History</h2>
      <div className=' grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2 gap-30 mt-5'>
        {
            userTripHistory.map((trip, index) => (
                <HistoryCard key={index} trip={trip} />
            ))
        }
      </div>
    </div>
  )
}

export default History