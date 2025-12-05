import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { useKV } from '@github/spark/hooks';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FamilyDashboard from './pages/FamilyDashboard';
import AICareAssistant from './pages/AICareAssistant';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'family' | 'professional';
  plan?: string;
  photoUrl?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useKV<User | null>('hogar-belen-user', null);
  
  // Ensure user is never undefined
  const currentUser = user ?? null;

  useEffect(() => {
    if (currentUser && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('dashboard');
    }
  }, [currentUser, currentPage]);

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'services':
        return <ServicesPage />;
      case 'pricing':
        return <PricingPage setPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setPage={setCurrentPage} setUser={handleSetUser} />;
      case 'register':
        return <RegisterPage setPage={setCurrentPage} setUser={handleSetUser} />;
      case 'dashboard':
        return <FamilyDashboard user={currentUser} setPage={setCurrentPage} />;
      case 'ai-assistant':
        return <AICareAssistant setPage={setCurrentPage} />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        setPage={setCurrentPage} 
        user={currentUser} 
        setUser={handleSetUser}
        currentPage={currentPage}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer setPage={setCurrentPage} />
      
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
