import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
}

const PortfolioSection: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: '프로젝트 1',
      description: '반응형 웹사이트 퍼블리싱 프로젝트입니다.'
    },
    {
      id: 2,
      title: '프로젝트 2',
      description: '모바일 최적화 웹 퍼블리싱 프로젝트입니다.'
    },
    {
      id: 3,
      title: '프로젝트 3',
      description: '크로스 브라우저 호환 퍼블리싱 프로젝트입니다.'
    }
  ];

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="section-title">포트폴리오</h2>
        <div className="grid grid-3">
          {projects.map((project: Project) => (
            <div key={project.id} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;