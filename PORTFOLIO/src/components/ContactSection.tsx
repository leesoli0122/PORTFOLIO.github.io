import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section content-section">
      <div className="container">
        <h2 className="section-title">연락처</h2>
        <div className="text-center">
          <p className="mb-2">프로젝트 문의나 협업 제안이 있으시면 언제든 연락해주세요.</p>
          <a href="mailto:contact@example.com" className="btn">이메일 보내기</a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;