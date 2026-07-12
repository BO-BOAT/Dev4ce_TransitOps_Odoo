import PageShell from '../components/PageShell';
import DataTable from '../components/DataTable';

const drivers = [
  { id: 'DRV-001', name: 'James Wilson', license: 'CDL-A', phone: '(555) 234-5678', assigned: 'BUS-0042', rating: '4.8 ★', status: 'Active' },
  { id: 'DRV-002', name: 'Maria Garcia', license: 'CDL-B', phone: '(555) 345-6789', assigned: 'BUS-0015', rating: '4.9 ★', status: 'Active' },
  { id: 'DRV-003', name: 'Robert Chen', license: 'CDL-A', phone: '(555) 456-7890', assigned: 'BUS-0008', rating: '4.6 ★', status: 'Active' },
  { id: 'DRV-004', name: 'Sarah Johnson', license: 'CDL-B', phone: '(555) 567-8901', assigned: 'BUS-0031', rating: '4.7 ★', status: 'Active' },
  { id: 'DRV-005', name: 'David Kim', license: 'CDL-A', phone: '(555) 678-9012', assigned: 'BUS-0005', rating: '4.5 ★', status: 'Inactive' },
  { id: 'DRV-006', name: 'Meera Patel', license: 'CDL-A', phone: '(555) 789-0123', assigned: '—', rating: '4.4 ★', status: 'Pending' },
];

const columns = [
  { key: 'id', label: 'Driver ID' },
  { key: 'name', label: 'Full Name' },
  { key: 'license', label: 'License Type' },
  { key: 'phone', label: 'Phone' },
  { key: 'assigned', label: 'Assigned Vehicle' },
  { key: 'rating', label: 'Safety Rating' },
  { key: 'status', label: 'Status' },
];

export default function Drivers() {
  return (
    <PageShell
      title="Drivers & Safety Profiles"
      description="Driver roster, certifications, and safety performance"
      actionLabel="+ Add Driver"
      onAction={() => {}}
    >
      <DataTable columns={columns} data={drivers} />
    </PageShell>
  );
}
