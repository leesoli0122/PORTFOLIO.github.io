// 디바운스 함수
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T, 
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  
// 부드러운 스크롤 함수
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 스크롤 위치 확인 함수
export const getScrollPosition = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

// 뷰포트 너비 확인 함수
export const getViewportWidth = (): number => {
  return window.innerWidth || document.documentElement.clientWidth;
};

// 모바일 디바이스 확인 함수
export const isMobile = (): boolean => {
  return getViewportWidth() <= 768;
};