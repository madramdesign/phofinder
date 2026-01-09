'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRestaurants } from '@/lib/db';
import { Restaurant, StateCity } from '@/types';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'Washington D.C.', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [stateCities, setStateCities] = useState<StateCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const allRestaurants = await getRestaurants();
      setRestaurants(allRestaurants);
      
      // Group by state and city
      const grouped: { [key: string]: Set<string> } = {};
      allRestaurants.forEach(restaurant => {
        if (!grouped[restaurant.state]) {
          grouped[restaurant.state] = new Set();
        }
        grouped[restaurant.state].add(restaurant.city);
      });

      const stateCityList: StateCity[] = US_STATES
        .filter(state => grouped[state])
        .map(state => ({
          state,
          cities: Array.from(grouped[state]).sort(),
        }))
        .sort((a, b) => a.state.localeCompare(b.state));

      setStateCities(stateCityList);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      // Ensure loading state is cleared even on error
      setStateCities([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>PhoFinder</h1>
          <p>Discover the best pho restaurants near you</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/submit">Submit Restaurant</Link></li>
            <li><Link href="/import">Bulk Import</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Browse Restaurants by State
          </h2>

          {loading ? (
            <div className="loading">Loading restaurants...</div>
          ) : stateCities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                No restaurants found yet.
              </p>
              <Link href="/submit" className="btn">
                Be the first to submit a restaurant!
              </Link>
            </div>
          ) : (
            <div className="states-grid">
              {stateCities.map(({ state, cities }) => (
                <Link key={state} href={`/state/${encodeURIComponent(state)}`}>
                  <div className="state-card">
                    <h3>{state}</h3>
                    <p style={{ color: '#666', marginTop: '0.5rem' }}>
                      {cities.length} {cities.length === 1 ? 'city' : 'cities'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} PhoFinder. All rights reserved.</p>
          <p>Find your perfect bowl of pho!</p>
        </div>
      </footer>
    </div>
  );
}
