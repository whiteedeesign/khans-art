
import React, { useState } from 'react';
// Added Star to the list of imports from lucide-react
import { 
  Calendar, LayoutGrid, Users, ImageIcon as ImageIcon, BarChart3, Settings, LogOut, 
  ChevronLeft, ChevronRight, Phone, MessageSquare, Check, X, Plus, 
  Search, Info, Filter, Camera, Trash2, Clock, MoreHorizontal, User, Star
} from 'lucide-react';
// Changed MASTER_CLIENTS to ADMIN_CLIENTS to match exported member in constants.tsx
import { MASTERS, MASTER_SCHEDULE, MASTER_PORTFOLIO, ADMIN_CLIENTS, SERVICES } from '../constants';
import { ScheduleEntry, MasterClient, PortfolioWork } from '../types';

type MasterTab = 'schedule' | 'today' | 'clients' | 'portfolio' | 'stats' | 'settings';

interface MasterAccountProps {
  onHomeClick: () => void;
}

const MasterAccount: React.FC<MasterAccountProps> = ({ onHomeClick }) => {
  const [activeTab, setActiveTab] = useState<MasterTab>('schedule');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scheduleView, setScheduleView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedClient, setSelectedClient] = useState<MasterClient | null>(null);
  
  const currentMaster = MASTERS[0]; // Demoing as Anna Khan

  const menuItems = [
    { id: 'schedule', label: 'Моё расписание', icon: <Calendar size={20} /> },
    { id: 'today', label: 'Записи на сегодня', icon: <LayoutGrid size={20} /> },
    { id: 'clients', label: 'Мои клиенты', icon: <Users size={20} /> },
    { id: 'portfolio', label: 'Мои работы', icon: <ImageIcon size={20} /> },
    { id: 'stats', label: 'Статистика', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Настройки', icon: <Settings size={20} /> },
  ];

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR */}
        <aside className={`${isMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-4 shrink-0`}>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#E8C4B8]/30">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4 group cursor-pointer">
                <img src={currentMaster.image} alt="Profile" className="w-24 h-24 rounded-full border-4 border-[#F5F0E8] object-cover" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#4A3728]">{currentMaster.name}</h2>
              <p className="text-sm text-[#8B6F5C]">{currentMaster.role}</p>
              <div className="mt-2 flex items-center space-x-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>В сети</span>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as MasterTab);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === item.id 
                    ? 'bg-[#4A3728] text-white shadow-lg' 
                    : 'text-[#4A3728] hover:bg-[#F5F0E8] hover:text-[#8B6F5C]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button 
                onClick={onHomeClick}
                className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-[#D4A69A] hover:bg-[#F5F0E8] transition-all mt-4 border-t border-[#F5F0E8] pt-6"
              >
                <LogOut size={20} />
                <span>Выйти</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-grow space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* TAB: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-2xl font-rounded font-bold text-[#4A3728]">Моё расписание</h3>
                <div className="flex bg-[#F5F0E8] p-1 rounded-2xl">
                  {['day', 'week', 'month'].map(v => (
                    <button
                      key={v}
                      onClick={() => setScheduleView(v as any)}
                      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                        scheduleView === v ? 'bg-white text-[#8B6F5C] shadow-sm' : 'text-[#4A3728]/60 hover:text-[#4A3728]'
                      }`}
                    >
                      {v === 'day' ? 'День' : v === 'week' ? 'Неделя' : 'Месяц'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#E8C4B8]/30 overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-8">
                  <button className="p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"><ChevronLeft size={24} /></button>
                  <h4 className="text-xl font-bold text-[#4A3728]">25 Июня 2024</h4>
                  <button className="p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"><ChevronRight size={24} /></button>
                </div>

                {/* Simplified Timeline View */}
                <div className="space-y-4">
                  {MASTER_SCHEDULE.map(entry => (
                    <div key={entry.id} className="flex gap-4 group">
                      <div className="w-20 text-right py-4 text-sm font-bold text-[#8B6F5C]">
                        {entry.timeStart}
                      </div>
                      <div className="relative flex-grow">
                        <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-[#F5F0E8] group-last:bg-transparent" />
                        <div className={`ml-4 p-5 rounded-3xl border-l-4 transition-all hover:translate-x-1 cursor-pointer shadow-sm ${
                          entry.status === 'confirmed' ? 'bg-[#F5F0E8]/50 border-[#8B6F5C]' : 
                          entry.status === 'pending' ? 'bg-orange-50 border-orange-300' : 'bg-red-50 border-red-300'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-bold text-[#4A3728]">{entry.service} — {entry.clientName}</h5>
                              <p className="text-xs text-[#8B6F5C] mt-1 flex items-center">
                                <Clock size={12} className="mr-1" /> {entry.timeStart} - {entry.timeEnd}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-[#4A3728]">{entry.price}</span>
                              <div className="text-[10px] uppercase tracking-wider font-bold mt-1 opacity-60">
                                {entry.status === 'confirmed' ? 'Подтверждена' : 'Ожидает'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 border-2 border-dashed border-[#E8C4B8] rounded-3xl text-[#8B6F5C] font-bold hover:bg-[#F5F0E8] transition-all flex items-center justify-center space-x-2">
                    <Plus size={18} />
                    <span>Добавить перерыв или выходной</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TODAY */}
          {activeTab === 'today' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-rounded font-bold text-[#4A3728]">Записи на сегодня</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MASTER_SCHEDULE.filter(s => s.price !== '0₽').map(entry => (
                  <div key={entry.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="bg-[#8B6F5C] text-white px-4 py-2 rounded-2xl text-lg font-bold">
                        {entry.timeStart}
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase bg-green-100 text-green-600">
                        {entry.status}
                      </span>
                    </div>

                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-[#4A3728]">{entry.clientName}</h4>
                        <a href={`tel:${entry.clientPhone}`} className="text-[#8B6F5C] font-medium flex items-center mt-1 hover:underline">
                          <Phone size={14} className="mr-2" /> {entry.clientPhone}
                        </a>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#8B6F5C] font-bold uppercase tracking-wider">Услуга</p>
                        <p className="font-bold text-[#4A3728]">{entry.service}</p>
                        <p className="text-sm font-bold text-[#8B6F5C]">{entry.price}</p>
                      </div>
                    </div>

                    {entry.notes && (
                      <div className="bg-[#F5F0E8] p-4 rounded-2xl text-sm text-[#4A3728]/70 italic">
                        Заметка: {entry.notes}
                      </div>
                    )}

                    <div className="pt-4 grid grid-cols-2 gap-3">
                      <button className="bg-[#8B6F5C] text-white py-3 rounded-xl font-bold hover:bg-[#4A3728] transition-all flex items-center justify-center space-x-2">
                        <Check size={18} />
                        <span>Пришёл</span>
                      </button>
                      <button className="border border-[#E8C4B8] text-[#4A3728] py-3 rounded-xl font-bold hover:bg-[#F5F0E8] transition-all flex items-center justify-center space-x-2">
                        <X size={18} />
                        <span>Не пришёл</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CLIENTS */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-2xl font-rounded font-bold text-[#4A3728]">Мои клиенты</h3>
                <div className="relative max-w-sm">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B6F5C]" size={20} />
                  <input 
                    type="text" 
                    placeholder="Поиск по имени или телефону" 
                    className="w-full pl-12 pr-6 py-3 rounded-2xl bg-white border border-[#E8C4B8] outline-none focus:border-[#8B6F5C] transition-all"
                  />
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-[#E8C4B8]/30">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#F5F0E8] text-[#8B6F5C] uppercase text-xs font-bold">
                      <tr>
                        <th className="px-8 py-5">Клиент</th>
                        <th className="px-8 py-5">Визитов</th>
                        <th className="px-8 py-5">Последний визит</th>
                        <th className="px-8 py-5">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8C4B8]/30">
                      {/* Changed from MASTER_CLIENTS to ADMIN_CLIENTS to match members in constants.tsx */}
                      {ADMIN_CLIENTS.map(client => (
                        <tr key={client.id} className="hover:bg-[#F5F0E8]/30 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-[#E8C4B8] flex items-center justify-center text-[#8B6F5C] font-bold">
                                {client.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-[#4A3728]">{client.name}</p>
                                <p className="text-xs text-[#8B6F5C]">{client.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-bold text-[#4A3728]">{client.visits}</td>
                          <td className="px-8 py-6 text-[#4A3728]/70">{client.lastVisit}</td>
                          <td className="px-8 py-6">
                            <button 
                              onClick={() => setSelectedClient(client)}
                              className="text-[#8B6F5C] font-bold hover:underline"
                            >
                              Подробнее
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-rounded font-bold text-[#4A3728]">Мои работы</h3>
                <button className="bg-[#8B6F5C] text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:bg-[#4A3728] transition-all">
                  <Plus size={20} />
                  <span>Добавить работу</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {MASTER_PORTFOLIO.map(work => (
                  <div key={work.id} className="group relative aspect-square rounded-[2rem] overflow-hidden shadow-sm">
                    <img src={work.imageUrl} alt={work.serviceType} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                      <p className="font-bold text-lg">{work.serviceType}</p>
                      <p className="text-xs text-white/60 mb-4">{work.description}</p>
                      <button className="text-red-400 p-2 hover:bg-white/10 rounded-xl self-start">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-rounded font-bold text-[#4A3728]">Статистика</h3>
                <select className="bg-white border border-[#E8C4B8] rounded-xl px-4 py-2 font-bold text-[#8B6F5C] outline-none">
                  <option>За месяц</option>
                  <option>За неделю</option>
                  <option>За год</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30">
                  <p className="text-sm font-bold text-[#8B6F5C] uppercase mb-1">Записей</p>
                  <p className="text-4xl font-rounded font-bold text-[#4A3728]">42</p>
                  <p className="text-xs text-green-600 mt-2 font-bold">+12% к прошлому месяцу</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30">
                  <p className="text-sm font-bold text-[#8B6F5C] uppercase mb-1">Выполнено</p>
                  <p className="text-4xl font-rounded font-bold text-[#4A3728]">38</p>
                  <div className="w-full bg-[#F5F0E8] h-1.5 rounded-full mt-4">
                    <div className="bg-green-500 h-full rounded-full w-[90%]" />
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E8C4B8]/30">
                  <p className="text-sm font-bold text-[#8B6F5C] uppercase mb-1">Отмены</p>
                  <p className="text-4xl font-rounded font-bold text-[#4A3728]">4</p>
                  <p className="text-xs text-red-400 mt-2 font-bold">2 неявки</p>
                </div>
                <div className="bg-[#4A3728] p-8 rounded-[2.5rem] shadow-lg text-white">
                  <p className="text-sm font-bold text-white/60 uppercase mb-1">Заработано</p>
                  <p className="text-4xl font-rounded font-bold">114к₽</p>
                  <p className="text-xs text-[#E8C4B8] mt-2 font-bold">Чистая прибыль</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30">
                  <h4 className="text-xl font-bold text-[#4A3728] mb-8">Популярные услуги</h4>
                  <div className="space-y-6">
                    {[
                      { name: '2D Объём', count: 18, color: 'bg-[#8B6F5C]' },
                      { name: '3D Объём', count: 12, color: 'bg-[#D4A69A]' },
                      { name: 'Ламинирование', count: 8, color: 'bg-[#C49A7C]' },
                      { name: 'Классика', count: 4, color: 'bg-[#E8C4B8]' },
                    ].map(item => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-[#4A3728]">{item.name}</span>
                          <span className="text-[#8B6F5C]">{item.count} зап.</span>
                        </div>
                        <div className="w-full bg-[#F5F0E8] h-3 rounded-full overflow-hidden">
                          <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${(item.count/42)*100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30 flex flex-col items-center justify-center text-center space-y-4">
                   <div className="w-32 h-32 rounded-full border-8 border-[#F5F0E8] border-t-[#8B6F5C] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#4A3728]">4.9</span>
                   </div>
                   <h4 className="text-xl font-bold text-[#4A3728]">Ваш рейтинг</h4>
                   <p className="text-sm text-[#4A3728]/60">На основе 156 отзывов клиентов</p>
                   <div className="flex space-x-1 text-[#C49A7C]">
                     {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-[#C49A7C]" />)}
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-[#E8C4B8]/30">
                <h3 className="text-2xl font-rounded font-bold text-[#4A3728] mb-10 text-center">Настройки профиля</h3>
                
                <div className="space-y-8">
                  <div className="flex flex-col items-center mb-8">
                     <div className="relative">
                        <img src={currentMaster.image} className="w-24 h-24 rounded-full border-4 border-[#F5F0E8] object-cover" />
                        <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md text-[#8B6F5C]"><Camera size={16} /></button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#8B6F5C] uppercase ml-2">Имя мастера</label>
                      <input type="text" defaultValue={currentMaster.name} className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#8B6F5C] uppercase ml-2">Телефон</label>
                      <input type="tel" defaultValue="+7 (911) 555-55-55" className="w-full px-6 py-4 rounded-2xl bg-[#F5F0E8] border-2 border-transparent focus:border-[#8B6F5C] outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#F5F0E8]">
                    <h4 className="font-bold text-[#4A3728]">Рабочий график</h4>
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].map(day => (
                      <div key={day} className="flex items-center justify-between p-4 bg-[#F5F0E8] rounded-2xl">
                        <span className="font-bold text-[#4A3728] text-sm">{day}</span>
                        <div className="flex items-center space-x-3">
                          <input type="text" defaultValue="10:00 - 20:00" className="w-32 px-3 py-1.5 rounded-lg text-xs font-bold border-none outline-none focus:ring-2 focus:ring-[#8B6F5C]" />
                          <label className="flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md text-[#8B6F5C] focus:ring-[#8B6F5C]" />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-[#F5F0E8]">
                    <h4 className="font-bold text-[#4A3728] mb-4">Специализация</h4>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map(s => (
                        <label key={s.id} className="flex items-center space-x-2 bg-[#F5F0E8] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#E8C4B8] transition-colors">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8B6F5C] rounded" />
                          <span className="text-xs font-bold text-[#4A3728]">{s.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-[#8B6F5C] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#4A3728] transition-all">
                    Сохранить настройки
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CLIENT DETAILS MODAL */}
      {selectedClient && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#F5F0E8] w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-3xl bg-[#8B6F5C] text-white flex items-center justify-center text-3xl font-bold">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#4A3728]">{selectedClient.name}</h3>
                    <p className="text-[#8B6F5C] font-bold">{selectedClient.phone}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)} className="p-2 hover:bg-[#E8C4B8] rounded-full transition-colors"><X size={28} /></button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl text-center">
                  <p className="text-xs text-[#8B6F5C] font-bold uppercase">Всего визитов</p>
                  <p className="text-2xl font-bold text-[#4A3728]">{selectedClient.visits}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl text-center">
                  <p className="text-xs text-[#8B6F5C] font-bold uppercase">Последний раз</p>
                  <p className="text-xl font-bold text-[#4A3728]">{selectedClient.lastVisit}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-[#4A3728] flex items-center">
                  <MessageSquare size={18} className="mr-2 text-[#8B6F5C]" /> Заметки мастера (приватные)
                </h4>
                <div className="bg-white p-6 rounded-[2rem] text-[#4A3728]/80 text-sm italic leading-relaxed shadow-inner">
                  {selectedClient.notes}
                </div>
                <button className="flex items-center space-x-2 text-[#8B6F5C] font-bold hover:underline px-2">
                  <Plus size={16} />
                  <span>Добавить новую заметку</span>
                </button>
              </div>

              <div className="pt-6 border-t border-[#E8C4B8]">
                <h4 className="text-lg font-bold text-[#4A3728] mb-4">История посещений у меня</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center text-sm p-4 bg-white/50 rounded-2xl">
                      <span className="font-bold">1{i} Марта 2024</span>
                      <span className="text-[#8B6F5C] font-medium">3D Объём — 3800₽</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MasterAccount;
