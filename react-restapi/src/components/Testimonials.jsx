import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'Project Manager',
      text: 'Vinz delivered a great portfolio website with excellent UI/UX and smooth functionality.',
      image: '👨',
    },
    {
      name: 'Jane Smith',
      role: 'Team Lead',
      text: 'Very talented developer with strong problem-solving skills. Highly recommended!',
      image: '👩',
    },
    {
      name: 'Mike Johnson',
      role: 'CEO Tech Startup',
      text: 'Impressed with the quality of code and commitment to project deadlines.',
      image: '👨',
    },
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">TESTIMONIALS</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-avatar">{testimonial.image}</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <h4 className="testimonial-name">{testimonial.name}</h4>
              <p className="testimonial-role">{testimonial.role}</p>
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
