
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  defaultCollapsed?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, children, icon, defaultCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  
  return (
    <div className="border-b border-[#E5E1D8]">
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#F9F7F2] transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A]">{title}</span>
        </div>
        <ChevronRight size={14} className={`transform transition-transform ${collapsed ? '' : 'rotate-90'} text-[#8C8C8C]`} />
      </button>
      {!collapsed && <div className="p-4 pt-0 animate-in fade-in slide-in-from-top-1 duration-300">{children}</div>}
    </div>
  );
};

export default Section;
