import React from 'react';

interface HeaderProps {
  date: Date;
  leads: { op: string; ane: string };
}

const Header: React.FC<HeaderProps> = ({ date, leads }) => {
  const dateStr = date.toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-primary px-6 py-3 gap-4">
      <div className="flex items-center justify-center text-center relative">
        <div className="text-[15px] text-primary font-medium pr-6 leading-relaxed">
          {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}<br />
          <span className="mr-4">Vårdledare OP 70301: <b>{leads.op}</b></span>
          <span>Vårdledare ANE 71336: <b>{leads.ane}</b></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
