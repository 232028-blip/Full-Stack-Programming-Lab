import './Pages.css';

function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About Us</h1>
        <p>Learn more about who we are and what we stand for.</p>
      </div>

      <div className="about-content">
        <div className="about-block">
          <h2>Our Story</h2>
          <p>
            ShopSite was founded in 2020 with a simple mission: make quality products
            accessible to everyone. What started as a small online store has grown into
            a trusted platform serving thousands of customers worldwide.
          </p>
        </div>
        <div className="about-block">
          <h2>Our Mission</h2>
          <p>
            We believe shopping should be easy, safe, and enjoyable. Every product on
            our platform is carefully reviewed to meet our quality standards. We are
            committed to customer satisfaction above everything else.
          </p>
        </div>
        <div className="about-block">
          <h2>Why Choose Us</h2>
          <p>
            With over 500 products, 24/7 customer support, and a hassle-free return
            policy, ShopSite offers an unmatched shopping experience. We value trust,
            transparency, and delivering real value to our customers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;