import { Bus, Users, MapPin, Wrench, Fuel, AlertTriangle } from 'lucide-react';
import PageShell from '../components/PageShell';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';

const stats = [
  { icon: Bus, label: 'Total Vehicles', value: '148', trend: 3.2, trendLabel: 'vs last month', color: 'accent' },
  { icon: Users, label: 'Active Drivers', value: '92', trend: 1.8, trendLabel: 'vs last month', color: 'success' },
  { icon: MapPin, label: 'Trips Today', value: '67', trend: -2.1, trendLabel: 'vs yesterday', color: 'info' },
  { icon: Wrench, label: 'Pending Maintenance', value: '12', trend: 5.4, trendLabel: 'needs attention', color: 'warning' },
  { icon: Fuel, label: 'Fuel Cost (MTD)', value: '$18.4K', trend: -4.6, trendLabel: 'vs last month', color: 'danger' },
  { icon: AlertTriangle, label: 'Active Alerts', value: '5', trend: 12, trendLabel: 'this week', color: 'danger' },
];

const recentTrips = [
  { id: 'T-1024', route: 'Route 42A — Downtown Loop', driver: 'James Wilson', vehicle: 'BUS-0042', time: '08:15 AM', status: 'En-Route' },
  { id: 'T-1023', route: 'Route 15B — Airport Express', driver: 'Maria Garcia', vehicle: 'BUS-0015', time: '07:45 AM', status: 'Completed' },
  { id: 'T-1022', route: 'Route 8C — University Line', driver: 'Robert Chen', vehicle: 'BUS-0008', time: '07:30 AM', status: 'En-Route' },
  { id: 'T-1021', route: 'Route 31D — Industrial Park', driver: 'Sarah Johnson', vehicle: 'BUS-0031', time: '07:00 AM', status: 'Completed' },
  { id: 'T-1020', route: 'Route 5A — Hospital Shuttle', driver: 'David Kim', vehicle: 'BUS-0005', time: '06:30 AM', status: 'Scheduled' },
];

const tripColumns = [
  { key: 'id', label: 'Trip ID' },
  { key: 'route', label: 'Route' },
  { key: 'driver', label: 'Driver' },
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'time', label: 'Departure' },
  { key: 'status', label: 'Status' },
];

const alerts = [
  { id: 1, type: 'Maintenance', message: 'BUS-0023 oil change overdue by 500 km', severity: 'Critical' },
  { id: 2, type: 'Fuel', message: 'Fuel tank level below 20% at Depot B', severity: 'Warning' },
  { id: 3, type: 'Safety', message: 'Driver M. Patel — license expires in 14 days', severity: 'Warning' },
];

export default function Dashboard() {
  return (
    <PageShell
      title="Dashboard"
      description="Real-time overview of your fleet operations"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <div className="xl:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Trips</h2>
          <DataTable columns={tripColumns} data={recentTrips} />
        </div>

        {/* Alerts Sidebar */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Active Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-surface-800 border border-surface-700 rounded-2xl p-4 hover:border-surface-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-surface-400">{alert.type}</span>
                  <StatusBadge status={alert.severity} />
                </div>
                <p className="text-sm text-surface-300">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
