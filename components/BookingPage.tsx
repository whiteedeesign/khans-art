
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon, Clock, User as UserIcon, Scissors, Star, CheckCircle2 } from 'lucide-react';
import { SERVICES, MASTERS, TIME_SLOTS, COLORS } from '../constants';
import { BookingState, Service, Master } from '../types';

interface BookingPageProps {
  onHomeClick: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onHomeClick }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingState>({
    serviceId: null,
    masterId: null,
    date: null,
    time: null,
    userData: {
      name: '',
      phone: '',
      email: '',
      comment: '',
      createAccount: false,
    },
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Categories for Step 1
  const categories = ['Наращивание', 'Ламинирование', 'Коррекция'];
  const [activeCategory, setActiveCategory] = useState<string>('Наращивание');

  // Next/Back handlers
  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Calendar setup for Step 3
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);

  const selectedService = SERVICES.find(s => s.id === bookingData.serviceId);
  const selectedMaster = bookingData.masterId === 'any' 
    ? { name: 'Любой свободный мастер', role: 'Мастер', id: 'any', image: '' }
    : MASTERS.find(m => m.id === bookingData.masterId);

  const handleSubmit = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-6 text-center animate-in fade-in zoom-in">
        <div className="max-w-2xl mx-auto bg-white rounded-[4rem] p-12 md:p-20 shadow-xl border border-[#E8C4B8]">
          <div className="w-24 h-24 bg-[#8B6F5C] rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-rounded font-bold text-[#4A3728] mb-4">Вы успешно записаны!</h2>
          <p className="text-xl text-[#8B6F5C] mb-12">Мы отправили подтверждение на ваш телефон.</p>
          
          <div className="bg-[#F5F0E8] rounded-3xl p-8 text-left space-y-4 mb-12">
            <p><span className="font-bold">Услуга:</span> {selectedService?.name}</p>
            <p><span className="font-bold">Мастер:</span> {selectedMaster?.name}</p>
            <p><span className="font-bold">Дата и время:</span> {bookingData.date}, {bookingData.time}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onHomeClick}
              className="bg-[#8B6F5C] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#4A3728] transition-all"
            >
              На главную
            </button>
            <button className="border-2 border-[#8B6F5C] text-[#8B6F5C] px-10 py-4 rounded-2xl font-bold hover:bg-[#8B6F5C] hover:text-white transition-all">
              Добавить в календарь
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 max-w-5xl">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E8C4B8] -z-10 -translate-y-1/2" />
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                s <= step ? 'bg-[#8B6F5C] text-white scale-110 shadow-lg' : 'bg-white text-[#8B6F5C] border-2 border-[#E8C4B8]'
              }`}
            >
              {s < step ? <Check size={20} /> : s}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs md:text-sm font-medium text-[#8B6F5C]">
          <span className={step === 1 ? 'font-bold' : ''}>Услуга</span>
          <span className={step === 2 ? 'font-bold' : ''}>Мастер</span>
          <span className={step === 3 ? 'font-bold' : ''}>Время</span>
          <span className={step === 4 ? 'font-bold' : ''}>Данные</span>
          <span className={step === 5 ? 'font-bold' : ''}>Подтверждение</span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-[#E8C4B8]/30">
        <div className="p-8 md:p-12">
          
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728] mb-8">Выберите услугу</h2>
              <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                      activeCategory === cat ? 'bg-[#D4A69A] text-white shadow-md' : 'bg-[#F5F0E8] text-[#8B6F5C] hover:bg-[#E8C4B8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.filter(s => s.category === activeCategory).map(service => (
                  <div 
                    key={service.id}
                    onClick={() => setBookingData({ ...bookingData, serviceId: service.id })}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group ${
                      bookingData.serviceId === service.id ? 'border-[#8B6F5C] bg-[#F5F0E8]' : 'border-transparent bg-[#F5F0E8]/50 hover:bg-[#F5F0E8]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#4A3728]">{service.name}</h3>
                      <span className="text-lg font-bold text-[#8B6F5C]">{service.price}</span>
                    </div>
                    <p className="text-sm text-[#4A3728]/60 mb-4">{service.description}</p>
                    <div className="flex items-center text-xs text-[#8B6F5C] font-bold">
                      <Clock size={14} className="mr-1" /> {service.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: MASTER */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728] mb-8">Выберите мастера</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div 
                  onClick={() => setBookingData({ ...bookingData, masterId: 'any' })}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center text-center justify-center space-y-4 ${
                    bookingData.masterId === 'any' ? 'border-[#8B6F5C] bg-[#F5F0E8]' : 'border-transparent bg-[#F5F0E8]/50 hover:bg-[#F5F0E8]'
                  }`}
                >
                  <div className="w-20 h-20 rounded-full bg-[#E8C4B8] flex items-center justify-center text-[#8B6F5C]">
                    <UserIcon size={40} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#4A3728]">Любой мастер</h3>
                    <p className="text-xs text-[#8B6F5C]">Сэкономит ваше время</p>
                  </div>
                </div>
                {MASTERS.map(master => (
                  <div 
                    key={master.id}
                    onClick={() => setBookingData({ ...bookingData, masterId: master.id })}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center text-center space-y-4 ${
                      bookingData.masterId === master.id ? 'border-[#8B6F5C] bg-[#F5F0E8]' : 'border-transparent bg-[#F5F0E8]/50 hover:bg-[#F5F0E8]'
                    }`}
                  >
                    <img src={master.image} alt={master.name} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md" />
                    <div>
                      <h3 className="font-bold text-[#4A3728]">{master.name}</h3>
                      <p className="text-xs text-[#8B6F5C]">{master.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728] mb-8">Выберите дату и время</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-bold text-[#4A3728] mb-4 flex items-center">
                    <CalendarIcon size={20} className="mr-2 text-[#8B6F5C]" /> Доступные даты
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {availableDates.map((date) => {
                      const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
                      const dayLabel = date.toLocaleDateString('ru-RU', { weekday: 'short' });
                      const isSelected = bookingData.date === dateStr;
                      return (
                        <button 
                          key={dateStr}
                          onClick={() => setBookingData({ ...bookingData, date: dateStr })}
                          className={`p-3 rounded-2xl flex flex-col items-center transition-all ${
                            isSelected ? 'bg-[#8B6F5C] text-white shadow-lg' : 'bg-[#F5F0E8] text-[#4A3728] hover:bg-[#E8C4B8]'
                          }`}
                        >
                          <span className="text-[10px] uppercase opacity-60">{dayLabel}</span>
                          <span className="text-lg font-bold leading-tight">{date.getDate()}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {bookingData.date && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <h3 className="text-lg font-bold text-[#4A3728] mb-4 flex items-center">
                      <Clock size={20} className="mr-2 text-[#8B6F5C]" /> Доступное время
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {TIME_SLOTS.map(slot => (
                        <button 
                          key={slot}
                          onClick={() => setBookingData({ ...bookingData, time: slot })}
                          className={`py-3 rounded-xl font-bold transition-all ${
                            bookingData.time === slot ? 'bg-[#D4A69A] text-white shadow-md' : 'bg-[#F5F0E8] text-[#8B6F5C] hover:bg-[#E8C4B8]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: USER DATA */}
          {step === 4 && (
            <div className="animate-in slide-in-from-right-4 duration-300 max-w-xl mx-auto">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728] mb-8 text-center">Контактные данные</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#4A3728]/60 ml-2">Как к вам обращаться?</label>
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    value={bookingData.userData.name}
                    onChange={e => setBookingData({ ...bookingData, userData: { ...bookingData.userData, name: e.target.value } })}
                    className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#4A3728]/60 ml-2">Номер телефона</label>
                  <input 
                    type="tel" 
                    placeholder="+7 (___) ___-__-__" 
                    value={bookingData.userData.phone}
                    onChange={e => setBookingData({ ...bookingData, userData: { ...bookingData.userData, phone: e.target.value } })}
                    className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#4A3728]/60 ml-2">Email (для чека)</label>
                  <input 
                    type="email" 
                    placeholder="example@mail.ru" 
                    value={bookingData.userData.email}
                    onChange={e => setBookingData({ ...bookingData, userData: { ...bookingData.userData, email: e.target.value } })}
                    className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#4A3728]/60 ml-2">Комментарий</label>
                  <textarea 
                    placeholder="Ваши пожелания..." 
                    rows={3}
                    value={bookingData.userData.comment}
                    onChange={e => setBookingData({ ...bookingData, userData: { ...bookingData.userData, comment: e.target.value } })}
                    className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col space-y-3 pt-4">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md border-2 border-[#E8C4B8] text-[#8B6F5C] focus:ring-[#8B6F5C]"
                      checked={bookingData.userData.createAccount}
                      onChange={e => setBookingData({ ...bookingData, userData: { ...bookingData.userData, createAccount: e.target.checked } })}
                    />
                    <span className="text-[#4A3728] group-hover:text-[#8B6F5C] transition-colors">Создать аккаунт для карты лояльности</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-md border-2 border-[#E8C4B8] text-[#8B6F5C]" />
                    <span className="text-[#4A3728] group-hover:text-[#8B6F5C] transition-colors">У меня уже есть аккаунт</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION */}
          {step === 5 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728] mb-8">Подтверждение записи</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-[#F5F0E8] p-8 rounded-[2.5rem] border border-[#E8C4B8]/50">
                    <h3 className="text-xl font-bold text-[#4A3728] mb-6 border-b border-[#E8C4B8] pb-4">Детали записи</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B6F5C]">
                          <Scissors size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-[#8B6F5C] uppercase font-bold tracking-wider">Услуга</p>
                          <p className="text-lg font-bold text-[#4A3728]">{selectedService?.name}</p>
                          <p className="text-sm text-[#4A3728]/60">{selectedService?.price} • {selectedService?.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B6F5C]">
                          <UserIcon size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-[#8B6F5C] uppercase font-bold tracking-wider">Мастер</p>
                          <p className="text-lg font-bold text-[#4A3728]">{selectedMaster?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B6F5C]">
                          <CalendarIcon size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-[#8B6F5C] uppercase font-bold tracking-wider">Дата и время</p>
                          <p className="text-lg font-bold text-[#4A3728]">{bookingData.date} в {bookingData.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border-2 border-[#D4A69A] shadow-lg shadow-[#D4A69A]/10">
                    <h3 className="text-xl font-bold text-[#4A3728] mb-6">Ваши данные</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-[#8B6F5C] uppercase font-bold">Имя</p>
                        <p className="font-medium">{bookingData.userData.name || 'Не указано'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8B6F5C] uppercase font-bold">Телефон</p>
                        <p className="font-medium">{bookingData.userData.phone || 'Не указан'}</p>
                      </div>
                      {bookingData.userData.email && (
                        <div>
                          <p className="text-xs text-[#8B6F5C] uppercase font-bold">Email</p>
                          <p className="font-medium">{bookingData.userData.email}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-[#4A3728]/50 text-center italic">Нажимая "Подтвердить запись", вы соглашаетесь с условиями оферты</p>
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="mt-12 flex items-center justify-between border-t border-[#E8C4B8]/30 pt-8">
            <button 
              onClick={step === 1 ? onHomeClick : prevStep}
              className="flex items-center space-x-2 text-[#8B6F5C] font-bold hover:text-[#4A3728] transition-colors"
            >
              <ChevronLeft size={20} />
              <span>{step === 1 ? 'На главную' : 'Назад'}</span>
            </button>
            
            <button 
              onClick={step === 5 ? handleSubmit : nextStep}
              disabled={
                (step === 1 && !bookingData.serviceId) ||
                (step === 2 && !bookingData.masterId) ||
                (step === 3 && (!bookingData.date || !bookingData.time)) ||
                (step === 4 && (!bookingData.userData.name || !bookingData.userData.phone))
              }
              className="flex items-center space-x-2 bg-[#8B6F5C] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-[#8B6F5C]/20 hover:bg-[#4A3728] transition-all disabled:opacity-30 disabled:cursor-not-allowed transform active:scale-95"
            >
              <span>{step === 5 ? 'Подтвердить запись' : 'Далее'}</span>
              {step < 5 && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
