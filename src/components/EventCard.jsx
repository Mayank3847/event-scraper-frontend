import React, { useState } from 'react';
import EmailModal from './EmailModal';

function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Event';
          }}
        />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-primary">
              {event.category}
            </span>
            <span className="text-xs text-gray-500">
              {event.sourceWebsite}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.dateTime)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.venue.name}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            GET TICKETS
          </button>
        </div>
      </div>
      
      {showModal && (
        <EmailModal 
          event={event}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default EventCard;