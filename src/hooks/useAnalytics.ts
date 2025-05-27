import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  page: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
}

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      const event: AnalyticsEvent = {
        page: location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      };

      // Save to localStorage for demo purposes
      const analytics = JSON.parse(localStorage.getItem('beasell-analytics') || '[]');
      analytics.push(event);
      
      // Keep only last 100 events
      if (analytics.length > 100) {
        analytics.splice(0, analytics.length - 100);
      }
      
      localStorage.setItem('beasell-analytics', JSON.stringify(analytics));
    };

    trackPageView();
  }, [location]);

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    const event = {
      eventName,
      properties,
      page: location.pathname,
      timestamp: new Date().toISOString()
    };

    const events = JSON.parse(localStorage.getItem('beasell-events') || '[]');
    events.push(event);
    
    if (events.length > 50) {
      events.splice(0, events.length - 50);
    }
    
    localStorage.setItem('beasell-events', JSON.stringify(events));
  };

  return { trackEvent };
};
