import PageShell from '../components/PageShell';
import DataTable from '../components/DataTable';

const trips = [
  { id: 'T-1024', route: 'Route 42A — Downtown Loop', driver: 'James Wilson', vehicle: 'BUS-0042', departure: '08:15 AM', arrival: '09:30 AM', passengers: 38, status: 'En-Route' },
  { id: 'T-1023', route: 'Route 15B — Airport Express', driver: 'Maria Garcia', vehicle: 'BUS-0015', departure: '07:45 AM', arrival: '08:50 AM', passengers: 44, status: 'Completed' },
  { id: 'T-1022', route: 'Route 8C — University Line', driver: 'Robert Chen', vehicle: 'BUS-0008', departure: '07:30 AM', arrival: '08:45 AM', passengers: 29, status: 'En-Route' },
  { id: 'T-1021', route: 'Route 31D — Industrial Park', driver: 'Sarah Johnson', vehicle: 'BUS-0031', departure: '07:00 AM', arrival: '08:15 AM', passengers: 22, status: 'Completed' },
  { id: 'T-1020', route: 'Route 5A — Hospital Shuttle', driver: 'David Kim', vehicle: 'BUS-0005', departure: '06:30 AM', arrival: '07:15 AM', passengers: 0, status: 'Scheduled' },
  { id: 'T-1019', route: 'Route 12E — Suburban Line', driver: 'Meera Patel', vehicle: 'BUS-0012', departure: '06:00 AM', arrival: '—', passengers: 0, status: 'Cancelled' },
];

const columns = [
  { key: 'id', label: 'Trip ID' },
  { key: 'route', label: 'Route' },
  { key: 'driver', label: 'Driver' },
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'departure', label: 'Departure' },
  { key: 'arrival', label: 'Est. Arrival' },
  { key: 'passengers', label: 'Passengers' },
  { key: 'status', label: 'Status' },
];

export default function Trips() {
  return (
    <PageShell
      title="Trip Dispatch"
      description="Schedule, monitor, and manage daily trip assignments"
      actionLabel="+ New Trip"
      onAction={() => {}}
    >
      <DataTable columns={columns} data={trips} />
    </PageShell>
  );
}
