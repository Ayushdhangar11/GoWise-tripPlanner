import React from 'react'

function PlaceCard({ activity, idx }) {
    console.log(activity);
  return (
    <div><div key={idx} className="border rounded-lg shadow p-4 bg-white flex flex-col md:flex-row gap-4">
                            <img
                                src={activity.placeImageUrl || "/placeholder.png"}
                                alt={activity.placeName}
                                className="w-full md:w-40 h-32 object-cover rounded"
                            />
                            <div className="flex-1 flex flex-col gap-2">
                                <h4 className="text-lg font-bold">{activity.placeName}</h4>
                                <p className="text-gray-700">{activity.details}</p>
                                <div className="text-sm text-gray-600">
                                    <div>🕒 <b>Best Time:</b> {activity.bestTimeToVisit}</div>
                                    <div>⏳ <b>Duration:</b> {activity.duration}</div>
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
                        </div></div>
  )
}

export default PlaceCard