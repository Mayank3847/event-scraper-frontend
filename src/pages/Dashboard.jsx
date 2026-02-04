import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEvents, getDashboardStats } from '../services/api';
import Filters from '../components/Dashboard/Filters';
import EventTable from '../components/Dashboard/EventTable';
import EventPreview from '../components/Dashboard/EventPreview';

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    city: 'Sydney',
    status: 'all',
    startDate: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

 useEffect(() => {
  if (user) {
    fetchData();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [filters, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        city: filters.city || undefined,
        search: filters.search || undefined,
        status: filters.status !== 'all' ? filters.status : undefined,
        startDate: filters.startDate || undefined
      };

      const [eventsRes, statsRes] = await Promise.all([
        getEvents(params),
        getDashboardStats()
      ]);

      setEvents(eventsRes.data.events);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Event Management Dashboard</h1>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-primary">
                {stats.totalEvents}
              </div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">
                {stats.newEvents}
              </div>
              <div className="text-sm text-gray-600">New</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">
                {stats.updatedEvents}
              </div>
              <div className="text-sm text-gray-600">Updated</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">
                {stats.importedEvents}
              </div>
              <div className="text-sm text-gray-600">Imported</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-gray-600">
                {stats.totalEmails}
              </div>
              <div className="text-sm text-gray-600">Email Captures</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <Filters filters={filters} onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <EventTable
                events={events}
                selectedEvent={selectedEvent}
                onSelectEvent={setSelectedEvent}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <EventPreview event={selectedEvent} onUpdate={fetchData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;