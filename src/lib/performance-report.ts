export const measurePerformance = () => {
  if (typeof window === 'undefined') return null;

  const metrics = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    connection: (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType || 'unknown',
  };

  if (window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const calculated = {
        dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
        tcp: Math.round(navigation.connectEnd - navigation.connectStart),
        ttfb: Math.round(navigation.responseStart - navigation.requestStart),
        download: Math.round(navigation.responseEnd - navigation.responseStart),
        domInteractive: Math.round(navigation.domInteractive - navigation.fetchStart),
        domComplete: Math.round(navigation.domComplete - navigation.fetchStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.fetchStart),
      };

      return {
        ...metrics,
        navigation: calculated,
        raw: {
          transferSize: navigation.transferSize,
          encodedBodySize: navigation.encodedBodySize,
          decodedBodySize: navigation.decodedBodySize,
        },
      };
    }
  }

  return metrics;
};

export const logPerformanceReport = () => {
  const report = measurePerformance();
  
  if (report && 'navigation' in report && report.navigation) {
    console.group('📊 Performance Report');
    console.log('⏱️  DNS Lookup:', `${report.navigation.dns}ms`);
    console.log('🔌 TCP Connection:', `${report.navigation.tcp}ms`);
    console.log('⚡ Time to First Byte:', `${report.navigation.ttfb}ms`);
    console.log('⬇️  Download:', `${report.navigation.download}ms`);
    console.log('🎨 DOM Interactive:', `${report.navigation.domInteractive}ms`);
    console.log('✅ DOM Complete:', `${report.navigation.domComplete}ms`);
    console.log('🏁 Load Complete:', `${report.navigation.loadComplete}ms`);
    
    if ('raw' in report && report.raw) {
      console.log('📦 Transfer Size:', `${Math.round(report.raw.transferSize / 1024)}KB`);
      console.log('📦 Decoded Size:', `${Math.round(report.raw.decodedBodySize / 1024)}KB`);
      console.log('💾 Compression:', `${Math.round((1 - report.raw.encodedBodySize / report.raw.decodedBodySize) * 100)}%`);
    }
    
    console.groupEnd();
  }
};

export const getLighthouseScore = async (url: string) => {
  console.log('💡 Para obtener Lighthouse Score:');
  console.log('1. Abre Chrome DevTools (F12)');
  console.log('2. Ve a la pestaña "Lighthouse"');
  console.log('3. Selecciona "Performance" y "SEO"');
  console.log('4. Click en "Analyze page load"');
  console.log(`5. URL a analizar: ${url}`);
};

export const getCoreWebVitals = () => {
  const vitals = {
    lcp: 0,
    fid: 0,
    cls: 0,
  };

  if ('PerformanceObserver' in window) {
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
        vitals.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP not supported');
    }

    try {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const fid = (entry as PerformanceEntry & { processingStart?: number }).processingStart 
            ? (entry as PerformanceEntry & { processingStart: number }).processingStart - entry.startTime 
            : 0;
          vitals.fid = fid;
        });
      }).observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID not supported');
    }

    try {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
            vitals.cls += (entry as PerformanceEntry & { value?: number }).value || 0;
          }
        });
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS not supported');
    }
  }

  setTimeout(() => {
    console.group('🎯 Core Web Vitals');
    console.log('LCP:', vitals.lcp > 0 ? `${Math.round(vitals.lcp)}ms` : 'Measuring...', 
      vitals.lcp < 2500 ? '✅' : vitals.lcp < 4000 ? '⚠️' : '❌');
    console.log('FID:', vitals.fid > 0 ? `${Math.round(vitals.fid)}ms` : 'Waiting for interaction...', 
      vitals.fid < 100 ? '✅' : vitals.fid < 300 ? '⚠️' : '❌');
    console.log('CLS:', vitals.cls > 0 ? vitals.cls.toFixed(3) : 'Measuring...', 
      vitals.cls < 0.1 ? '✅' : vitals.cls < 0.25 ? '⚠️' : '❌');
    console.groupEnd();
  }, 3000);

  return vitals;
};

