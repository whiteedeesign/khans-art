
import React from 'react';
import { SERVICES, COLORS } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white rounded-[4rem] mx-4 md:mx-10 my-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-rounded font-bold text-[#4A3728]">Наши услуги</h2>
            <p className="text-xl text-[#8B6F5C] max-w-md">Выбирайте свой идеальный образ — от естественного взгляда до голливудского объема.</p>
          </div>
          <button className="text-[#8B6F5C] font-bold border-b-2 border-[#8B6F5C] hover:text-[#4A3728] hover:border-[#4A3728] transition-all">
            Все услуги
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`p-8 rounded-3xl border border-[#E8C4B8] flex items-center justify-between group cursor-pointer transition-all hover:bg-[#F5F0E8] ${
                index % 2 === 1 ? 'md:translate-y-6' : ''
              }`}
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#4A3728] group-hover:text-[#8B6F5C] transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-[#4A3728]/60">Длительность: 1.5 - 2.5 ч.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-rounded font-bold text-[#8B6F5C]">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
