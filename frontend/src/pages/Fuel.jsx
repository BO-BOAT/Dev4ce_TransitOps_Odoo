import { Fuel as FuelIcon, DollarSign, TrendingDown } from 'lucide-react';
import PageShell from '../components/PageShell';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';

const fuelStats = [
  { icon: FuelIcon, label: 'Total Litres (MTD)', value: '12,480 L', trend: -3.2, trendLabel: 'vs last month', color: 'accent' },
  { icon: DollarSign, label: 'Total Cost (MTD)', value: '$18,400', trend: -4.6, trendLabel: 'vs last month', color: 'success' },
  { icon: TrendingDown, label: 'Avg Cost / km', value: '$0.42', trend: -1.8, trendLabel: 'improving', color: 'info' },
];

const expenses = [
  { id: 'FUL-201', vehicle: 'BUS-0042', date: '2026-07-11', litres: '120 L', cost: '$198', odometer: '42,300 km', station: 'Shell — Main St', status: 'Approved' },
  { id: 'FUL-200', vehicle: 'BUS-0015', date: '2026-07-11', litres: '145 L', cost: '$240', odometer: '67,800 km', station: 'BP — Airport Rd', status: 'Approved' },
  { id: 'FUL-199', vehicle: 'BUS-0008', date: '2026-07-10', litres: '80 L', cost: '$132', odometer: '12,100 km', station: 'Shell — Main St', status: 'Pending' },
  { id: 'FUL-198', vehicle: 'BUS-0031', date: '2026-07-10', litres: '135 L', cost: '$223', odometer: '89,200 km', station: 'Caltex — Industrial', status: 'Approved' },
  { id: 'FUL-197', vehicle: 'BUS-0005', date: '2026-07-09', litres: '95 L', cost: '$157', odometer: '31,400 km', station: 'BP — Downtown', status: 'Approved' },
];

const columns = [
  { key: 'id', label: 'Entry ID' },
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'date', label: 'Date' },
  { key: 'litres', label: 'Quantity' },
  { key: 'cost', label: 'Cost' },
  { key: 'odometer', label: 'Odometer' },
  { key: 'station', label: 'Station' },
  { key: 'status', label: 'Status' },
];

export default function Fuel() {
  return (
    <PageShell
      title="Fuel & Expense Management"
      description="Track fuel consumption, expenses, and cost efficiency"
      actionLabel="+ Log Fuel Entry"
      onAction={() => {}}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {fuelStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
      <DataTable columns={columns} data={expenses} />
    </PageShell>
  );
}
