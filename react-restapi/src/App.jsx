import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './lib/supabaseClient';
import Chatbot from './components/Chatbot';
import Toast from './components/Toast';
import SkillsSection from './components/SkillsSection';
import NewsletterSignup from './components/NewsletterSignup';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [portfolioFilter, setPortfolioFilter] = useState('all');

  const portfolioProjects = [
    { title: 'Python Data Analysis', description: 'Pandas + NumPy + Matplotlib', icon: '🐍', category: 'python', link: '#', github: '#' },
    { title: 'C++ Game Engine', description: 'OpenGL + Game Development', icon: '🎮', category: 'cpp', link: '#', github: '#' },
    { title: 'Java Web Application', description: 'Spring Boot + MySQL', icon: '☕', category: 'java', link: '#', github: '#' },
    { title: 'Flutter Mobile App', description: 'Cross-platform Development', icon: '📱', category: 'flutter', link: '#', github: '#' },
  ];

  const filteredProjects = portfolioFilter === 'all' ? portfolioProjects : portfolioProjects.filter(p => p.category === portfolioFilter);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            content: formData.message,
          },
        ]);

      if (error) {
        console.error('Error inserting data:', error);
        showToast('Error sending message. Please try again.', 'error');
      } else {
        showToast(`Thank you ${formData.name}! Your message has been saved.`, 'success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      showToast('An unexpected error occurred.', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
                <a className="nav-link" href="#skills">SKILLS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">ABOUT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">CONTACT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn-resume" href="/resume.pdf" download>📄 RESUME</a>
              </li>
              <li className="nav-item">
                <button className="nav-link dark-mode-toggle" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode">
                  {darkMode ? '☀️' : '🌙'}
                </button>
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
        <div className="portfolio-filters">
          <button 
            className={`filter-btn ${portfolioFilter === 'all' ? 'active' : ''}`}
            onClick={() => setPortfolioFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={`filter-btn ${portfolioFilter === 'python' ? 'active' : ''}`}
            onClick={() => setPortfolioFilter('python')}
          >
            Python
          </button>
          <button 
            className={`filter-btn ${portfolioFilter === 'cpp' ? 'active' : ''}`}
            onClick={() => setPortfolioFilter('cpp')}
          >
            C++
          </button>
          <button 
            className={`filter-btn ${portfolioFilter === 'java' ? 'active' : ''}`}
            onClick={() => setPortfolioFilter('java')}
          >
            Java
          </button>
          <button 
            className={`filter-btn ${portfolioFilter === 'flutter' ? 'active' : ''}`}
            onClick={() => setPortfolioFilter('flutter')}
          >
            Flutter
          </button>
        </div>
        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <div className="icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="portfolio-links">
                <a href={project.link} className="portfolio-link">View Demo</a>
                <a href={project.github} className="portfolio-link">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

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

      {/* Newsletter Section */}
      <NewsletterSignup />

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
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">Twitter</a>
          <a href="mailto:your.email@example.com" title="Email">Email</a>
        </div>
        <p>&copy; 2024 Vinz Szymone. All rights reserved.</p>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast}
        />
      )}

      {/* Chatbot */}
      <Chatbot />
    </>
  );
};

export default App;