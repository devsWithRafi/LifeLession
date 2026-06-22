import { TrendingUp } from 'lucide-react';
import React from 'react';

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <div className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow duration-200 group">
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-xl ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      {trend && (
        <span className="text-xs text-emerald-500 font-medium flex items-center gap-0.5">
          <TrendingUp className="w-3 h-3" /> {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  </div>
);

export default StatCard;
