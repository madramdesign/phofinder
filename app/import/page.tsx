'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { addRestaurant } from '@/lib/db';
import { Restaurant } from '@/types';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';

export default function ImportPage() {
  const [csvText, setCsvText] = useState('');
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Simple CSV parser that handles quoted fields
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    // Add last field
    result.push(current.trim());
    return result;
  };

  const parseCSV = (text: string): Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>[] => {
    const lines = text.trim().split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('CSV must have at least a header row and one data row');
    }

    // Parse header
    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''));
    
    // Required fields
    const requiredFields = ['name', 'address', 'city', 'state'];
    const missingFields = requiredFields.filter(f => !headers.includes(f));
    if (missingFields.length > 0) {
      throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
    }

    // Parse data rows
    const restaurants: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines

      const values = parseCSVLine(line).map(v => v.replace(/^"|"$/g, '').trim());
      if (values.length !== headers.length) {
        throw new Error(`Row ${i + 1} has ${values.length} columns but header has ${headers.length}`);
      }

      const restaurant: any = {};
      headers.forEach((header, index) => {
        const value = values[index] || '';
        if (header === 'name') restaurant.name = value;
        else if (header === 'address') restaurant.address = value;
        else if (header === 'city') restaurant.city = value;
        else if (header === 'state') restaurant.state = value;
        else if (header === 'zipcode' || header === 'zip') restaurant.zipCode = value;
        else if (header === 'phone') restaurant.phone = value;
        else if (header === 'website' || header === 'url') restaurant.website = value;
        else if (header === 'description') restaurant.description = value;
      });

      // Validate required fields
      if (!restaurant.name || !restaurant.address || !restaurant.city || !restaurant.state) {
        throw new Error(`Row ${i + 1} is missing required fields`);
      }

      restaurants.push(restaurant);
    }

    return restaurants;
  };

  const handleImport = async () => {
    if (!csvText.trim()) {
      alert('Please paste CSV data');
      return;
    }

    setImporting(true);
    setResults(null);
    const errors: string[] = [];
    let successCount = 0;

    try {
      const restaurants = parseCSV(csvText);
      
      // Import restaurants one by one
      for (let i = 0; i < restaurants.length; i++) {
        try {
          await addRestaurant(restaurants[i]);
          successCount++;
        } catch (error: any) {
          errors.push(`Row ${i + 2}: ${error.message || 'Failed to import'}`);
        }
      }

      setResults({ success: successCount, errors });
      if (successCount > 0) {
        setCsvText(''); // Clear on success
      }
    } catch (error: any) {
      setResults({ success: 0, errors: [error.message || 'Failed to parse CSV'] });
    } finally {
      setImporting(false);
    }
  };

  const csvExample = `name,address,city,state,zipcode,phone,website,description
Pho Saigon,123 Main St,San Francisco,California,94102,415-555-1234,https://phosaigon.com,Best pho in SF
Pho 99,456 Market St,Los Angeles,California,90001,213-555-5678,https://pho99.com,Authentic Vietnamese cuisine
Pho Express,"789 Broadway, Suite 100",New York,New York,10001,212-555-9012,https://phoexpress.com,"Great pho, friendly staff"
Pho House,321 Elm Street,Chicago,Illinois,60601,312-555-3456,,Family-owned restaurant`;

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>PhoFinder</h1>
          <p>Bulk Import Restaurants</p>
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
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <h2 style={{ marginBottom: '1rem' }}>Bulk Import Restaurants from CSV</h2>
          
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#8B4513' }}>CSV Format</h3>
            <p style={{ marginBottom: '0.5rem' }}><strong>Required columns:</strong> name, address, city, state</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Optional columns:</strong> zipcode (or zip), phone, website (or url), description</p>
            
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: '0.5rem' }}>
                View Example CSV
              </summary>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '1rem', 
                borderRadius: '4px',
                overflow: 'auto',
                marginTop: '0.5rem'
              }}>
                {csvExample}
              </pre>
            </details>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#8B4513' }}>Paste CSV Data</h3>
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={csvExample}
              rows={15}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #ddd',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}
            />
            
            <button
              onClick={handleImport}
              disabled={importing || !csvText.trim()}
              className="btn"
              style={{ marginBottom: '1rem' }}
            >
              {importing ? 'Importing...' : `Import Restaurants`}
            </button>

            {results && (
              <div style={{
                padding: '1rem',
                borderRadius: '4px',
                backgroundColor: results.success > 0 ? '#d4edda' : '#f8d7da',
                border: `2px solid ${results.success > 0 ? '#28a745' : '#dc3545'}`,
                marginTop: '1rem'
              }}>
                <h4 style={{ marginBottom: '0.5rem', color: results.success > 0 ? '#155724' : '#721c24' }}>
                  Import Results
                </h4>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  ✅ Successfully imported: {results.success} restaurant{results.success !== 1 ? 's' : ''}
                </p>
                {results.errors.length > 0 && (
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                      ❌ Errors ({results.errors.length}):
                    </p>
                    <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                      {results.errors.map((error, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="card" style={{ marginTop: '2rem', backgroundColor: '#fff3cd', border: '2px solid #ffc107' }}>
            <h3 style={{ marginBottom: '1rem', color: '#856404' }}>💡 Tips</h3>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Copy data from Excel/Google Sheets and paste here</li>
              <li>Make sure the first row contains column headers</li>
              <li>Use commas to separate columns</li>
              <li>State names should match exactly (e.g., "California" not "CA")</li>
              <li>Import in batches of 50-100 restaurants for best results</li>
            </ul>
          </div>
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
