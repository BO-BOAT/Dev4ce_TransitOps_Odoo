import PageShell from '../components/PageShell';
import DataTable from '../components/DataTable';

const vehicles = [
  { id: 'BUS-0042', type: 'City Bus', make: 'Volvo 7900', year: 2023, capacity: 45, mileage: '42,300 km', depot: 'Central Depot', status: 'Active' },
  { id: 'BUS-0015', type: 'Express', make: 'Mercedes Citaro', year: 2022, capacity: 50, mileage: '67,800 km', depot: 'Airport Hub', status: 'Active' },
  { id: 'BUS-0008', type: 'Shuttle', make: 'BYD K9', year: 2024, capacity: 35, mileage: '12,100 km', depot: 'East Station', status: 'Active' },
  { id: 'BUS-0031', type: 'City Bus', make: 'Volvo 7900', year: 2021, capacity: 45, mileage: '89,200 km', depot: 'Central Depot', status: 'In-Progress' },
  { id: 'BUS-0023', type: 'Mini Bus', make: 'Toyota Coaster', year: 2020, capacity: 22, mileage: '105,600 km', depot: 'West Yard', status: 'Overdue' },
  { id: 'BUS-0005', type: 'Shuttle', make: 'BYD K7', year: 2023, capacity: 28, mileage: '31,400 km', depot: 'Central Depot', status: 'Active' },
];

const columns = [
  { key: 'id', label: 'Vehicle ID' },
  { key: 'type', label: 'Type' },
  { key: 'make', label: 'Make / Model' },
  { key: 'year', label: 'Year' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'mileage', label: 'Mileage' },
  { key: 'depot', label: 'Depot' },
  { key: 'status', label: 'Status' },
];

export default function Vehicles() {
  return (
    <PageShell
      title="Vehicle Registry"
      description="Manage your fleet vehicles, assignments, and compliance"
      actionLabel="+ Add Vehicle"
      onAction={() => {}}
    >
      <DataTable columns={columns} data={vehicles} />
    </PageShell>
  );
}
