import React from 'react';
import EventList from '../components/EventList';

function Home() {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Events in Sydney
          </h1>
          <p className="text-xl opacity-90">
            Find the best concerts, festivals, workshops, and more
          </p>
        </div>
      </div>

      <EventList />
    </div>
  );
}

export default Home;