import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>PhoFinder</h1>
          <p>About PhoFinder</p>
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
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card">
            <h2 style={{ marginBottom: '1rem', color: '#8B4513' }}>About PhoFinder</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              PhoFinder is a community-driven platform dedicated to helping pho enthusiasts discover 
              the best pho restaurants across the United States. Whether you're a seasoned phởnatic or 
              new to this delicious Vietnamese noodle soup, PhoFinder makes it easy to find authentic 
              pho restaurants in your area.
            </p>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#8B4513' }}>What is Pho?</h3>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              <strong>Phở</strong> (pronounced "fuh") is a traditional Vietnamese beef noodle soup. 
              It's a beloved dish that can be enjoyed for breakfast, lunch, or dinner. Made with 
              aromatic broth, rice noodles, herbs, and typically beef or chicken, pho is a comfort 
              food that has gained popularity worldwide.
            </p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#8B4513' }}>Our Mission</h3>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Our mission is to create a comprehensive directory of pho restaurants, making it easy 
              for everyone to find and share their favorite pho spots. We believe in the power of 
              community reviews and ratings to help others discover amazing pho experiences.
            </p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#8B4513' }}>How It Works</h3>
            <ul style={{ marginLeft: '2rem', lineHeight: '1.8' }}>
              <li>Browse restaurants by state and city</li>
              <li>Read reviews from fellow pho lovers</li>
              <li>Rate and review restaurants you've visited</li>
              <li>Submit new restaurants to help grow our community</li>
            </ul>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link href="/submit" className="btn" style={{ marginRight: '1rem' }}>
                Submit a Restaurant
              </Link>
              <Link href="/" className="btn btn-secondary">
                Browse Restaurants
              </Link>
            </div>
          </div>
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
