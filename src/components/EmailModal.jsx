import React, { useState } from 'react';
import { captureEmail } from '../services/api';
import OTPModal from './OTPModal';

function EmailModal({ isOpen, onClose, event }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !consent) {
      setError('Please enter email and accept consent');
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

      if (response.data.success) {
        // Close email modal and open OTP modal
        setShowOTPModal(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSuccess = (eventUrl) => {
    // Redirect to event URL
    window.open(eventUrl, '_blank');
    // Close all modals
    setShowOTPModal(false);
    onClose();
    // Reset form
    setEmail('');
    setConsent(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Email Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
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

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to receive event updates and marketing emails
                </span>
              </label>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !consent}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending OTP...' : 'Continue to Event'}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTPModal}
        onClose={() => {
          setShowOTPModal(false);
          onClose();
        }}
        email={email}
        eventId={event._id}
        onSuccess={handleOTPSuccess}
      />
    </>
  );
}

export default EmailModal;