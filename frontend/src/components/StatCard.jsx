import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, trend, trendLabel, color = 'accent' }) {
  const colorMap = {
    accent: 'bg-accent-500/15 text-accent-400 border-accent-500/20',
    success: 'bg-success-500/15 text-success-400 border-success-500/20',
    warning: 'bg-warning-500/15 text-warning-400 border-warning-500/20',
    danger: 'bg-danger-500/15 text-danger-400 border-danger-500/20',
    info: 'bg-info-500/15 text-info-400 border-info-500/20',
  };

  const isPositive = trend > 0;

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-2xl p-5 hover:border-surface-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-success-400' : 'text-danger-400'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-surface-400 text-sm mt-1">{label}</p>
      {trendLabel && (
        <p className="text-surface-500 text-xs mt-2">{trendLabel}</p>
      )}
    </div>
  );
}
