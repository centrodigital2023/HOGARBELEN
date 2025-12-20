import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { routes, getRouteByPath } from '../config/routes';
import { SEOHead } from '../components/SEOHead';

interface RouterWrapperProps {
  children: (setPage: (page: string) => void, currentPath: string) => React.ReactNode;
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const SEOManager = () => {
  const location = useLocation();
  
  useEffect(() => {
    const route = getRouteByPath(location.pathname);
    
    if (route) {
      // This will be handled by SEOHead in each page component
      // But we can add default fallback here if needed
    }
  }, [location]);

  return null;
};

export const RouterWrapper = ({ children }: RouterWrapperProps) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SEOManager />
      <RouterContent>{children}</RouterContent>
    </BrowserRouter>
  );
};

const RouterContent = ({ children }: { children: (setPage: (page: string) => void, currentPath: string) => React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const setPage = (page: string) => {
    // Find the route for this page key
    const route = routes.find(r => r.pageKey === page);
    if (route) {
      navigate(route.path);
    } else {
      // Fallback to home if page not found
      navigate('/');
    }
  };

  return <>{children(setPage, location.pathname)}</>;
};

// Helper hook to get current route config
export const useCurrentRoute = () => {
  const location = useLocation();
  return getRouteByPath(location.pathname);
};

// Helper hook for programmatic navigation
export const useAppNavigation = () => {
  const navigate = useNavigate();

  const navigateToPage = (pageKey: string) => {
    const route = routes.find(r => r.pageKey === pageKey);
    if (route) {
      navigate(route.path);
    } else {
      navigate('/');
    }
  };

  const navigateToPath = (path: string) => {
    navigate(path);
  };

  return { navigateToPage, navigateToPath };
};
