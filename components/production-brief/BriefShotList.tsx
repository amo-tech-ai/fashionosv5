import React from 'react';
import { Layout, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Shoot, ShotItem } from '../../types';

interface BriefShotListProps {
  shoot: Shoot;
  isEditing: boolean;
  editData: Partial<Shoot>;
  onUpdateShot: (index: number, updates: Partial<ShotItem>) => void;
}

const BriefShotList: React.FC<BriefShotListProps> = ({
  shoot,
  isEditing,
  editData,
  onUpdateShot
}) => {
  const currentShotList = isEditing ? editData.shotList : shoot.shotList;

  return (
    <section className="space-y-8 print:space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layout size={20} className="text-charcoal" />
          <h3 className="font-serif text-3xl print:text-xl">Grounded Shot List</h3>
        </div>
        <span className="text-[10px] font-bold uppercase text-warmgray tracking-widest">{shoot.shotList.length} Items Technical Checklist</span>
      </div>
      <div className="bg-white border border-[#E5E1D8] rounded-[48px] overflow-hidden shadow-sm print:rounded-2xl print:border-black/10">
        <table className="w-full text-left border-collapse">
          <thead className="bg-ivory border-b border-[#E5E1D8] print:bg-gray-50">
            <tr>
              <th className="px-10 py-6 text-[10px] uppercase font-bold text-warmgray tracking-widest print:px-4 print:py-3">Ref</th>
              <th className="px-10 py-6 text-[10px] uppercase font-bold text-warmgray tracking-widest print:px-4 print:py-3">Reference</th>
              <th className="px-10 py-6 text-[10px] uppercase font-bold text-warmgray tracking-widest print:px-4 print:py-3">Description</th>
              <th className="px-10 py-6 text-[10px] uppercase font-bold text-warmgray tracking-widest print:px-4 print:py-3">Notes</th>
              <th className="px-10 py-6 text-[10px] uppercase font-bold text-warmgray tracking-widest print:px-4 print:py-3">Compliance</th>
              <th className="px-10 py-6 text-[10px] uppercase font-bold text-warmgray tracking-widest print:px-4 print:py-3">Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory print:divide-gray-100">
            {currentShotList?.map((shot, i) => (
              <tr key={shot.id} className="hover:bg-ivory/50 transition-colors group print:hover:bg-transparent">
                <td className="px-10 py-6 text-xs font-bold text-warmgray print:px-4 print:py-2">#0{i+1}</td>
                <td className="px-10 py-6 print:px-4 print:py-2">
                  <div className="w-16 h-16 bg-ivory rounded-xl overflow-hidden border border-[#E5E1D8] flex items-center justify-center relative group/ref">
                    {shot.referenceImage ? (
                      <img src={shot.referenceImage} className="w-full h-full object-cover" alt="Ref" />
                    ) : (
                      <ImageIcon size={20} className="text-warmgray opacity-40" />
                    )}
                    {isEditing && (
                      <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center opacity-0 group-hover/ref:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            const url = prompt("Enter Mood Board Snippet URL:", shot.referenceImage || "");
                            if (url !== null) onUpdateShot(i, { referenceImage: url });
                          }}
                          className="p-2 bg-white rounded-full shadow-lg"
                        >
                          <LinkIcon size={14} className="text-charcoal" />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-10 py-6 print:px-4 print:py-2">
                  {isEditing ? (
                    <div className="space-y-1">
                      <input 
                        className="text-sm font-semibold bg-ivory border-none outline-none w-full py-1"
                        value={shot.description}
                        onChange={e => onUpdateShot(i, { description: e.target.value })}
                      />
                      <input 
                        className="text-[10px] text-warmgray font-medium italic bg-ivory border-none outline-none w-full py-1"
                        value={shot.pose}
                        onChange={e => onUpdateShot(i, { pose: e.target.value })}
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold print:text-[11px]">{shot.description}</p>
                      <p className="text-[10px] text-warmgray font-medium italic mt-1 print:text-[9px]">Pose: {shot.pose}</p>
                      <p className="text-[10px] text-charcoal italic mt-1">{shot.lighting}</p>
                    </>
                  )}
                </td>
                <td className="px-10 py-6 print:px-4 print:py-2 max-w-[200px]">
                  {isEditing ? (
                    <textarea 
                      className="w-full bg-ivory border-none outline-none text-xs leading-relaxed p-2 h-16 rounded"
                      value={shot.notes || ''}
                      placeholder="Technical notes..."
                      onChange={e => onUpdateShot(i, { notes: e.target.value })}
                    />
                  ) : (
                    <p className="text-[11px] text-warmgray leading-relaxed line-clamp-3">{shot.notes || 'No annotations.'}</p>
                  )}
                </td>
                <td className="px-10 py-6 print:px-4 print:py-2">
                  {shot.complianceScore ? (
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-16 bg-ivory rounded-full overflow-hidden no-print">
                        <div 
                          className={`h-full transition-all duration-1000 ${shot.complianceScore > 85 ? 'bg-sage' : 'bg-rose-500'}`}
                          style={{ width: `${shot.complianceScore}%` }}
                        />
                      </div>
                      <span className={`text-[10px] font-bold ${shot.complianceScore > 85 ? 'text-sage' : 'text-rose-500'}`}>
                        {shot.complianceScore}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-bold text-warmgray/40 uppercase">Pending</span>
                  )}
                </td>
                <td className="px-10 py-6 print:px-4 print:py-2">
                  <span className="px-3 py-1 bg-ivory rounded-lg text-[9px] font-bold uppercase text-charcoal print:text-[8px] print:border print:border-black/10">{shot.channel}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BriefShotList;