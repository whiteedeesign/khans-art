
import React from 'react';
import { MASTERS, COLORS } from '../constants';

const Masters: React.FC = () => {
  return (
    <section id="masters" className="py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-rounded font-bold text-[#4A3728] mb-16">Наши мастера</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {MASTERS.map((master) => (
            <div key={master.id} className="group">
              <div className="relative mb-6 overflow-hidden rounded-[3rem] aspect-[4/5] shadow-lg">
                <img 
                  src={master.image} 
                  alt={master.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B6F5C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                  <button className="bg-white text-[#4A3728] px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    К мастеру
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-rounded font-bold text-[#4A3728]">{master.name}</h3>
              <p className="text-[#8B6F5C] mt-1 font-medium">{master.role}</p>
            </div>
          ))}
        </div>

        <button className="mt-16 bg-[#F5F0E8] border-2 border-[#8B6F5C] text-[#8B6F5C] px-10 py-4 rounded-2xl font-bold hover:bg-[#8B6F5C] hover:text-white transition-all">
          Познакомиться со всеми мастерами
        </button>
      </div>
    </section>
  );
};

export default Masters;
