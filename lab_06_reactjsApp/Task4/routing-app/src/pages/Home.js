import './Pages.css';

function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1 className="hero-title">Welcome to ShopSite</h1>
        <p className="hero-sub">Your one-stop destination for quality products.</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Free Delivery</h3>
          <p>On all orders above $50. Fast and reliable shipping to your door.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payments</h3>
          <p>Your payment information is always safe with us.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>Not satisfied? Return within 30 days, no questions asked.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;