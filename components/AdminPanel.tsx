
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Users, Briefcase, Scissors, 
  Gift, CreditCard, MessageSquare, Image as ImageIcon, 
  ShieldAlert, Settings, LogOut, Search, Plus, Download, 
  Filter, MoreHorizontal, ChevronRight, TrendingUp, Star,
  CheckCircle2, AlertCircle, X, Bell, Phone, Mail, Instagram,
  MessageCircle, Menu, Trash2, Eye, EyeOff, Upload, MapPin,
  ChevronDown, ChevronUp, Clock
} from 'lucide-react';
import { MASTERS, SERVICES, ADMIN_CLIENTS, PAST_BOOKINGS, PROMOTIONS, REVIEWS, BLACKLIST, MASTER_PORTFOLIO } from '../constants';
import { PastBooking, MasterClient, Service, Promotion, Review, BlacklistEntry, PortfolioWork } from '../types';

type AdminTab = 
  | 'dashboard' | 'bookings' | 'clients' | 'masters' | 'services' 
  | 'promotions' | 'loyalty' | 'reviews' | 'gallery' | 'blacklist' | 'settings';

interface AdminPanelProps {
  onHomeClick: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onHomeClick }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Наращивание');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'published' | 'hidden'>('all');

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: <LayoutDashboard size={20} /> },
    { id: 'bookings', label: 'Все записи', icon: <Calendar size={20} /> },
    { id: 'clients', label: 'Клиенты', icon: <Users size={20} /> },
    { id: 'masters', label: 'Мастера', icon: <Briefcase size={20} /> },
    { id: 'services', label: 'Услуги', icon: <Scissors size={20} /> },
    { id: 'promotions', label: 'Акции и скидки', icon: <Gift size={20} /> },
    { id: 'loyalty', label: 'Карты лояльности', icon: <CreditCard size={20} /> },
    { id: 'reviews', label: 'Отзывы', icon: <MessageSquare size={20} /> },
    { id: 'gallery', label: 'Галерея', icon: <ImageIcon size={20} /> },
    { id: 'blacklist', label: 'Чёрный список', icon: <ShieldAlert size={20} /> },
    { id: 'settings', label: 'Настройки студии', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex">
      {/* SIDEBAR */}
      <aside className={`bg-[#4A3728] text-[#F5F0E8] transition-all duration-300 flex flex-col z-50 ${isSidebarOpen ? 'w-80' : 'w-20'} fixed lg:relative h-screen overflow-hidden shadow-2xl`}>
        <div className="p-8 flex items-center justify-between">
          <h1 className={`text-2xl font-rounded font-bold whitespace-nowrap overflow-hidden transition-all ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            Khan's Art
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        <nav className="flex-grow py-4 overflow-y-auto scrollbar-hide">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center px-8 py-4 space-x-4 transition-all group ${
                activeTab === item.id 
                ? 'bg-[#8B6F5C] text-white shadow-inner' 
                : 'hover:bg-white/5 text-[#F5F0E8]/60'
              }`}
            >
              <span className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'}`}>
                {item.icon}
              </span>
              <span className={`font-bold whitespace-nowrap transition-all text-sm ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/10">
          <button 
            onClick={onHomeClick}
            className={`flex items-center space-x-4 text-[#D4A69A] hover:text-white transition-colors w-full font-bold`}
          >
            <LogOut size={20} />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Выйти</span>
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className={`flex-grow overflow-y-auto h-screen p-6 md:p-10 transition-all ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'} ml-20 lg:ml-0`}>
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Дашборд</h2>
                <p className="text-[#8B6F5C] font-medium">Обзор ключевых показателей студии</p>
              </div>
              <div className="flex items-center space-x-3 text-sm font-bold bg-white p-2 rounded-2xl shadow-sm border border-[#E8C4B8]">
                <span className="px-4 py-2 bg-[#F5F0E8] rounded-xl text-[#8B6F5C]">Сегодня: 25.06.2024</span>
                <button className="p-2 hover:bg-[#F5F0E8] rounded-xl transition-colors relative">
                  <Bell size={20} className="text-[#8B6F5C]" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border-2 border-white" />
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {[
                { label: 'Записей сегодня', val: '12', up: '+2', color: 'bg-white' },
                { label: 'На неделю', val: '47', up: '+5', color: 'bg-white' },
                { label: 'Выручка за месяц', val: '324 500₽', up: '+15%', color: 'bg-[#4A3728] text-white' },
                { label: 'Новых клиентов', val: '23', up: '+4', color: 'bg-white' },
                { label: 'Средний чек', val: '2 890₽', up: '+2%', color: 'bg-white' },
                { label: 'Рейтинг студии', val: '4.8 ★', up: '156 отзывов', color: 'bg-white' },
              ].map((m, i) => (
                <div key={i} className={`${m.color} p-6 rounded-[2rem] shadow-sm border border-[#E8C4B8]/30 flex flex-col justify-between`}>
                  <p className={`text-xs font-bold uppercase tracking-wider ${m.color.includes('white') ? 'text-[#8B6F5C]' : 'text-white/60'}`}>{m.label}</p>
                  <p className="text-2xl font-rounded font-bold mt-2">{m.val}</p>
                  <p className={`text-[10px] font-bold mt-2 ${m.color.includes('white') ? 'text-green-600' : 'text-[#E8C4B8]'}`}>{m.up}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30">
                <h3 className="text-xl font-bold text-[#4A3728] mb-8">Загруженность мастеров</h3>
                <div className="space-y-6">
                  {MASTERS.map((m, idx) => (
                    <div key={m.id} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-[#4A3728]">{m.name}</span>
                        <span className="text-[#8B6F5C]">{idx === 0 ? '92%' : idx === 1 ? '78%' : '65%'}</span>
                      </div>
                      <div className="w-full bg-[#F5F0E8] h-1.5 rounded-full mt-4">
                        <div className="bg-[#8B6F5C] h-full transition-all duration-1000" style={{ width: idx === 0 ? '92%' : idx === 1 ? '78%' : '65%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 flex flex-col items-center justify-center text-center">
                 <div className="w-32 h-32 rounded-full border-[16px] border-[#8B6F5C] border-r-[#D4A69A] border-b-[#E8C4B8] relative flex items-center justify-center mb-6">
                    <TrendingUp className="text-[#8B6F5C]" size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-[#4A3728] mb-2">Популярные услуги</h3>
                 <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center space-x-2 text-xs font-bold"><div className="w-2 h-2 bg-[#8B6F5C] rounded-full" /> <span>Наращивание (65%)</span></div>
                    <div className="flex items-center space-x-2 text-xs font-bold"><div className="w-2 h-2 bg-[#D4A69A] rounded-full" /> <span>Ламинирование (25%)</span></div>
                    <div className="flex items-center space-x-2 text-xs font-bold"><div className="w-2 h-2 bg-[#E8C4B8] rounded-full" /> <span>Другое (10%)</span></div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Все записи</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-[#8B6F5C] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#4A3728] transition-all shadow-lg shadow-[#8B6F5C]/20">
                  <Plus size={20} />
                  <span>Добавить запись</span>
                </button>
                <button className="p-3 bg-white border border-[#E8C4B8] rounded-2xl text-[#8B6F5C] hover:bg-[#F5F0E8] transition-all">
                  <Download size={20} />
                </button>
              </div>
            </header>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Период</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] outline-none text-sm font-medium border-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Мастер</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] outline-none text-sm font-bold border-none text-[#4A3728]">
                    <option>Все мастера</option>
                    {MASTERS.map(m => <option key={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Услуга</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] outline-none text-sm font-bold border-none text-[#4A3728]">
                    <option>Любая услуга</option>
                    {SERVICES.map(s => <option key={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Статус</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] outline-none text-sm font-bold border-none text-[#4A3728]">
                    <option>Все статусы</option>
                    <option>Подтверждена</option>
                    <option>Ожидает</option>
                    <option>Завершена</option>
                    <option>Отменена</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F5F0E8]/50 text-[#8B6F5C] text-[10px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Дата и время</th>
                      <th className="px-6 py-4">Клиент</th>
                      <th className="px-6 py-4">Услуга</th>
                      <th className="px-6 py-4">Мастер</th>
                      <th className="px-6 py-4">Сумма</th>
                      <th className="px-6 py-4">Статус</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8C4B8]/20">
                    {[
                      { date: '25.06.2024 10:00', client: 'Елена Петрова', phone: '+7 911 222-33-44', service: '2D объём', master: 'Анна Кхан', sum: '3200₽', status: 'confirmed' },
                      { date: '25.06.2024 12:00', client: 'Ольга Смирнова', phone: '+7 922 333-44-55', service: 'Ламинирование', master: 'Марина Соколова', sum: '2000₽', status: 'pending' },
                      { date: '25.06.2024 14:00', client: 'Мария Иванова', phone: '+7 933 444-55-66', service: 'Классика', master: 'Елена Белова', sum: '2500₽', status: 'confirmed' },
                    ].map((b, idx) => (
                      <tr key={idx} className="hover:bg-[#F5F0E8]/20 transition-colors">
                        <td className="px-6 py-5 font-bold text-[#4A3728] text-sm whitespace-nowrap">{b.date}</td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-[#4A3728]">{b.client}</p>
                          <p className="text-xs text-[#8B6F5C]">{b.phone}</p>
                        </td>
                        <td className="px-6 py-5 text-sm text-[#4A3728]/70">{b.service}</td>
                        <td className="px-6 py-5 text-sm text-[#4A3728]/70">{b.master}</td>
                        <td className="px-6 py-5 font-bold text-[#4A3728] text-sm">{b.sum}</td>
                        <td className="px-6 py-5">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                            b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                            b.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                            b.status === 'completed' ? 'bg-gray-100 text-gray-500' : 'bg-red-100 text-red-600'
                          }`}>
                            {b.status === 'confirmed' ? 'Подтверждена' : 
                             b.status === 'pending' ? 'Ожидает' : 
                             b.status === 'completed' ? 'Завершена' : 'Отменена'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="p-2 text-[#8B6F5C] hover:bg-[#F5F0E8] rounded-xl transition-colors"><MoreHorizontal size={20} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">База клиентов</h2>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6F5C]" size={20} />
                  <input type="text" placeholder="Поиск по имени, телефону или email" className="w-full pl-12 pr-6 py-3 rounded-2xl bg-white border border-[#E8C4B8] outline-none shadow-sm focus:border-[#8B6F5C] transition-all text-sm" />
                </div>
                <button className="bg-[#8B6F5C] text-white p-3 rounded-2xl font-bold hover:bg-[#4A3728] transition-all shadow-lg shrink-0">
                  <Plus size={24} />
                </button>
              </div>
            </header>

            <div className="bg-white rounded-[3rem] shadow-sm overflow-hidden border border-[#E8C4B8]/30">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-[#F5F0E8] text-[#8B6F5C] text-[10px] font-bold uppercase tracking-widest">
                     <tr>
                       <th className="px-8 py-5">Клиент</th>
                       <th className="px-8 py-5">Визитов</th>
                       <th className="px-8 py-5">Потрачено</th>
                       <th className="px-8 py-5">Карта лояльности</th>
                       <th className="px-8 py-5">Последний визит</th>
                       <th className="px-8 py-5"></th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#E8C4B8]/30">
                     {ADMIN_CLIENTS.map(c => (
                       <tr key={c.id} className="hover:bg-[#F5F0E8]/30 transition-colors group cursor-pointer">
                         <td className="px-8 py-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-[#E8C4B8] flex items-center justify-center text-[#8B6F5C] font-bold">
                                {c.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-[#4A3728]">{c.name}</p>
                                <p className="text-xs text-[#8B6F5C]">{c.phone}</p>
                              </div>
                            </div>
                         </td>
                         <td className="px-8 py-6 font-bold text-[#4A3728]">{c.visits}</td>
                         <td className="px-8 py-6 font-bold text-[#8B6F5C]">{c.totalSpent}</td>
                         <td className="px-8 py-6">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < c.loyaltyStamps ? 'bg-[#8B6F5C]' : 'bg-[#E8C4B8]'}`} />
                              ))}
                            </div>
                         </td>
                         <td className="px-8 py-6 text-sm text-[#4A3728]/70">{c.lastVisit}</td>
                         <td className="px-8 py-6 text-right">
                           <button className="text-xs font-bold text-[#8B6F5C] px-4 py-2 rounded-lg bg-[#F5F0E8] hover:bg-[#8B6F5C] hover:text-white transition-all">Профиль</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* MASTERS TAB */}
        {activeTab === 'masters' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
             <header className="flex items-center justify-between">
                <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Наши мастера</h2>
                <button className="bg-[#8B6F5C] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#4A3728] transition-all shadow-lg flex items-center space-x-2">
                   <Plus size={20} />
                   <span>Добавить мастера</span>
                </button>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MASTERS.map((m, idx) => (
                  <div key={m.id} className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-[#E8C4B8]/30 group hover:shadow-2xl transition-all duration-500">
                    <div className="flex flex-col items-center text-center space-y-4 mb-8">
                      <div className="relative">
                        <img src={m.image} alt={m.name} className="w-28 h-28 rounded-full border-4 border-[#F5F0E8] object-cover transition-transform group-hover:scale-105" />
                        <div className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full ${idx === 0 || idx === 2 ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#4A3728]">{m.name}</h3>
                        <p className="text-[#8B6F5C] font-medium text-sm">{m.role}</p>
                        <div className="flex items-center justify-center mt-2 text-[#C49A7C]">
                           <Star size={14} className="fill-[#C49A7C] mr-1" />
                           <span className="text-xs font-bold">{idx === 0 ? '4.9' : idx === 1 ? '4.8' : '4.7'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-[#F5F0E8] p-5 rounded-[2rem] text-center">
                        <p className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider mb-1">Записей</p>
                        <p className="text-xl font-bold text-[#4A3728]">{idx === 0 ? '47' : idx === 1 ? '38' : '42'}</p>
                      </div>
                      <div className="bg-[#F5F0E8] p-5 rounded-[2rem] text-center">
                        <p className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider mb-1">Выручка</p>
                        <p className="text-xl font-bold text-[#4A3728]">{idx === 0 ? '152к' : idx === 1 ? '118к' : '135к'}₽</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <button className="w-full py-4 bg-[#8B6F5C] text-white rounded-2xl font-bold hover:bg-[#4A3728] transition-all shadow-md">Расписание</button>
                      <button className="w-full py-4 border border-[#E8C4B8] text-[#4A3728] rounded-2xl font-bold hover:bg-[#F5F0E8] transition-all">Редактировать</button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Услуги студии</h2>
              <div className="flex space-x-3">
                <button className="border border-[#8B6F5C] text-[#8B6F5C] px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 bg-white hover:bg-[#F5F0E8] transition-all"><Plus size={18} /> <span>Категория</span></button>
                <button className="bg-[#8B6F5C] text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:bg-[#4A3728] transition-all"><Plus size={18} /> <span>Услуга</span></button>
              </div>
            </header>

            <div className="space-y-4">
               {[
                 { 
                   name: 'НАРАЩИВАНИЕ РЕСНИЦ', 
                   services: [
                     { name: 'Классическое наращивание', price: '2 500₽', time: '2 часа' },
                     { name: '2D объём', price: '3 000₽', time: '2.5 часа' },
                     { name: '3D объём', price: '3 500₽', time: '3 часа' },
                   ] 
                 },
                 { 
                   name: 'ЛАМИНИРОВАНИЕ', 
                   services: [
                     { name: 'Ламинирование ресниц', price: '2 000₽', time: '1 час' },
                     { name: 'Ботокс ресниц', price: '2 500₽', time: '1.5 часа' },
                   ] 
                 },
                 { 
                   name: 'КОРРЕКЦИЯ', 
                   services: [
                     { name: 'Коррекция наращивания', price: '1 500₽', time: '1.5 часа' },
                     { name: 'Снятие ресниц', price: '500₽', time: '30 мин' },
                   ] 
                 }
               ].map(cat => (
                 <div key={cat.name} className="bg-white rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30 overflow-hidden">
                    <button 
                      onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                      className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#F5F0E8]/50 transition-colors"
                    >
                       <h3 className="text-lg font-bold text-[#4A3728] tracking-widest">{cat.name}</h3>
                       {expandedCategory === cat.name ? <ChevronUp className="text-[#8B6F5C]" /> : <ChevronDown className="text-[#8B6F5C]" />}
                    </button>
                    {expandedCategory === cat.name && (
                      <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                        <div className="overflow-x-auto">
                           <table className="w-full text-left">
                              <thead className="text-[#8B6F5C] text-[10px] font-bold uppercase tracking-widest">
                                 <tr>
                                    <th className="py-4">Услуга</th>
                                    <th className="py-4">Цена</th>
                                    <th className="py-4">Время</th>
                                    <th className="py-4">Статус</th>
                                    <th className="py-4 text-right">Действия</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-[#E8C4B8]/20">
                                 {cat.services.map((s, idx) => (
                                   <tr key={idx} className="group hover:bg-[#F5F0E8]/30 transition-colors">
                                      <td className="py-4 font-bold text-[#4A3728] text-sm">{s.name}</td>
                                      <td className="py-4 text-[#8B6F5C] font-bold">{s.price}</td>
                                      <td className="py-4 text-xs text-[#4A3728]/60">{s.time}</td>
                                      <td className="py-4">
                                         <span className="text-[10px] font-bold px-3 py-1 bg-green-50 text-green-600 rounded-full uppercase">Активна</span>
                                      </td>
                                      <td className="py-4 text-right space-x-2">
                                         <button className="text-xs font-bold text-[#4A3728] hover:text-[#8B6F5C] transition-colors">Редактировать</button>
                                         <span className="text-[#E8C4B8]">|</span>
                                         <button className="text-xs font-bold text-red-300 hover:text-red-500 transition-colors">Скрыть</button>
                                      </td>
                                   </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* PROMOTIONS TAB */}
        {activeTab === 'promotions' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
             <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Акции и скидки</h2>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#8B6F5C] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#4A3728] transition-all shadow-lg flex items-center space-x-2"
                >
                   <Plus size={20} />
                   <span>Создать акцию</span>
                </button>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PROMOTIONS.map(promo => (
                  <div key={promo.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30 flex flex-col h-full group hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                       <div className="bg-[#F5F0E8] p-4 rounded-2xl text-[#8B6F5C]">
                          <Gift size={24} />
                       </div>
                       <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                          promo.status === 'active' ? 'bg-green-100 text-green-600' : 
                          promo.status === 'draft' ? 'bg-gray-100 text-gray-500' : 'bg-red-100 text-red-600'
                       }`}>
                          {promo.status === 'active' ? 'Активна' : promo.status === 'draft' ? 'Черновик' : 'Завершена'}
                       </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#4A3728] mb-2">{promo.title}</h3>
                    <p className="text-[#4A3728]/60 text-sm mb-6 flex-grow">{promo.description}</p>
                    <div className="bg-[#F5F0E8] p-4 rounded-2xl mb-6">
                       <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#8B6F5C] font-bold">Скидка:</span>
                          <span className="text-[#4A3728] font-bold">{promo.discount}</span>
                       </div>
                       {promo.promoCode && (
                          <div className="flex justify-between text-sm mb-1">
                             <span className="text-[#8B6F5C] font-bold">Промокод:</span>
                             <span className="text-[#4A3728] font-bold tracking-widest">{promo.promoCode}</span>
                          </div>
                       )}
                       <div className="flex justify-between text-sm">
                          <span className="text-[#8B6F5C] font-bold">Действует до:</span>
                          <span className="text-[#4A3728] font-bold">{promo.expiryDate}</span>
                       </div>
                    </div>
                    <div className="flex space-x-2">
                       <button className="flex-grow py-3 border border-[#E8C4B8] text-[#4A3728] font-bold rounded-xl hover:bg-[#F5F0E8] transition-all">Редактировать</button>
                       <button className="p-3 border border-[#E8C4B8] text-red-400 rounded-xl hover:bg-red-50 transition-all"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* LOYALTY TAB */}
        {activeTab === 'loyalty' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
             <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Карты лояльности</h2>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SETTINGS CARD */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 space-y-8">
                   <h3 className="text-xl font-bold text-[#4A3728] flex items-center">
                      <Settings size={20} className="mr-2 text-[#8B6F5C]" /> Настройки программы
                   </h3>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-[#8B6F5C] uppercase">Штампов до награды</label>
                         <select className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] font-bold outline-none border-none">
                            <option>5 штампов</option>
                            <option>10 штампов</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-[#8B6F5C] uppercase">Тип награды</label>
                         <div className="grid grid-cols-2 gap-2">
                            <button className="py-3 bg-[#8B6F5C] text-white rounded-xl font-bold text-sm">Услуга 0₽</button>
                            <button className="py-3 bg-[#F5F0E8] text-[#8B6F5C] rounded-xl font-bold text-sm">Скидка %</button>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-[#8B6F5C] uppercase">Какая услуга бесплатно?</label>
                         <select className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] font-bold outline-none border-none">
                            {SERVICES.map(s => <option key={s.id}>{s.name}</option>)}
                         </select>
                      </div>
                      <button className="w-full bg-[#4A3728] text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
                         Обновить программу
                      </button>
                   </div>
                </div>

                {/* STATS AREA */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="bg-[#8B6F5C] text-white p-8 rounded-[3rem] shadow-lg flex flex-col justify-between">
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Активных карт</p>
                      <p className="text-5xl font-rounded font-bold my-4">1,248</p>
                      <p className="text-white/80 text-sm flex items-center"><TrendingUp size={16} className="mr-2" /> +42 за неделю</p>
                   </div>
                   <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 flex flex-col justify-between">
                      <p className="text-[#8B6F5C] text-xs font-bold uppercase tracking-widest">Наград выдано</p>
                      <p className="text-5xl font-rounded font-bold text-[#4A3728] my-4">312</p>
                      <p className="text-[#8B6F5C] text-sm flex items-center"><CheckCircle2 size={16} className="mr-2" /> 89% использовано</p>
                   </div>
                   
                   <div className="sm:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30 overflow-hidden">
                      <div className="p-8 border-b border-[#E8C4B8]/30 flex items-center justify-between">
                         <h3 className="font-bold text-[#4A3728]">Клиенты с картами</h3>
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B6F5C]" size={16} />
                            <input type="text" placeholder="Поиск..." className="pl-10 pr-4 py-2 bg-[#F5F0E8] rounded-full text-xs outline-none" />
                         </div>
                      </div>
                      <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                            <thead className="bg-[#F5F0E8]/50 text-[#8B6F5C] uppercase text-[10px] font-bold">
                               <tr>
                                  <th className="px-6 py-4">Клиент</th>
                                  <th className="px-6 py-4">Штампов</th>
                                  <th className="px-6 py-4">Наград</th>
                                  <th className="px-6 py-4">Действие</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8C4B8]/20">
                               {ADMIN_CLIENTS.slice(0, 4).map(c => (
                                 <tr key={c.id}>
                                    <td className="px-6 py-4 font-bold text-[#4A3728] text-xs">{c.name}</td>
                                    <td className="px-6 py-4">
                                       <div className="flex space-x-1">
                                          {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full ${i < c.loyaltyStamps ? 'bg-[#8B6F5C]' : 'bg-[#E8C4B8]'}`} />
                                          ))}
                                       </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#8B6F5C] text-xs">{c.visits > 5 ? '1' : '0'}</td>
                                    <td className="px-6 py-4">
                                       <button className="text-[#8B6F5C] hover:underline font-bold text-[10px]">+ штамп</button>
                                    </td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Отзывы клиентов</h2>
              <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-[#E8C4B8]">
                {['all', 'pending', 'published', 'hidden'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setReviewFilter(f as any)}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                      reviewFilter === f ? 'bg-[#8B6F5C] text-white shadow-md' : 'text-[#4A3728]/60 hover:text-[#4A3728]'
                    }`}
                  >
                    {f === 'all' ? 'Все' : f === 'pending' ? 'На модерации' : f === 'published' ? 'Опубликованные' : 'Скрытые'}
                  </button>
                ))}
              </div>
            </header>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F5F0E8] text-[#8B6F5C] text-[10px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-5">Клиент</th>
                      <th className="px-6 py-5">Мастер</th>
                      <th className="px-6 py-5">Рейтинг</th>
                      <th className="px-6 py-5">Отзыв</th>
                      <th className="px-6 py-5">Дата</th>
                      <th className="px-6 py-5">Статус</th>
                      <th className="px-6 py-5 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8C4B8]/20">
                    {[
                      { id: 1, author: 'Елена Петрова', master: 'Анна Кхан', rating: 5, text: 'Потрясающая работа! Ресницы держатся уже 3 недели...', date: '20.06.2024', status: 'published' },
                      { id: 2, author: 'Мария Иванова', master: 'Марина Соколова', rating: 5, text: 'Очень довольна результатом, обязательно вернусь!', date: '18.06.2024', status: 'published' },
                      { id: 3, author: 'Ольга Смирнова', master: 'Елена Белова', rating: 4, text: 'Хорошо, но хотелось бы погуще', date: '15.06.2024', status: 'pending' },
                    ].map((r) => (
                      <tr key={r.id} className="hover:bg-[#F5F0E8]/30 transition-colors">
                        <td className="px-6 py-5 font-bold text-[#4A3728] text-sm">{r.author}</td>
                        <td className="px-6 py-5 text-[#8B6F5C] font-bold text-sm">{r.master}</td>
                        <td className="px-6 py-5">
                          <div className="flex space-x-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < r.rating ? "fill-[#C49A7C] text-[#C49A7C]" : "text-gray-200"} />)}
                          </div>
                        </td>
                        <td className="px-6 py-5 max-w-xs">
                          <p className="text-xs text-[#4A3728]/80 italic line-clamp-2">"{r.text}"</p>
                        </td>
                        <td className="px-6 py-5 text-xs text-[#8B6F5C]">{r.date}</td>
                        <td className="px-6 py-5">
                          <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase ${
                            r.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {r.status === 'published' ? 'Опубликован' : 'На модерации'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right space-x-2">
                          <button className="text-[10px] font-bold text-[#8B6F5C] hover:underline">{r.status === 'published' ? 'Скрыть' : 'Опубликовать'}</button>
                          <button className="text-[10px] font-bold text-[#4A3728] hover:underline">Ответить</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Галерея работ</h2>
              <button className="bg-[#8B6F5C] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#4A3728] transition-all shadow-lg flex items-center space-x-2">
                <Plus size={20} />
                <span>Добавить фото</span>
              </button>
            </header>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex bg-white p-1 rounded-2xl border border-[#E8C4B8] shadow-sm">
                <button className="px-4 py-2 bg-[#F5F0E8] rounded-xl text-xs font-bold text-[#8B6F5C]">Все мастера</button>
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-[#4A3728]/60">Анна Кхан</button>
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-[#4A3728]/60">Марина Соколова</button>
              </div>
              <div className="flex bg-white p-1 rounded-2xl border border-[#E8C4B8] shadow-sm">
                <button className="px-4 py-2 bg-[#F5F0E8] rounded-xl text-xs font-bold text-[#8B6F5C]">Все услуги</button>
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-[#4A3728]/60">Наращивание</button>
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-[#4A3728]/60">Ламинирование</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { id: 1, master: 'Анна Кхан', service: '2D объём' },
                { id: 2, master: 'Марина Соколова', service: '3D объём' },
                { id: 3, master: 'Елена Белова', service: 'Ламинирование' },
                { id: 4, master: 'Анна Кхан', service: 'Классика' },
                { id: 5, master: 'Марина Соколова', service: '2D объём' },
                { id: 6, master: 'Елена Белова', service: 'Ламинирование' },
              ].map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-[#E8C4B8]/30 group hover:shadow-xl transition-all">
                  <div className="aspect-square bg-[#F5F0E8] flex items-center justify-center text-[#C49A7C]">
                    <ImageIcon size={48} className="opacity-30 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="font-bold text-[#4A3728] text-sm mb-1">{item.master}</p>
                    <p className="text-xs text-[#8B6F5C] mb-4">{item.service}</p>
                    <div className="flex space-x-2">
                      <button className="flex-grow py-2 bg-[#F5F0E8] text-[#8B6F5C] rounded-xl text-[10px] font-bold hover:bg-[#E8C4B8] transition-colors">Скрыть</button>
                      <button className="p-2 border border-[#E8C4B8] text-red-300 rounded-xl hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLACKLIST TAB */}
        {activeTab === 'blacklist' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Чёрный список</h2>
              <button className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg flex items-center space-x-2">
                <Plus size={20} />
                <span>Добавить</span>
              </button>
            </header>

            <div className="bg-white rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F5F0E8] text-[#8B6F5C] text-[10px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-5">Имя</th>
                      <th className="px-8 py-5">Телефон</th>
                      <th className="px-8 py-5">Причина</th>
                      <th className="px-8 py-5">Добавил</th>
                      <th className="px-8 py-5">Дата</th>
                      <th className="px-8 py-5 text-right">Действие</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8C4B8]/20">
                    {[
                      { name: 'Анна Сидорова', phone: '+7 999 111-22-33', reason: 'Неявка 3 раза подряд', addedBy: 'Админ', date: '10.05.2024' },
                      { name: 'Ирина К.', phone: '+7 999 222-33-44', reason: 'Грубость с мастером', addedBy: 'Анна Кхан', date: '25.04.2024' },
                    ].map((entry, idx) => (
                      <tr key={idx} className="hover:bg-red-50/30 transition-colors">
                        <td className="px-8 py-6 font-bold text-[#4A3728] text-sm">{entry.name}</td>
                        <td className="px-8 py-6 text-sm text-[#8B6F5C]">{entry.phone}</td>
                        <td className="px-8 py-6">
                          <span className="text-[10px] text-red-500 bg-red-50 px-3 py-1 rounded-full font-bold">{entry.reason}</span>
                        </td>
                        <td className="px-8 py-6 text-sm text-[#4A3728]/70">{entry.addedBy}</td>
                        <td className="px-8 py-6 text-xs text-[#8B6F5C]">{entry.date}</td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-xs font-bold text-[#8B6F5C] hover:underline">Разблокировать</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
            <h2 className="text-3xl font-rounded font-bold text-[#4A3728]">Настройки студии</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* MAIN INFO */}
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 space-y-8">
                <h3 className="text-xl font-bold text-[#4A3728] flex items-center">
                  <Info size={20} className="mr-2 text-[#8B6F5C]" /> Основная информация
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Название студии</label>
                    <input type="text" defaultValue="Khan's Art" className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] outline-none font-bold text-[#4A3728]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Адрес</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6F5C]" size={18} />
                      <input type="text" defaultValue="г. Москва, ул. Примерная, д. 1" className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#F5F0E8] outline-none font-medium text-sm text-[#4A3728]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Телефон</label>
                      <input type="text" defaultValue="+7 (900) 123-45-67" className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] outline-none font-medium text-sm text-[#4A3728]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Email</label>
                      <input type="email" defaultValue="info@khansart.ru" className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] outline-none font-medium text-sm text-[#4A3728]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* WORKING HOURS */}
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 space-y-8">
                <h3 className="text-xl font-bold text-[#4A3728] flex items-center">
                  <Clock size={20} className="mr-2 text-[#8B6F5C]" /> Рабочие часы
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#F5F0E8] rounded-2xl">
                    <span className="font-bold text-sm text-[#4A3728]">Пн - Пт</span>
                    <input type="text" defaultValue="10:00 - 21:00" className="bg-transparent text-right outline-none font-bold text-[#8B6F5C]" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F5F0E8] rounded-2xl">
                    <span className="font-bold text-sm text-[#4A3728]">Сб - Вс</span>
                    <input type="text" defaultValue="10:00 - 20:00" className="bg-transparent text-right outline-none font-bold text-[#8B6F5C]" />
                  </div>
                </div>
              </div>

              {/* SOCIAL NETWORKS */}
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 space-y-8">
                <h3 className="text-xl font-bold text-[#4A3728] flex items-center">
                  <Instagram size={20} className="mr-2 text-[#8B6F5C]" /> Социальные сети
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Instagram</label>
                    <input type="text" defaultValue="@khans_art" className="w-full px-6 py-3 rounded-xl bg-[#F5F0E8] outline-none font-medium text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">WhatsApp</label>
                    <input type="text" defaultValue="+7 (900) 123-45-67" className="w-full px-6 py-3 rounded-xl bg-[#F5F0E8] outline-none font-medium text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#8B6F5C] uppercase tracking-wider ml-1">Telegram</label>
                    <input type="text" defaultValue="@khansart" className="w-full px-6 py-3 rounded-xl bg-[#F5F0E8] outline-none font-medium text-sm" />
                  </div>
                </div>
              </div>

              {/* NOTIFICATIONS */}
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 space-y-8">
                <h3 className="text-xl font-bold text-[#4A3728] flex items-center">
                  <Bell size={20} className="mr-2 text-[#8B6F5C]" /> Уведомления
                </h3>
                <div className="space-y-4">
                  {[
                    'SMS напоминание за 24 часа',
                    'Email подтверждение записи',
                    'Уведомление мастеру о новой записи'
                  ].map((notif, idx) => (
                    <label key={idx} className="flex items-center justify-between p-4 bg-[#F5F0E8] rounded-2xl cursor-pointer hover:bg-[#E8C4B8]/30 transition-all">
                      <span className="text-sm font-bold text-[#4A3728]">{notif}</span>
                      <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-[#8B6F5C] focus:ring-[#8B6F5C]" />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button className="bg-[#8B6F5C] text-white px-12 py-5 rounded-[2rem] text-xl font-bold shadow-2xl shadow-[#8B6F5C]/30 hover:bg-[#4A3728] transition-all transform active:scale-95">
                Сохранить изменения
              </button>
            </div>
          </div>
        )}

        {/* MODAL SIMULATION */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                <div className="p-10 space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-[#4A3728]">Добавить объект</h3>
                      <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"><X size={24} /></button>
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-1">
                         <label className="text-xs font-bold text-[#8B6F5C] uppercase">Название / Имя</label>
                         <input type="text" className="w-full px-6 py-3 rounded-xl bg-[#F5F0E8] outline-none" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs font-bold text-[#8B6F5C] uppercase">Описание / Телефон</label>
                         <input type="text" className="w-full px-6 py-3 rounded-xl bg-[#F5F0E8] outline-none" />
                      </div>
                   </div>
                   <button className="w-full bg-[#8B6F5C] text-white py-4 rounded-2xl font-bold">Добавить</button>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPanel;

// Internal helpers
const Info = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);
