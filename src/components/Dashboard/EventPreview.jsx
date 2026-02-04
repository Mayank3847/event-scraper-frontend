import React, { useState } from 'react';
import { importEvent, updateEventStatus } from '../../services/api';

function EventPreview({ event, onUpdate }) {
  const [importing, setImporting] = useState(false);
  const [notes, setNotes] = useState('');

  if (!event) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">
          Select an event to view details
        </p>
      </div>
    );
  }

  const handleImport = async () => {
    setImporting(true);
    try {
      await importEvent(event._id, notes);
      alert('Event imported successfully!');
      onUpdate();
    } catch (error) {
      alert('Error importing event');
    } finally {
      setImporting(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateEventStatus(event._id, newStatus);
      onUpdate();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Event';
          }}
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>

      <div className="space-y-4 mb-6">
        <div>
          <span className="font-semibold">Date: </span>
          <span>{formatDate(event.dateTime)}</span>
        </div>

        <div>
          <span className="font-semibold">Venue: </span>
          <span>{event.venue.name}</span>
        </div>

        <div>
          <span className="font-semibold">Address: </span>
          <span>{event.venue.address}</span>
        </div>

        <div>
          <span className="font-semibold">Category: </span>
          <span>{event.category}</span>
        </div>

        <div>
          <span className="font-semibold">Source: </span>
          <a
            href={event.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {event.sourceWebsite}
          </a>
        </div>

        <div>
          <span className="font-semibold">Description: </span>
          <p className="mt-2 text-gray-700">{event.description}</p>
        </div>
      </div>

      {event.status !== 'imported' && (
        <div className="border-t pt-6">
          <h3 className="font-bold mb-3">Import to Platform</h3>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add import notes..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            rows="3"
          />

          <button
            onClick={handleImport}
            disabled={importing}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Import Event'}
          </button>
        </div>
      )}

      <div className="border-t pt-6 mt-6">
        <h3 className="font-bold mb-3">Change Status</h3>
        <div className="grid grid-cols-2 gap-2">
          {['new', 'updated', 'inactive'].map(status => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 capitalize"
              disabled={event.status === status}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventPreview;