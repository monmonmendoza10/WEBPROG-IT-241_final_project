import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const portfolioProjects = [
    { title: 'E-Commerce Platform', description: 'React + Node.js + MongoDB', icon: '🛍️' },
    { title: 'Task Management App', description: 'React + Firebase', icon: '✅' },
    { title: 'Weather Forecast', description: 'React + API Integration', icon: '🌤️' },
    { title: 'Portfolio Website', description: 'React + Bootstrap', icon: '🎨' },
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been received.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container-fluid px-4">
          <a className="navbar-brand" href="#home">Portfolio</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">PORTFOLIO</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">ABOUT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">CONTACT</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="profile-img-container">
          <img 
            src="/Mendoza.svg" 
            alt="Mendoza Logo" 
            className="profile-img"
          />
        </div>
        <h1>VINZ SZYMONE ROI V. MENDOZA</h1>
        <div className="hero-divider"></div>
        <p>Information Technology</p>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <h2 className="portfolio-title">PORTFOLIO</h2>
        <div className="portfolio-grid">
          {portfolioProjects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <div className="icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
          <h2>ABOUT ME</h2>
          <p>
            I'm an Information Technology professional passionate about creating beautiful and functional web applications. 
            With expertise in React, Node.js, and cloud technologies, I build modern solutions that solve real-world problems.
          </p>
          <p>
            My journey in tech started with a curiosity about how things work, which evolved into a career dedicated to 
            writing clean, efficient code and delivering exceptional user experiences.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <h2 className="gallery-title">PHOTO GALLERY</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="/pics/Image (2).jpg" alt="Team Photo 1" />
            <div className="gallery-overlay">
              <p>Team Gathering</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/pics/Image (3).jpg" alt="Team Photo 2" />
            <div className="gallery-overlay">
              <p>Outdoor Adventure</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/pics/Image (4).jpg" alt="Team Photo 3" />
            <div className="gallery-overlay">
              <p>Team Bonding</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/pics/Image (5).jpg" alt="Team Photo 4" />
            <div className="gallery-overlay">
              <p>Fun Moments</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/pics/Image (6).jpg" alt="Family Photo" />
            <div className="gallery-overlay">
              <p>Family Time</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src="/pics/Image (7).jpg" alt="Special Event" />
            <div className="gallery-overlay">
              <p>Special Moments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>GET IN TOUCH</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
          <textarea
            className="form-control"
            placeholder="Your Message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleFormChange}
            required
          ></textarea>
          <button type="submit" className="btn-submit">SEND MESSAGE</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Vinz Szymone. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;