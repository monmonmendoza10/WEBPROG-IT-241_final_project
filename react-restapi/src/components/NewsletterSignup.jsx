import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section id="newsletter" className="newsletter">
      <div className="newsletter-content">
        <h2>Stay Updated</h2>
        <p>Subscribe to my newsletter for the latest projects and tech insights</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {subscribed && <p className="success-msg">✓ Thanks for subscribing!</p>}
      </div>
    </section>
  );
};

export default NewsletterSignup;
