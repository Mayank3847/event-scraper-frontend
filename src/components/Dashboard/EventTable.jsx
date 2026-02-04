import React from 'react';

function EventTable({ events, selectedEvent, onSelectEvent }) {
  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-green-100 text-green-800',
      updated: 'bg-blue-100 text-blue-800',
      inactive: 'bg-gray-100 text-gray-800',
      imported: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map(event => (
              <tr
                key={event._id}
                onClick={() => onSelectEvent(event)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedEvent?._id === event._id ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {event.title.length > 50 
                      ? event.title.substring(0, 50) + '...' 
                      : event.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(event.dateTime)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {event.venue.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.sourceWebsite}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found</p>
        </div>
      )}
    </div>
  );
}

export default EventTable;