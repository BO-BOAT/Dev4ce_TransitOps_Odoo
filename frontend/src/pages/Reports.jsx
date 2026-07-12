import { BarChart3, PieChart, TrendingUp, FileText } from 'lucide-react';
import PageShell from '../components/PageShell';

const reportCards = [
  {
    icon: BarChart3,
    title: 'Fleet Utilization',
    description: 'Vehicle usage rates, idle time analysis, and deployment efficiency across all depots.',
    lastGenerated: 'Jul 10, 2026',
  },
  {
    icon: PieChart,
    title: 'Cost Breakdown',
    description: 'Fuel, maintenance, and operational expenses by vehicle type and route.',
    lastGenerated: 'Jul 9, 2026',
  },
  {
    icon: TrendingUp,
    title: 'Driver Performance',
    description: 'Safety scores, trip completion rates, and driving behavior analytics.',
    lastGenerated: 'Jul 8, 2026',
  },
  {
    icon: FileText,
    title: 'Compliance Report',
    description: 'License expirations, inspection status, and regulatory compliance tracking.',
    lastGenerated: 'Jul 7, 2026',
  },
  {
    icon: BarChart3,
    title: 'Route Efficiency',
    description: 'On-time performance, passenger load factors, and route optimization insights.',
    lastGenerated: 'Jul 6, 2026',
  },
  {
    icon: PieChart,
    title: 'Fuel Consumption',
    description: 'Per-vehicle and per-route fuel consumption trends with anomaly detection.',
    lastGenerated: 'Jul 5, 2026',
  },
];

export default function Reports() {
  return (
    <PageShell
      title="Reports & Analytics"
      description="Generate and view operational reports across your fleet"
      actionLabel="+ Generate Report"
      onAction={() => {}}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reportCards.map((report) => (
          <div
            key={report.title}
            className="bg-surface-800 border border-surface-700 rounded-2xl p-5 hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/5 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-500/15 border border-accent-500/20 flex items-center justify-center mb-4 group-hover:bg-accent-500/25 transition-colors">
              <report.icon className="w-5 h-5 text-accent-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{report.title}</h3>
            <p className="text-surface-400 text-sm mb-4 line-clamp-2">{report.description}</p>
            <p className="text-xs text-surface-500">Last generated: {report.lastGenerated}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
