import React from 'react';

const SkillsSection = () => {
  const skills = [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'C++', level: 80, icon: '➕' },
    { name: 'Java', level: 85, icon: '☕' },
    { name: 'Flutter', level: 75, icon: '📱' },
    { name: 'Node.js', level: 80, icon: '🚀' },
    { name: 'MySQL', level: 80, icon: '🗄️' },
    { name: 'Supabase', level: 85, icon: '🔥' },
    { name: 'Bootstrap', level: 90, icon: '🎨' },
    { name: 'API Design', level: 85, icon: '🔌' },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">MY SKILLS</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
