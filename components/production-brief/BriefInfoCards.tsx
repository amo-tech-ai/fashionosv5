import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { Shoot } from '../../types';

interface BriefInfoCardsProps {
  shoot: Shoot;
  isEditing: boolean;
  editData: Partial<Shoot>;
  onUpdateEditData: (updates: Partial<Shoot>) => void;
}

const BriefInfoCards: React.FC<BriefInfoCardsProps> = ({
  shoot,
  isEditing,
  editData,
  onUpdateEditData
}) => {
  const updateCrew = (role: keyof Shoot['crew'], value: string) => {
    onUpdateEditData({
      crew: { ...(editData.crew || shoot.crew), [role]: value }
    });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-10 print:grid-cols-3 print:gap-4">
      <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm print:p-4">
        <div className="flex items-center gap-3 text-charcoal">
          <Clock size={18} className="text-sage" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Time & Date</span>
        </div>
        {isEditing ? (
          <input 
            type="date"
            className="text-lg font-serif bg-ivory border-none outline-none w-full"
            value={editData.scheduledDate}
            onChange={e => onUpdateEditData({ scheduledDate: e.target.value })}
          />
        ) : (
          <p className="text-2xl font-serif print:text-lg">{shoot.scheduledDate}</p>
        )}
        <p className="text-xs text-warmgray uppercase font-bold tracking-widest">Call Time: 08:00 AM</p>
      </div>

      <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm print:p-4">
        <div className="flex items-center gap-3 text-charcoal">
          <MapPin size={18} className="text-sage" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Venue</span>
        </div>
        {isEditing ? (
          <input 
            className="text-lg font-serif bg-ivory border-none outline-none w-full"
            value={editData.location}
            onChange={e => onUpdateEditData({ location: e.target.value })}
          />
        ) : (
          <p className="text-2xl font-serif print:text-lg">{shoot.location}</p>
        )}
        <p className="text-xs text-warmgray uppercase font-bold tracking-widest">Access Code: NY-42-B</p>
      </div>

      <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm print:p-4">
        <div className="flex items-center gap-3 text-charcoal">
          <Users size={18} className="text-sage" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Lead Nodes</span>
        </div>
        <div className="space-y-4">
          {(['photographer', 'stylist', 'model'] as const).map((role) => (
            <div key={role} className="flex flex-col">
              <span className="text-[8px] uppercase font-bold text-warmgray tracking-widest">{role}</span>
              {isEditing ? (
                <input 
                  className="text-xs font-bold text-charcoal bg-ivory border-none outline-none py-1"
                  value={(editData.crew as any)?.[role]}
                  onChange={e => updateCrew(role, e.target.value)}
                />
              ) : (
                <p className="text-xs font-bold text-charcoal">{(shoot.crew as any)[role]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BriefInfoCards;