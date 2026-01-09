'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRestaurant, getReviews, addReview, addOrUpdateRating, reportClosure } from '@/lib/db';
import { Restaurant, Review, DetailedRatings } from '@/types';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';

interface RestaurantPageClientProps {
  restaurantId: string;
}

const renderStars = (rating: number) => {
  const fullStars = Math.round(rating);
  return (
    <>
      {'★'.repeat(fullStars)}
      {'☆'.repeat(5 - fullStars)}
    </>
  );
};

export default function RestaurantPageClient({ restaurantId }: RestaurantPageClientProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showClosureReport, setShowClosureReport] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [detailedRatings, setDetailedRatings] = useState<DetailedRatings>({
    overall: 5,
    broth: 5,
    noodles: 5,
    meat: 5,
    vegetables: 5,
  });
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reportingClosure, setReportingClosure] = useState(false);

  useEffect(() => {
    if (!auth) {
      console.error('Auth not initialized');
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadData();
  }, [restaurantId]);

  const loadData = async () => {
    if (!restaurantId) {
      console.error('Restaurant ID is missing');
      setRestaurant(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Load restaurant first (critical)
      const restaurantData = await getRestaurant(restaurantId);
      if (!restaurantData) {
        console.warn('Restaurant not found:', restaurantId);
        setRestaurant(null);
      } else {
        setRestaurant(restaurantData);
        
        // Load reviews separately (non-critical, can fail if index is building)
        try {
          const reviewsData = await getReviews(restaurantId);
          setReviews(reviewsData);
        } catch (reviewsError) {
          console.warn('Reviews not available yet (index may still be building):', reviewsError);
          setReviews([]); // Set empty reviews if query fails
        }
      }
    } catch (error) {
      console.error('Error loading restaurant:', error);
      setRestaurant(null); // This will show "Restaurant not found"
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      alert('Authentication not initialized. Please refresh the page.');
      return;
    }
    if (!user) {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        alert('Please sign in to submit a review');
        return;
      }
    }

    setSubmitting(true);
    try {
      const currentUser = user || (await signInAnonymously(auth)).user;
      
      await addReview({
        restaurantId,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email || 'Anonymous',
        rating: reviewRating,
        detailedRatings,
        comment: reviewComment,
      });

      await addOrUpdateRating({
        restaurantId,
        userId: currentUser.uid,
        rating: reviewRating,
      });

      setReviewComment('');
      setReviewRating(5);
      setDetailedRatings({
        overall: 5,
        broth: 5,
        noodles: 5,
        meat: 5,
        vegetables: 5,
      });
      setShowReviewForm(false);
      await loadData();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReportClosure = async () => {
    if (!auth) {
      alert('Authentication not initialized. Please refresh the page.');
      return;
    }
    if (!user) {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        alert('Please sign in to report closure');
        return;
      }
    }

    if (!confirm('Are you sure this restaurant is closed? This will be reported to the community.')) {
      return;
    }

    setReportingClosure(true);
    try {
      await reportClosure(restaurantId);
      setShowClosureReport(false);
      await loadData();
      alert('Thank you for reporting. The restaurant will be marked as closed if 3 or more people report it.');
    } catch (error) {
      console.error('Error reporting closure:', error);
      alert('Error reporting closure. Please try again.');
    } finally {
      setReportingClosure(false);
    }
  };

  const updateDetailedRating = (category: keyof DetailedRatings, rating: number) => {
    setDetailedRatings(prev => ({
      ...prev,
      [category]: rating,
    }));
    if (category === 'overall') {
      setReviewRating(rating);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="loading">Loading restaurant...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div>
        <header className="header">
          <div className="container">
            <h1>PhoFinder</h1>
            <p>Restaurant Details</p>
          </div>
        </header>
        <nav className="nav">
          <div className="container">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/submit">Submit Restaurant</Link></li>
            </ul>
          </div>
        </nav>
        <main className="main-content">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h2 style={{ marginBottom: '1rem', color: '#d32f2f' }}>Restaurant not found</h2>
              <p style={{ marginBottom: '2rem' }}>The restaurant you're looking for doesn't exist or has been removed.</p>
              <Link href="/" className="btn">Back to Home</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>PhoFinder</h1>
          <p>{restaurant.name}</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href={`/state/${encodeURIComponent(restaurant.state)}`}>Back to {restaurant.state}</Link></li>
            <li><Link href="/submit">Submit Restaurant</Link></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          {restaurant.isClosed && (
            <div className="error" style={{ marginBottom: '2rem', backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '4px' }}>
              <strong>⚠️ This restaurant has been reported as closed by the community.</strong>
            </div>
          )}

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h1 style={{ marginBottom: '0.5rem', color: '#8B4513', fontSize: '2rem' }}>{restaurant.name}</h1>
                <p style={{ marginBottom: '0.25rem', fontSize: '0.9rem', color: '#666' }}>
                  Pho Restaurants » {restaurant.state} » {restaurant.city}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  className="btn"
                  onClick={() => {
                    if (!user) {
                      // Sign in anonymously if not signed in
                      signInAnonymously(auth).then(() => {
                        setShowReviewForm(true);
                      }).catch((error) => {
                        console.error('Error signing in:', error);
                        alert('Please enable Anonymous Authentication in Firebase Console');
                      });
                    } else {
                      setShowReviewForm(!showReviewForm);
                    }
                  }}
                  style={{ fontSize: '0.9rem' }}
                >
                  {showReviewForm ? 'Cancel Review' : 'Write Review'}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowClosureReport(!showClosureReport)}
                  style={{ fontSize: '0.9rem' }}
                >
                  {showClosureReport ? 'Cancel Report' : 'Report Closure'}
                </button>
              </div>
            </div>

            <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> {restaurant.address}</p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Location:</strong> {restaurant.city}, {restaurant.state} {restaurant.zipCode}
            </p>
            {restaurant.phone && (
              <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> {restaurant.phone}</p>
            )}
            {restaurant.website && (
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Website:</strong>{' '}
                <a href={restaurant.website} target="_blank" rel="noopener noreferrer" style={{ color: '#8B4513' }}>
                  {restaurant.website}
                </a>
              </p>
            )}
            {restaurant.description && (
              <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{restaurant.description}</p>
            )}

            {/* Detailed Ratings Table */}
            {restaurant.averageDetailedRatings && (
              <div style={{ marginTop: '2rem' }}>
                <h2 style={{ marginBottom: '1rem', color: '#8B4513' }}>Ratings</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Category</th>
                      <th style={{ textAlign: 'center', padding: '0.75rem', fontWeight: 600 }}>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}><strong>Overall</strong> (based on {restaurant.totalReviews || 0} {restaurant.totalReviews === 1 ? 'rating' : 'ratings'})</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: '#ffc107', fontSize: '1.2rem' }}>
                        {renderStars(restaurant.averageDetailedRatings.overall)} ({restaurant.averageDetailedRatings.overall.toFixed(1)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}><strong>Broth</strong> (flavor, fragrance, clarity)</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: '#ffc107', fontSize: '1.2rem' }}>
                        {renderStars(restaurant.averageDetailedRatings.broth)} ({restaurant.averageDetailedRatings.broth.toFixed(1)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}><strong>Noodles</strong> (texture, clumpiness)</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: '#ffc107', fontSize: '1.2rem' }}>
                        {renderStars(restaurant.averageDetailedRatings.noodles)} ({restaurant.averageDetailedRatings.noodles.toFixed(1)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}><strong>Meat</strong> (tenderness, quality)</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: '#ffc107', fontSize: '1.2rem' }}>
                        {renderStars(restaurant.averageDetailedRatings.meat)} ({restaurant.averageDetailedRatings.meat.toFixed(1)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.75rem' }}><strong>Vegetables</strong> (variety, freshness)</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', color: '#ffc107', fontSize: '1.2rem' }}>
                        {renderStars(restaurant.averageDetailedRatings.vegetables)} ({restaurant.averageDetailedRatings.vegetables.toFixed(1)})
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Closure Report Form */}
            {showClosureReport && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', border: '2px solid #ddd', borderRadius: '4px', backgroundColor: '#fff3cd' }}>
                <h3 style={{ marginBottom: '1rem', color: '#8B4513' }}>Report Restaurant Closure</h3>
                <p style={{ marginBottom: '1rem', color: '#666' }}>
                  If this restaurant has closed, please report it. After 3 reports, it will be marked as closed.
                  {restaurant.closureReports && restaurant.closureReports > 0 && (
                    <span style={{ display: 'block', marginTop: '0.5rem', fontWeight: 600 }}>
                      Current reports: {restaurant.closureReports}/3
                    </span>
                  )}
                </p>
                <button
                  className="btn"
                  onClick={handleReportClosure}
                  disabled={reportingClosure}
                >
                  {reportingClosure ? 'Reporting...' : 'Report Closure'}
                </button>
              </div>
            )}
          </div>

          {/* Review Form Section - Always show before reviews */}
          <div className="card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#8B4513' }}>Write a Review</h2>
              <button
                className="btn"
                onClick={() => {
                  if (!user) {
                    signInAnonymously(auth).then(() => {
                      setShowReviewForm(true);
                    }).catch((error) => {
                      console.error('Error signing in:', error);
                      alert('Please enable Anonymous Authentication in Firebase Console');
                    });
                  } else {
                    setShowReviewForm(!showReviewForm);
                  }
                }}
              >
                {showReviewForm ? 'Cancel' : 'Write Review'}
              </button>
            </div>

            {showReviewForm && (
              <div style={{ padding: '1.5rem', border: '2px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                  Please do not include any URLs or links. These will be automatically deleted.
                </p>
                
                <form onSubmit={handleSubmitReview}>
                  <h3 style={{ marginBottom: '1rem', color: '#8B4513', fontSize: '1.2rem' }}>
                    Rate this Restaurant
                  </h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    (1 = bad, 2 = poor, 3 = average, 4 = good, 5 = excellent)
                  </p>
                  
                  <table style={{ width: '100%', marginBottom: '1.5rem', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f5f5f5' }}>
                        <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Category</th>
                        <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>1</th>
                        <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>2</th>
                        <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>3</th>
                        <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>4</th>
                        <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>5</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.75rem' }}><strong>Overall Satisfaction</strong></td>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <td key={rating} style={{ textAlign: 'center', padding: '0.5rem' }}>
                            <input
                              type="radio"
                              name="overall"
                              value={rating}
                              checked={detailedRatings.overall === rating}
                              onChange={() => {
                                updateDetailedRating('overall', rating);
                                setReviewRating(rating);
                              }}
                              required
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.75rem' }}><strong>Broth</strong> (flavor, fragrance, clarity)</td>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <td key={rating} style={{ textAlign: 'center', padding: '0.5rem' }}>
                            <input
                              type="radio"
                              name="broth"
                              value={rating}
                              checked={detailedRatings.broth === rating}
                              onChange={() => updateDetailedRating('broth', rating)}
                              required
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.75rem' }}><strong>Noodles</strong> (texture, clumpiness)</td>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <td key={rating} style={{ textAlign: 'center', padding: '0.5rem' }}>
                            <input
                              type="radio"
                              name="noodles"
                              value={rating}
                              checked={detailedRatings.noodles === rating}
                              onChange={() => updateDetailedRating('noodles', rating)}
                              required
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.75rem' }}><strong>Meat</strong> (tenderness, quality)</td>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <td key={rating} style={{ textAlign: 'center', padding: '0.5rem' }}>
                            <input
                              type="radio"
                              name="meat"
                              value={rating}
                              checked={detailedRatings.meat === rating}
                              onChange={() => updateDetailedRating('meat', rating)}
                              required
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.75rem' }}><strong>Vegetables</strong> (variety, freshness)</td>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <td key={rating} style={{ textAlign: 'center', padding: '0.5rem' }}>
                            <input
                              type="radio"
                              name="vegetables"
                              value={rating}
                              checked={detailedRatings.vegetables === rating}
                              onChange={() => updateDetailedRating('vegetables', rating)}
                              required
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  <div className="form-group">
                    <label htmlFor="comment">
                      <strong>Write a Review</strong>
                    </label>
                    <textarea
                      id="comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      placeholder="Share your experience... (Please do not include URLs or links)"
                      rows={6}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit', fontSize: '1rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reviewerName">
                      <strong>Optional: Enter your name</strong>
                      <span style={{ fontSize: '0.85rem', color: '#666', marginLeft: '0.5rem' }}>
                        (use @ + your Twitter account to receive a thank-you tweet)
                      </span>
                    </label>
                    <input
                      type="text"
                      id="reviewerName"
                      placeholder="Your name or Twitter handle"
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
                    />
                  </div>

                  <button type="submit" className="btn" disabled={submitting} style={{ marginTop: '1rem' }}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            )}

            {!showReviewForm && (
              <p style={{ color: '#666', textAlign: 'center', padding: '1rem', fontStyle: 'italic' }}>
                Click "Write Review" above to share your experience
              </p>
            )}
          </div>

          {/* User Reviews Section */}
          <div className="card" style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: '#8B4513' }}>User Reviews</h2>

            {reviews.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                No reviews yet. Be the first to review!
              </p>
            ) : (
              <div>
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="review-author"><strong>{review.userName}</strong></span>
                      <span className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {/* Show detailed ratings if available */}
                    {review.detailedRatings && (
                      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                        <div>Overall: <span style={{ color: '#ffc107' }}>{renderStars(review.detailedRatings.overall)}</span></div>
                        <div style={{ marginTop: '0.25rem' }}>
                          Broth: <span style={{ color: '#ffc107' }}>{renderStars(review.detailedRatings.broth)}</span> | 
                          Noodles: <span style={{ color: '#ffc107' }}>{renderStars(review.detailedRatings.noodles)}</span> | 
                          Meat: <span style={{ color: '#ffc107' }}>{renderStars(review.detailedRatings.meat)}</span> | 
                          Vegetables: <span style={{ color: '#ffc107' }}>{renderStars(review.detailedRatings.vegetables)}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Show overall rating if no detailed ratings */}
                    {!review.detailedRatings && (
                      <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#ffc107', fontSize: '1.2rem' }}>
                          {renderStars(review.rating)}
                        </span>
                      </div>
                    )}
                    
                    <p style={{ marginTop: '0.5rem', color: '#333', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
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
