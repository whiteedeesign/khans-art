
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Masters from './components/Masters';
import Promotions from './components/Promotions';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import ClientAccount from './components/ClientAccount';
import MasterAccount from './components/MasterAccount';
import AdminPanel from './components/AdminPanel';
import { LoginPage, RegisterPage, ForgotPasswordPage, AuthSuccessModal } from './components/AuthPages';

type View = 'landing' | 'booking' | 'account' | 'master' | 'admin' | 'login' | 'register' | 'forgot-password';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  useEffect(() => {
    // Add smooth scrolling behavior globally
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0, 0);
  }, [view]);

  const handleBookingClick = () => setView('booking');
  const handleHomeClick = () => setView('landing');
  const handleAccountClick = () => setView('login'); // Redirecting profile icon to login
  const handleMasterClick = () => setView('master');
  const handleAdminClick = () => setView('admin');
  
  const handleAuthSuccess = (msg: string) => {
    setAuthMessage(msg);
  };

  const closeAuthModal = () => {
    setAuthMessage(null);
    setView('login');
  };

  const isAuthPage = ['login', 'register', 'forgot-password'].includes(view);

  return (
    <div className="min-h-screen selection:bg-[#E8C4B8] selection:text-[#4A3728]">
      {view !== 'admin' && !isAuthPage && (
        <Header 
          onBookClick={handleBookingClick} 
          onHomeClick={handleHomeClick} 
          onAccountClick={handleAccountClick} 
          onMasterClick={handleMasterClick}
          onAdminClick={handleAdminClick}
        />
      )}
      <main>
        {view === 'landing' && (
          <>
            <Hero onBookClick={handleBookingClick} />
            <WhyUs />
            <Services />
            <Masters />
            <Promotions />
            <Reviews />
          </>
        )}
        {view === 'booking' && (
          <BookingPage onHomeClick={handleHomeClick} />
        )}
        {view === 'account' && (
          <ClientAccount onHomeClick={handleHomeClick} onBookClick={handleBookingClick} />
        )}
        {view === 'master' && (
          <MasterAccount onHomeClick={handleHomeClick} />
        )}
        {view === 'admin' && (
          <AdminPanel onHomeClick={handleHomeClick} />
        )}

        {/* Auth Views */}
        {view === 'login' && (
          <LoginPage 
            onRegisterClick={() => setView('register')} 
            onForgotClick={() => setView('forgot-password')}
            onSuccess={() => setView('account')}
            onHomeClick={handleHomeClick}
          />
        )}
        {view === 'register' && (
          <RegisterPage 
            onLoginClick={() => setView('login')} 
            onSuccess={handleAuthSuccess}
            onHomeClick={handleHomeClick}
          />
        )}
        {view === 'forgot-password' && (
          <ForgotPasswordPage 
            onBackClick={() => setView('login')} 
            onSuccess={handleAuthSuccess}
            onHomeClick={handleHomeClick}
          />
        )}
      </main>
      
      {view !== 'admin' && !isAuthPage && <Footer onHomeClick={handleHomeClick} />}

      {authMessage && (
        <AuthSuccessModal message={authMessage} onClose={closeAuthModal} />
      )}
    </div>
  );
};

export default App;
