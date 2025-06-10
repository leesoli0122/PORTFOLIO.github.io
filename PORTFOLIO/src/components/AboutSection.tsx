import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section content-section">
      <div className="container">
        <h2 className="section-title">소개</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>경험</h3>
            <p>5년 이상의 웹 퍼블리싱 경험을 바탕으로 다양한 프로젝트를 성공적으로 완료했습니다.</p>
          </div>
          <div className="card">
            <h3>기술</h3>
            <p>HTML, CSS, JavaScript, jQuery 등을 활용한 반응형 웹 퍼블리싱을 전문으로 합니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;