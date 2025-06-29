import React from 'react'
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig.jsx"; // Adjust path as needed

// Display a clean, modern trip history card
function HistoryCard({  trip, onDelete }) {
    const { tripData, id } = trip;
    const { userSelection, tripDetails, hotelOptions, itinerary } = tripData || {};

    // Get first hotel and first activity for quick summary
    const firstHotel = hotelOptions && hotelOptions.length > 0 ? hotelOptions[0] : null;
    const firstDay = itinerary && itinerary.length > 0 ? itinerary[0] : null;
    const firstActivity = firstDay && firstDay.activities && firstDay.activities.length > 0 ? firstDay.activities[0] : null;

    const [showDetails, setShowDetails] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleCardClick = () => setShowDetails((prev) => !prev);

    const handleDelete = async (e) => {
        e.stopPropagation();
        
        if (!window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
            return;
        }

        setDeleting(true);
        try {
            await deleteDoc(doc(db, "AiTrips", id));
            if (onDelete) onDelete(id);
        } catch (error) {
            console.error("Error deleting trip:", error);
            alert("Failed to delete trip. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    const formatBudget = (budget) => {
        if (!budget) return "N/A";
        return typeof budget === 'number' ? `₹${budget.toLocaleString()}` : `₹${budget}`;
    };

    return (
        <div className="group w-[400px]  bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 mb-6 overflow-hidden border border-gray-100 hover:border-blue-200">
            {/* Main Card Content */}
            <div
                className="p-6 cursor-pointer relative grid gap-30"
                onClick={handleCardClick}
            >
                <div className="flex items-start gap-6">
                    {/* Trip Image */}
                    <div className="relative flex-shrink-0">
                        <img
                            src={
                                firstActivity?.placeImageUrl ||
                                firstHotel?.imageUrl ||
                                userSelection?.photoUrl ||
                                "/placeholder.png"
                            }
                            alt="Trip destination"
                            className="w-24 h-24 object-cover rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                    </div>
                    
                    {/* Trip Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                                {userSelection?.place || tripDetails?.location || "Unknown Destination"}
                            </h2>
                            
                            {/* Expand Icon */}
                            <div className="ml-4 p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300">
                                <svg
                                    className={`w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${
                                        showDetails ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Trip Stats */}
                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium text-blue-700">
                                    {tripDetails?.duration || `${itinerary?.length || 0} Days`}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                <span className="text-sm font-medium text-green-700">
                                    {tripDetails?.groupSize || userSelection?.noOfPersons || "N/A"} People
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                <span className="text-sm font-medium text-purple-700">
                                    {formatBudget(tripDetails?.budget || userSelection?.budget)}
                                </span>
                            </div>
                        </div>
                        
                        {/* Trip Theme & Hotel */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                <span className="text-sm">
                                    <span className="font-medium">Theme:</span> {firstDay?.theme || userSelection?.tripType || "Adventure"}
                                </span>
                            </div>
                            
                            {firstHotel?.hotelName && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span className="text-sm truncate">
                                        <span className="font-medium">Stay:</span> {firstHotel.hotelName}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Delete Button */}
                <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-200 group/delete"
                    onClick={handleDelete}
                    disabled={deleting}
                    title="Delete this trip"
                >
                    {deleting ? (
                        <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <svg className="h-4 w-4 text-gray-400 group-hover/delete:text-red-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Expanded Details Section */}
            {showDetails && (
                <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                    <div className="p-6 space-y-6">
                        {/* Trip Overview */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Trip Overview</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Destination", value: userSelection?.place || tripDetails?.location || "N/A", icon: "🏝️" },
                                    { label: "Duration", value: tripDetails?.duration || `${itinerary?.length || 0} Days`, icon: "📅" },
                                    { label: "Group Size", value: `${tripDetails?.groupSize || userSelection?.noOfPersons || "N/A"} People`, icon: "👥" },
                                    { label: "Budget", value: formatBudget(tripDetails?.budget || userSelection?.budget), icon: "💰" },
                                    { label: "Trip Type", value: userSelection?.tripType || firstDay?.theme || "N/A", icon: "🎯" },
                                    { label: "Dates", value: tripDetails?.dates || "N/A", icon: "📆" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <span className="text-lg">{item.icon}</span>
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</div>
                                            <div className="text-sm font-medium text-gray-800">{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hotel Information */}
                        {hotelOptions && hotelOptions.length > 0 && (
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-green-100 rounded-xl">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Accommodation ({hotelOptions.length})
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    {hotelOptions.map((hotel, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                                {hotel.hotelName?.charAt(0) || 'H'}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800 mb-1">{hotel.hotelName}</h4>
                                                <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                                                <div className="flex items-center gap-4 text-xs">
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                                        {hotel.price}
                                                    </span>
                                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                                                        {hotel.rating}⭐
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Daily Itinerary */}
                        {itinerary && itinerary.length > 0 && (
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-xl">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Daily Itinerary ({itinerary.length} days)
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {itinerary.map((day, dayIdx) => (
                                        <div key={dayIdx} className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {dayIdx + 1}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800">Day {dayIdx + 1}</div>
                                                    {day.theme && <div className="text-sm text-gray-600">{day.theme}</div>}
                                                </div>
                                            </div>
                                            {day.activities && day.activities.length > 0 && (
                                                <div className="space-y-2 ml-11">
                                                    {day.activities.map((activity, actIdx) => (
                                                        <div key={actIdx} className="bg-white rounded-lg p-3 shadow-sm">
                                                            <div className="font-medium text-gray-800 mb-1">{activity.activityName}</div>
                                                            {activity.details && (
                                                                <div className="text-sm text-gray-600 mb-2">{activity.details}</div>
                                                            )}
                                                            <div className="flex flex-wrap gap-2">
                                                                {activity.time && (
                                                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                                                        ⏰ {activity.time}
                                                                    </span>
                                                                )}
                                                                {activity.ticketPricing && (
                                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                                        💰 {activity.ticketPricing}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HistoryCard;