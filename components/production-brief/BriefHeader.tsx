import React from 'react';
import { ChevronLeft, ClipboardList, X, Save, Edit2, Download } from 'lucide-react';
import { Shoot } from '../../types';

interface BriefHeaderProps {
  shoot: Shoot;
  isEditing: boolean;
  editData: Partial<Shoot>;
  onNavigateBack: () => void;
  onSetIsEditing: (val: boolean) => void;
  onUpdateEditData: (updates: Partial<Shoot>) => void;
  onSave: () => void;
}

const BriefHeader: React.FC<BriefHeaderProps> = ({
  shoot,
  isEditing,
  editData,
  onNavigateBack,
  onSetIsEditing,
  onUpdateEditData,
  onSave
}) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 print:flex-row">
      <div className="space-y-4 w-full">
        <button onClick={onNavigateBack} className="flex items-center gap-2 text-warmgray hover:text-charcoal transition-colors font-medium mb-2 group no-print">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shoots
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-charcoal rounded-2xl flex items-center justify-center text-white shadow-xl print:shadow-none">
              <ClipboardList size={24} />
            </div>
            {isEditing ? (
              <input 
                className="font-serif text-5xl tracking-tighter bg-ivory border-b border-charcoal outline-none w-full max-w-lg"
                value={editData.title}
                onChange={e => onUpdateEditData({ title: e.target.value })}
              />
            ) : (
              <h2 className="font-serif text-5xl tracking-tighter print:text-4xl">{shoot.title}</h2>
            )}
          </div>
          <div className="flex gap-3 no-print">
            {isEditing ? (
              <>
                <button onClick={() => onSetIsEditing(false)} className="p-3 bg-white border border-[#E5E1D8] rounded-full hover:bg-ivory text-warmgray"><X size={20}/></button>
                <button onClick={onSave} className="flex items-center gap-2 px-6 py-3 bg-sage text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-all"><Save size={16}/> Save Changes</button>
              </>
            ) : (
              <button onClick={() => onSetIsEditing(true)} className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E5E1D8] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-ivory transition-all shadow-sm"><Edit2 size={16}/> Edit Brief</button>
            )}
          </div>
        </div>
        {isEditing ? (
          <textarea 
            className="w-full text-lg italic bg-ivory border border-[#E5E1D8] rounded-2xl p-4 outline-none focus:border-charcoal h-24"
            value={editData.concept}
            onChange={e => onUpdateEditData({ concept: e.target.value })}
          />
        ) : (
          <p className="text-warmgray text-lg italic max-w-2xl print:text-sm">"{shoot.concept}"</p>
        )}
      </div>
      <div className="flex gap-4 no-print md:mb-1">
        <button 
          onClick={() => window.print()}
          className="p-4 bg-white border border-[#E5E1D8] rounded-full hover:bg-ivory transition-all shadow-sm"
          title="Print Brief"
        >
          <Download size={20} />
        </button>
      </div>
    </header>
  );
};

export default BriefHeader;