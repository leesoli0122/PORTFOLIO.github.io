// 프로젝트 타입 정의
export interface Project {
    id: number;
    title: string;
    description: string;
    image?: string;
    link?: string;
    technologies?: string[];
  }
  
  // 소셜 링크 타입 정의
  export interface SocialLink {
    icon: string;
    label: string;
    href: string;
  }
  
  // 네비게이션 메뉴 아이템 타입 정의
  export interface NavItem {
    id: string;
    label: string;
    href: string;
  }
  
  // 스킬 타입 정의
  export interface Skill {
    name: string;
    level: number;
    category: 'frontend' | 'backend' | 'tool' | 'other';
  }
  
  // 경험 타입 정의
  export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
    skills: string[];
  }
  
  // 연락처 정보 타입 정의
  export interface ContactInfo {
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
  }