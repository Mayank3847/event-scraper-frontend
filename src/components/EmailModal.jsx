import React, { useState } from 'react';
import { captureEmail } from '../services/api';

function EmailModal({ event, onClose }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    if (!consent) {
      setError('Please consent to receive updates');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await captureEmail({
        email,
        consent,
        eventId: event._id
      });
      
      // Redirect to original event URL
      window.open(response.data.redirectUrl, '_blank');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Get Tickets</h2>
        <p className="text-gray-600 mb-6">
          Enter your email to continue to {event.title}
        </p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 mr-2"
                required
              />
              <span className="text-sm text-gray-600">
                I agree to receive event updates and marketing emails
              </span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Continue to Event'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailModal;