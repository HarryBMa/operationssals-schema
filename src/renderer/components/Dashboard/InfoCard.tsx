import React from 'react';

interface InfoCardProps {
  title: string;
  message: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, message }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow">
    <h2 className="font-semibold text-yellow-800 mb-1">{title}</h2>
    <p className="text-yellow-700 text-sm">{message}</p>
  </div>
);

export default InfoCard;
