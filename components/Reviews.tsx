
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '../constants';

const Reviews: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section id="reviews" className="py-24 bg-[#F5F0E8]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-rounded font-bold text-[#4A3728] text-center mb-16">Отзывы наших клиенток</h2>
        
        <div className="max-w-4xl mx-auto relative px-12">
          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md text-[#8B6F5C] hover:bg-[#8B6F5C] hover:text-white transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md text-[#8B6F5C] hover:bg-[#8B6F5C] hover:text-white transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>

          <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm relative overflow-hidden">
            <Quote className="absolute top-8 left-8 text-[#E8C4B8] w-16 h-16 opacity-30" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < REVIEWS[activeIdx].rating ? "fill-[#C49A7C] text-[#C49A7C]" : "text-gray-200"} 
                  />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-[#4A3728] text-center italic font-light leading-relaxed">
                "{REVIEWS[activeIdx].text}"
              </p>
              
              <div className="text-center pt-4">
                <p className="text-xl font-bold text-[#4A3728]">{REVIEWS[activeIdx].author}</p>
                <p className="text-[#8B6F5C] text-sm mt-1">{REVIEWS[activeIdx].date}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 space-x-3">
            {REVIEWS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-3 h-3 rounded-full transition-all ${activeIdx === i ? 'bg-[#8B6F5C] w-8' : 'bg-[#E8C4B8]'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
