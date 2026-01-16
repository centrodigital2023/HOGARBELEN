export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      const lcp = lastEntry.renderTime || lastEntry.loadTime;
      
      if (lcp && lcp > 0) {
        console.log('LCP:', lcp);
      }
    });

    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP observation not supported');
    }

    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = (entry as PerformanceEntry & { processingStart?: number }).processingStart 
          ? (entry as PerformanceEntry & { processingStart: number }).processingStart - entry.startTime 
          : 0;
        
        if (fid > 0) {
          console.log('FID:', fid);
        }
      });
    });

    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID observation not supported');
    }

    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry) => {
        if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
          clsValue += (entry as PerformanceEntry & { value?: number }).value || 0;
        }
      });
      
      if (clsValue > 0) {
        console.log('CLS:', clsValue);
      }
    });

    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS observation not supported');
    }
  }

  if ('performance' in window && performance.navigation) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (perfData) {
          console.log('Performance Metrics:', {
            DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
            TCP: perfData.connectEnd - perfData.connectStart,
            Request: perfData.responseStart - perfData.requestStart,
            Response: perfData.responseEnd - perfData.responseStart,
            DOM: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            Load: perfData.loadEventEnd - perfData.loadEventStart,
            Total: perfData.loadEventEnd - perfData.fetchStart,
          });
        }
      }, 0);
    });
  }
};

export const reportWebVitals = (metric: { name: string; value: number; id: string }) => {
  console.log(metric);
};
