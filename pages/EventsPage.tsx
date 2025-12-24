
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Tasks', 'Media', 'Notes'];

  const eventImages = [
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=100&q=80"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="serif text-3xl font-medium">Events</h2>
          <div className="flex items-center gap-2 mt-1">
             <span className="h-2 w-2 rounded-full bg-green-500"></span>
             <span className="text-xs text-[#8C8C8C] uppercase tracking-widest font-bold">14 Active Events</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8C8C]" size={16} />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="pl-10 pr-4 py-2 bg-white border border-[#E5E1D8] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] w-64"
              />
           </div>
           <button className="p-2 border border-[#E5E1D8] rounded-full hover:bg-white transition-colors">
              <Filter size={18} className="text-[#8C8C8C]" />
           </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E1D8] rounded-3xl overflow-hidden shadow-sm">
        <div className="border-b border-[#E5E1D8] px-8 flex">
           {tabs.map(tab => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-xs uppercase tracking-widest font-bold border-b-2 transition-all ${activeTab === tab ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#8C8C8C] hover:text-[#1A1A1A]'}`}
             >
               {tab}
             </button>
           ))}
        </div>

        <div className="p-0">
          <table className="w-full text-left">
            <thead className="bg-[#F9F7F2] border-b border-[#E5E1D8]">
              <tr>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">Event Name</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">Location</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">Status</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">Date</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8]">
              {[
                { name: 'NYFW Gala', loc: 'Metropolitan Hall', status: 'Live', date: 'Sept 14, 2024' },
                { name: 'Milan Showcase', loc: 'Palazzo Clerici', status: 'Planned', date: 'Sept 22, 2024' },
                { name: 'Pop-up London', loc: 'Shoreditch Box', status: 'Draft', date: 'Oct 05, 2024' },
                { name: 'After Party', loc: 'Soho House', status: 'Planned', date: 'Sept 15, 2024' },
              ].map((ev, i) => (
                <tr key={i} className="hover:bg-[#F9F7F2] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#E5E1D8] rounded-lg overflow-hidden">
                        <img src={eventImages[i]} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-semibold">{ev.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-[#8C8C8C]">{ev.loc}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${ev.status === 'Live' ? 'bg-green-100 text-green-700' : ev.status === 'Planned' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {ev.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-[#8C8C8C]">{ev.date}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-[#E5E1D8] rounded-full transition-colors opacity-0 group-hover:opacity-100">
                       <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
