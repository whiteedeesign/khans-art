
import React from 'react';
import { Gift } from 'lucide-react';

const Promotions: React.FC = () => {
  return (
    <section className="py-12 container mx-auto px-6">
      <div className="bg-[#D4A69A] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Gift size={300} strokeWidth={1} />
        </div>
        
        <div className="md:w-2/3 space-y-6 relative z-10 text-center md:text-left">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Акция месяца</span>
          <h2 className="text-4xl md:text-6xl font-rounded font-bold leading-tight">Каждая 5-я процедура <br className="hidden md:block" /> в подарок!</h2>
          <p className="text-xl text-white/80 font-light max-w-lg">
            Мы ценим наших постоянных клиентов. Копите визиты и получайте бесплатное наращивание или уход.
          </p>
          <div className="pt-4 flex justify-center md:justify-start">
            <button className="bg-[#4A3728] text-white px-10 py-5 rounded-2xl font-bold shadow-xl hover:bg-black transition-all transform active:scale-95">
              Участвовать в акции
            </button>
          </div>
        </div>

        <div className="md:w-1/3 mt-12 md:mt-0 flex justify-center relative z-10">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/30 flex flex-col items-center justify-center text-center p-6 transform rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer">
            <span className="text-5xl font-rounded font-bold">0₽</span>
            <span className="text-lg font-medium">за 5-й визит</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
