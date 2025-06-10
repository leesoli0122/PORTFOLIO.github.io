import React from 'react';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="section hero">
      <div className="container">
        <div className="hero-content">
          <h1>안녕하세요, 저는 홍길동입니다</h1>
          <p>웹 퍼블리셔로서 사용자 중심의 웹 경험을 만듭니다</p>
          <button 
            className="btn" 
            onClick={() => scrollToSection('portfolio')}
          >
            포트폴리오 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;