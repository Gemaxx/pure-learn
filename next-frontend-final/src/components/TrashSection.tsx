import React from "react";

interface TrashSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const TrashSection: React.FC<TrashSectionProps> = ({ title, icon, children }) => {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
};

export default TrashSection; 