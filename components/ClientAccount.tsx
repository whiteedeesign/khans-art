
import React, { useState } from 'react';
import { 
  Calendar, CreditCard, History, MessageSquare, Settings, LogOut, 
  ChevronRight, Star, MapPin, Bell, Trash2, Camera, Plus, Clock, User
} from 'lucide-react';
import { MOCK_USER, PAST_BOOKINGS, REVIEWS, COLORS, MASTERS } from '../constants';

type Tab = 'bookings' | 'loyalty' | 'history' | 'reviews' | 'settings';

interface ClientAccountProps {
  onHomeClick: () => void;
  onBookClick: () => void;
}

const ClientAccount: React.FC<ClientAccountProps> = ({ onHomeClick, onBookClick }) => {
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const [showPastBookings, setShowPastBookings] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'bookings', label: 'Мои записи', icon: <Calendar size={20} /> },
    { id: 'loyalty', label: 'Карта лояльности', icon: <CreditCard size={20} /> },
    { id: 'history', label: 'История посещений', icon: <History size={20} /> },
    { id: 'reviews', label: 'Мои отзывы', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Настройки профиля', icon: <Settings size={20} /> },
  ];

  const upcomingBookings = [
    { 
      id: 'b1', 
      date: '25 июня, 14:00', 
      service: '2D-3D объём', 
      price: '3200₽', 
      master: 'Анна Кхан', 
      status: 'confirmed',
      masterImg: MASTERS[0].image
    }
  ];

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-3">
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-[#E8C4B8]" />
            <span className="font-bold text-[#4A3728]">{MOCK_USER.name}</span>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#8B6F5C] font-bold"
          >
            Меню
          </button>
        </div>

        {/* SIDEBAR */}
        <aside className={`${isMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-4 shrink-0`}>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#E8C4B8]/30">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4 group cursor-pointer">
                <img src={MOCK_USER.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-[#F5F0E8] object-cover" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#4A3728]">{MOCK_USER.name}</h2>
              <p className="text-sm text-[#8B6F5C]">{MOCK_USER.phone}</p>
            </div>

            <nav className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === item.id 
                    ? 'bg-[#8B6F5C] text-white shadow-lg shadow-[#8B6F5C]/20' 
                    : 'text-[#4A3728] hover:bg-[#F5F0E8] hover:text-[#8B6F5C]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button 
                onClick={onHomeClick}
                className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-[#D4A69A] hover:bg-[#F5F0E8] transition-all"
              >
                <LogOut size={20} />
                <span>Выйти</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-grow space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* TAB: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-rounded font-bold text-[#4A3728] mb-6">Предстоящие записи</h3>
                {upcomingBookings.length > 0 ? (
                  <div className="grid gap-6">
                    {upcomingBookings.map(b => (
                      <div key={b.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center space-x-6">
                          <div className="bg-[#F5F0E8] p-4 rounded-3xl text-center min-w-[100px]">
                            <p className="text-xs text-[#8B6F5C] font-bold uppercase mb-1">Июнь</p>
                            <p className="text-3xl font-rounded font-bold text-[#4A3728]">25</p>
                            <p className="text-sm font-bold text-[#8B6F5C]">14:00</p>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-[#4A3728] mb-1">{b.service}</h4>
                            <p className="text-[#8B6F5C] font-medium mb-2">{b.price}</p>
                            <div className="flex items-center space-x-2 text-sm text-[#4A3728]/60">
                              <img src={b.masterImg} className="w-6 h-6 rounded-full object-cover" />
                              <span>Мастер: {b.master}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full self-start md:self-auto">
                            <CheckCircle2 size={14} className="mr-1" /> Подтверждена
                          </div>
                          <button className="px-6 py-2 border border-[#E8C4B8] text-[#4A3728] rounded-xl font-bold hover:bg-[#F5F0E8] transition-all">Перенести</button>
                          <button className="px-6 py-2 border border-[#E8C4B8] text-red-400 rounded-xl font-bold hover:bg-red-50 transition-all">Отменить</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-[#E8C4B8]">
                    <p className="text-[#4A3728]/60 mb-6">У вас пока нет предстоящих записей</p>
                    <button onClick={onBookClick} className="bg-[#8B6F5C] text-white px-8 py-3 rounded-2xl font-bold shadow-lg">Записаться</button>
                  </div>
                )}
              </section>

              <section>
                <button 
                  onClick={() => setShowPastBookings(!showPastBookings)}
                  className="w-full flex items-center justify-between text-[#4A3728] font-bold p-4 hover:bg-[#F5F0E8] rounded-xl transition-all"
                >
                  <span>Прошедшие записи</span>
                  <ChevronRight className={`transition-transform ${showPastBookings ? 'rotate-90' : ''}`} />
                </button>
                {showPastBookings && (
                  <div className="grid gap-4 mt-6 animate-in slide-in-from-top-2">
                    {PAST_BOOKINGS.map(b => (
                      <div key={b.id} className="bg-white/60 p-6 rounded-3xl border border-[#E8C4B8]/20 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#4A3728]">{b.date}</p>
                          <p className="text-xs text-[#8B6F5C]">{b.service} • {b.master}</p>
                        </div>
                        {!b.reviewId ? (
                          <button className="text-xs font-bold text-[#8B6F5C] underline">Оставить отзыв</button>
                        ) : (
                          <div className="flex text-[#C49A7C]"><Star size={12} className="fill-[#C49A7C]" /><Star size={12} className="fill-[#C49A7C]" /><Star size={12} className="fill-[#C49A7C]" /></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {/* TAB: LOYALTY */}
          {activeTab === 'loyalty' && (
            <div className="space-y-12">
              <div className="relative group perspective-1000">
                <div className="bg-[#D4A69A] p-10 md:p-16 rounded-[3rem] text-white overflow-hidden shadow-2xl shadow-[#D4A69A]/30 relative transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Star size={300} strokeWidth={1} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                      <div>
                        <h3 className="text-3xl font-rounded font-bold mb-1">Khan's Art Loyalty</h3>
                        <p className="text-white/60 text-sm">Карта лояльности</p>
                      </div>
                      <div className="text-4xl font-rounded">K'A</div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <p className="text-2xl font-rounded font-bold tracking-widest">{MOCK_USER.name}</p>
                        <p className="text-sm text-white/60">ID: 4892 0293 8472</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30">
                <h3 className="text-2xl font-bold text-[#4A3728] text-center mb-10">Ваш прогресс</h3>
                <div className="flex justify-center items-center space-x-4 md:space-x-8 mb-10">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex flex-col items-center space-y-3">
                      <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 transition-all ${
                        i <= MOCK_USER.loyaltyStamps 
                        ? 'bg-[#8B6F5C] border-[#8B6F5C] text-white shadow-lg' 
                        : 'bg-white border-[#E8C4B8] text-[#E8C4B8]'
                      }`}>
                        {i <= MOCK_USER.loyaltyStamps ? <CheckCircle2 size={32} /> : <div className="w-4 h-4 rounded-full bg-[#E8C4B8]/30" />}
                      </div>
                      <span className="text-xs font-bold text-[#8B6F5C]">{i}-й визит</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-xl text-[#4A3728]">Осталось <span className="font-bold text-[#8B6F5C]">{5 - MOCK_USER.loyaltyStamps} визита</span> до бесплатной процедуры!</p>
                </div>
              </section>

              <section>
                <h4 className="text-xl font-bold text-[#4A3728] mb-6">Ваши награды</h4>
                <div className="bg-[#F5F0E8] p-8 rounded-[2.5rem] border-2 border-dashed border-[#D4A69A] text-center">
                  <p className="text-[#8B6F5C] font-bold">Наград пока нет</p>
                  <p className="text-sm text-[#4A3728]/60">Продолжайте посещать нашу студию, чтобы получить подарки!</p>
                </div>
              </section>
            </div>
          )}

          {/* TAB: HISTORY */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-[#E8C4B8]/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F5F0E8] text-[#8B6F5C] uppercase text-xs font-bold">
                    <tr>
                      <th className="px-8 py-5">Дата</th>
                      <th className="px-8 py-5">Услуга</th>
                      <th className="px-8 py-5">Мастер</th>
                      <th className="px-8 py-5">Сумма</th>
                      <th className="px-8 py-5">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8C4B8]/30">
                    {PAST_BOOKINGS.map(b => (
                      <tr key={b.id} className="hover:bg-[#F5F0E8]/30 transition-colors">
                        <td className="px-8 py-6 font-bold text-[#4A3728]">{b.date}</td>
                        <td className="px-8 py-6 text-[#4A3728]/80">{b.service}</td>
                        <td className="px-8 py-6 text-[#4A3728]/80">{b.master}</td>
                        <td className="px-8 py-6 font-bold text-[#8B6F5C]">{b.price}</td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                            b.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {b.status === 'completed' ? 'Завершено' : 'Отменено'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-rounded font-bold text-[#4A3728]">Мои отзывы</h3>
                <button className="flex items-center space-x-2 text-[#8B6F5C] font-bold hover:underline">
                  <Plus size={18} /> <span>Написать новый</span>
                </button>
              </div>
              <div className="grid gap-6">
                {REVIEWS.slice(0, 2).map(r => (
                  <div key={r.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < r.rating ? "fill-[#C49A7C] text-[#C49A7C]" : "text-gray-200"} />
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        <button className="text-[#8B6F5C] text-sm font-bold hover:underline">Изменить</button>
                        <button className="text-red-400 text-sm font-bold hover:underline">Удалить</button>
                      </div>
                    </div>
                    <p className="text-[#4A3728] italic leading-relaxed mb-4">"{r.text}"</p>
                    <p className="text-xs text-[#8B6F5C]">{r.date} • Услуга: Наращивание 2D</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 max-w-2xl mx-auto">
              <h3 className="text-2xl font-rounded font-bold text-[#4A3728] mb-10 text-center">Настройки профиля</h3>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#8B6F5C] uppercase ml-2">Имя</label>
                    <input type="text" defaultValue={MOCK_USER.name} className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#8B6F5C] uppercase ml-2">Телефон</label>
                    <input type="tel" defaultValue={MOCK_USER.phone} className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#8B6F5C] uppercase ml-2">Email</label>
                  <input type="email" defaultValue={MOCK_USER.email} className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#8B6F5C] uppercase ml-2">Дата рождения</label>
                  <input type="date" defaultValue={MOCK_USER.birthday} className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all" />
                </div>

                <div className="pt-6 border-t border-[#E8C4B8]/30">
                  <h4 className="font-bold text-[#4A3728] mb-4 flex items-center"><Bell size={18} className="mr-2" /> Уведомления</h4>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-[#4A3728] group-hover:text-[#8B6F5C] transition-colors">SMS напоминания о записи</span>
                      <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-[#8B6F5C] focus:ring-[#8B6F5C]" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-[#4A3728] group-hover:text-[#8B6F5C] transition-colors">Email рассылка с акциями</span>
                      <input type="checkbox" className="w-6 h-6 rounded-lg text-[#8B6F5C] focus:ring-[#8B6F5C]" />
                    </label>
                  </div>
                </div>

                <div className="pt-10 flex flex-col gap-4">
                  <button className="w-full bg-[#8B6F5C] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#8B6F5C]/20 hover:bg-[#4A3728] transition-all">Сохранить изменения</button>
                  <button className="w-full flex items-center justify-center space-x-2 text-red-400 py-4 hover:bg-red-50 rounded-2xl transition-all font-bold">
                    <Trash2 size={18} />
                    <span>Удалить аккаунт</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default ClientAccount;

// Fix: Made className optional and provided default value to resolve TS error on line 213
const CheckCircle2 = ({ size, className = "" }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
