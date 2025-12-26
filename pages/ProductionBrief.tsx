import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectContext';
import { Shoot, ShotItem } from '../types';

// Modular Sub-components
import BriefHeader from '../components/production-brief/BriefHeader';
import BriefInfoCards from '../components/production-brief/BriefInfoCards';
import BriefGuardrails from '../components/production-brief/BriefGuardrails';
import BriefShotList from '../components/production-brief/BriefShotList';
import BriefFooter from '../components/production-brief/BriefFooter';

const ProductionBrief: React.FC = () => {
  const { shootId } = useParams();
  const navigate = useNavigate();
  const { getShootById, updateShoot } = useProjects();
  
  const shoot = getShootById(shootId || '');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Shoot>>({});

  useEffect(() => {
    if (shoot) {
      setEditData({
        title: shoot.title,
        concept: shoot.concept,
        scheduledDate: shoot.scheduledDate,
        location: shoot.location,
        crew: { ...shoot.crew },
        shotList: [...shoot.shotList]
      });
    }
  }, [shoot, isEditing]);

  if (!shoot) return <div className="p-20 text-center animate-pulse">Synchronizing Brief Context...</div>;

  const handleSave = () => {
    updateShoot(shoot.id, editData);
    setIsEditing(false);
  };

  const handleUpdateEditData = (updates: Partial<Shoot>) => {
    setEditData(prev => ({ ...prev, ...updates }));
  };

  const handleUpdateShot = (index: number, updates: Partial<ShotItem>) => {
    const newList = [...(editData.shotList || shoot.shotList)];
    newList[index] = { ...newList[index], ...updates };
    setEditData(prev => ({ ...prev, shotList: newList }));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 md:p-16 space-y-16 animate-in fade-in duration-1000 print:p-0 print:m-0 print:space-y-8 pb-32">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .bg-ivory { background-color: #FAFAF7 !important; }
          .bg-charcoal { background-color: #1E1E1E !important; color: white !important; }
          .rounded-[48px], .rounded-[40px] { border-radius: 20px !important; }
          table { font-size: 10px !important; }
          h2 { font-size: 24px !important; }
          h3 { font-size: 18px !important; }
        }
      `}</style>
      
      <BriefHeader 
        shoot={shoot}
        isEditing={isEditing}
        editData={editData}
        onNavigateBack={() => navigate('/shoots')}
        onSetIsEditing={setIsEditing}
        onUpdateEditData={handleUpdateEditData}
        onSave={handleSave}
      />

      <BriefInfoCards 
        shoot={shoot}
        isEditing={isEditing}
        editData={editData}
        onUpdateEditData={handleUpdateEditData}
      />

      <BriefGuardrails shoot={shoot} />

      <BriefShotList 
        shoot={shoot}
        isEditing={isEditing}
        editData={editData}
        onUpdateShot={handleUpdateShot}
      />

      <BriefFooter 
        onInitializeCrewView={() => navigate(`/shoots/crew/${shoot.id}`)}
      />
    </div>
  );
};

export default ProductionBrief;