'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getRestaurantsByState } from '@/lib/db';
import { Restaurant } from '@/types';

interface StatePageClientProps {
  stateName: string;
}

// Helper function to extract area code from phone number
const extractAreaCode = (phone: string | undefined): string | null => {
  if (!phone) return null;
  // Match area code patterns: (XXX), XXX, or first 3 digits
  const match = phone.match(/(\d{3})/);
  return match ? match[1] : null;
};

export default function StatePageClient({ stateName }: StatePageClientProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedAreaCode, setSelectedAreaCode] = useState<string | null>(null);

  useEffect(() => {
    loadRestaurants();
  }, [stateName]);

  const loadRestaurants = async () => {
    try {
      const data = await getRestaurantsByState(stateName);
      setRestaurants(data);
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group restaurants by city with counts
  const citiesWithCounts = useMemo(() => {
    const cityMap = new Map<string, number>();
    restaurants.forEach(r => {
      const count = cityMap.get(r.city) || 0;
      cityMap.set(r.city, count + 1);
    });
    return Array.from(cityMap.entries())
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => a.city.localeCompare(b.city));
  }, [restaurants]);

  // Group restaurants by area code with counts
  const areaCodesWithCounts = useMemo(() => {
    const areaCodeMap = new Map<string, number>();
    restaurants.forEach(r => {
      const areaCode = extractAreaCode(r.phone);
      if (areaCode) {
        const count = areaCodeMap.get(areaCode) || 0;
        areaCodeMap.set(areaCode, count + 1);
      }
    });
    return Array.from(areaCodeMap.entries())
      .map(([areaCode, count]) => ({ areaCode, count }))
      .sort((a, b) => parseInt(a.areaCode) - parseInt(b.areaCode));
  }, [restaurants]);

  // Filter restaurants based on selection
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;
    
    if (selectedCity) {
      filtered = filtered.filter(r => r.city === selectedCity);
    }
    
    if (selectedAreaCode) {
      filtered = filtered.filter(r => extractAreaCode(r.phone) === selectedAreaCode);
    }
    
    return filtered;
  }, [restaurants, selectedCity, selectedAreaCode]);

  const handleCityClick = (city: string) => {
    setSelectedCity(city === selectedCity ? null : city);
    setSelectedAreaCode(null);
  };

  const handleAreaCodeClick = (areaCode: string) => {
    setSelectedAreaCode(areaCode === selectedAreaCode ? null : areaCode);
    setSelectedCity(null);
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>PhoFinder</h1>
          <p>Pho restaurants in {stateName}</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/submit">Submit Restaurant</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <Link href="/" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
            ← Back to States
          </Link>

          <h1 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#8B4513' }}>
            Pho Restaurants in {stateName}
          </h1>

          {loading ? (
            <div className="loading">Loading restaurants...</div>
          ) : (
            <>
              {/* Browse by City Section */}
              {citiesWithCounts.length > 0 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#8B4513' }}>
                    Browse by City
                  </h2>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '0.5rem',
                    lineHeight: '1.8'
                  }}>
                    {citiesWithCounts.map(({ city, count }) => (
                      <Link
                        key={city}
                        href={`#city-${city}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCityClick(city);
                        }}
                        style={{
                          color: selectedCity === city ? '#8B4513' : '#333',
                          fontWeight: selectedCity === city ? 'bold' : 'normal',
                          textDecoration: 'none',
                          padding: '0.25rem 0',
                          display: 'block',
                        }}
                      >
                        {city} ({count})
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse by Area Code Section */}
              {areaCodesWithCounts.length > 0 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#8B4513' }}>
                    Browse by Area Code
                  </h2>
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    lineHeight: '1.8'
                  }}>
                    {areaCodesWithCounts.map(({ areaCode, count }) => (
                      <Link
                        key={areaCode}
                        href={`#area-${areaCode}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAreaCodeClick(areaCode);
                        }}
                        style={{
                          color: selectedAreaCode === areaCode ? '#8B4513' : '#333',
                          fontWeight: selectedAreaCode === areaCode ? 'bold' : 'normal',
                          textDecoration: 'none',
                          padding: '0.25rem 0',
                          display: 'block',
                        }}
                      >
                        {areaCode} ({count})
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Filter Display */}
              {(selectedCity || selectedAreaCode) && (
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontWeight: 600, marginRight: '1rem' }}>Filtered by:</span>
                  {selectedCity && (
                    <button
                      onClick={() => setSelectedCity(null)}
                      style={{
                        marginRight: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#8B4513',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      {selectedCity} ×
                    </button>
                  )}
                  {selectedAreaCode && (
                    <button
                      onClick={() => setSelectedAreaCode(null)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#8B4513',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Area {selectedAreaCode} ×
                    </button>
                  )}
                </div>
              )}

              {/* Restaurant List */}
              {filteredRestaurants.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                    No restaurants found{selectedCity ? ` in ${selectedCity}` : ''}{selectedAreaCode ? ` with area code ${selectedAreaCode}` : ''}.
                  </p>
                  <Link href="/submit" className="btn">
                    Submit a Restaurant
                  </Link>
                </div>
              ) : (
                <>
                  <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#8B4513' }}>
                    {selectedCity ? `${selectedCity} Restaurants` : selectedAreaCode ? `Area Code ${selectedAreaCode} Restaurants` : 'All Restaurants'} ({filteredRestaurants.length})
                  </h2>
                  <div className="restaurant-list">
                    {filteredRestaurants.map(restaurant => (
                      <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                        <div className="restaurant-item">
                          <h3>{restaurant.name}</h3>
                          <p>{restaurant.address}</p>
                          <p>{restaurant.city}, {restaurant.state} {restaurant.zipCode}</p>
                          {restaurant.phone && <p>Phone: {restaurant.phone}</p>}
                          {restaurant.averageRating && restaurant.averageRating > 0 && (
                            <div style={{ marginTop: '0.5rem' }}>
                              <span style={{ fontWeight: 600 }}>Rating: </span>
                              <span style={{ color: '#ffc107' }}>
                                {'★'.repeat(Math.round(restaurant.averageRating))}
                                {'☆'.repeat(5 - Math.round(restaurant.averageRating))}
                              </span>
                              <span style={{ marginLeft: '0.5rem', color: '#666' }}>
                                ({restaurant.averageRating.toFixed(1)}) - {restaurant.totalReviews} reviews
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} PhoFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
