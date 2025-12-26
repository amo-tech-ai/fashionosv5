import React from 'react';
import { Sparkles } from 'lucide-react';

interface BriefFooterProps {
  onInitializeCrewView: () => void;
}

const BriefFooter: React.FC<BriefFooterProps> = ({ onInitializeCrewView }) => {
  return (
    <footer className="pt-20 border-t border-ivory text-center space-y-6 no-print">
      <div className="flex justify-center gap-3">
        <Sparkles size={24} className="text-sage" />
        <span className="font-serif text-2xl">Ready for Production.</span>
      </div>
      <button 
        onClick={onInitializeCrewView}
        className="px-12 py-5 bg-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
      >
        Initialize Crew View
      </button>
    </footer>
  );
};

export default BriefFooter;