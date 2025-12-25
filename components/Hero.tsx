
import React from 'react';

interface HeroProps {
  onBookClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[#E8C4B8]/50 via-[#F5F0E8] to-[#F5F0E8] -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4A69A]/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left space-y-8 z-10">
          <h1 className="text-5xl lg:text-7xl font-rounded font-bold leading-tight text-[#4A3728]">
            Взгляд, который <br /> 
            <span className="text-[#8B6F5C]">покоряет</span>
          </h1>
          <p className="text-xl lg:text-2xl text-[#4A3728]/80 font-light max-w-lg mx-auto md:mx-0">
            Студия наращивания ресниц в Москве. Создаем шедевры, подчеркивая вашу природную красоту.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start pt-4">
            <button 
              onClick={onBookClick}
              className="bg-[#8B6F5C] text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-[#8B6F5C]/30 hover:bg-[#4A3728] hover:-translate-y-1 transition-all active:scale-95"
            >
              Записаться онлайн
            </button>
            <button className="border-2 border-[#8B6F5C] text-[#8B6F5C] px-10 py-5 rounded-2xl text-xl font-bold hover:bg-[#8B6F5C] hover:text-white transition-all active:scale-95">
              Наши работы
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
            <img 
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Beautiful Lashes" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3728]/40 to-transparent pointer-events-none" />
            
            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#E8C4B8] flex items-center justify-center text-[#4A3728]">
                  ✨
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4A3728]">Премиум материалы</p>
                  <p className="text-xs text-[#8B6F5C]">Гипоаллергенно & безопасно</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
