import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSwipeNavigation() {
  const navigate = useNavigate();
  
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeThreshold = 100; // minimum distance for a swipe
      const swipeDistance = touchEndX - touchStartX;
      
      if (swipeDistance > swipeThreshold) {
        // Swipe right - go back
        navigate(-1);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);
}