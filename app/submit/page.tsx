'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addRestaurant } from '@/lib/db';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';

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

export default function SubmitPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    website: '',
    description: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!auth) {
      console.error('Auth not initialized');
      setLoading(false);
      return;
    }
    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (!currentUser) {
          if (!auth) return;
          try {
            await signInAnonymously(auth);
          } catch (error) {
            console.error('Error signing in:', error);
          }
        } else {
          setUser(currentUser);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      // Ensure user is authenticated
      let currentUser = user;
      if (!currentUser) {
        try {
          if (!auth) {
          throw new Error('Authentication not initialized');
        }
        const result = await signInAnonymously(auth);
          currentUser = result.user;
          setUser(currentUser);
        } catch (authError: any) {
          console.error('Authentication error:', authError);
          setMessage({ 
            type: 'error', 
            text: `Authentication failed: ${authError.message || 'Please enable Anonymous Authentication in Firebase Console'}` 
          });
          setSubmitting(false);
          return;
        }
      }

      // Save state before clearing form
      const submittedState = formData.state;

      await addRestaurant({
        name: formData.name.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state,
        zipCode: formData.zipCode.trim(),
        phone: formData.phone.trim() || undefined,
        website: formData.website.trim() || undefined,
        description: formData.description.trim() || undefined,
      });

      setMessage({ type: 'success', text: 'Restaurant submitted successfully!' });
      
      // Clear form
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        website: '',
        description: '',
      });

      // Redirect using saved state
      setTimeout(() => {
        router.push(`/state/${encodeURIComponent(submittedState)}`);
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting restaurant:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      setMessage({ 
        type: 'error', 
        text: `Error submitting restaurant: ${errorMessage}. Please check that Anonymous Authentication is enabled in Firebase Console.` 
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>PhoFinder</h1>
          <p>Submit a Pho Restaurant</p>
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
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Add a New Pho Restaurant
          </h2>

          {message && (
            <div className={message.type === 'success' ? 'success' : 'error'}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card">
            <div className="form-group">
              <label htmlFor="name">Restaurant Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Pho Saigon"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="e.g., 123 Main Street"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="e.g., Los Angeles"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select a state</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="e.g., 90001"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g., https://www.example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about this restaurant..."
              />
            </div>

            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Restaurant'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
            * Required fields
          </p>
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
