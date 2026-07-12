import PageShell from '../components/PageShell';
import DataTable from '../components/DataTable';

const records = [
  { id: 'MNT-301', vehicle: 'BUS-0023', type: 'Oil Change', priority: 'Critical', scheduled: '2026-07-10', mechanic: 'Tom Brady', cost: '$280', status: 'Overdue' },
  { id: 'MNT-302', vehicle: 'BUS-0042', type: 'Brake Inspection', priority: 'Warning', scheduled: '2026-07-15', mechanic: 'Lisa Wang', cost: '$450', status: 'Scheduled' },
  { id: 'MNT-303', vehicle: 'BUS-0015', type: 'Tire Rotation', priority: 'Warning', scheduled: '2026-07-18', mechanic: 'Jake Miller', cost: '$320', status: 'Scheduled' },
  { id: 'MNT-304', vehicle: 'BUS-0008', type: 'AC Servicing', priority: 'Active', scheduled: '2026-07-12', mechanic: 'Tom Brady', cost: '$600', status: 'In-Progress' },
  { id: 'MNT-305', vehicle: 'BUS-0031', type: 'Engine Tune-up', priority: 'Active', scheduled: '2026-07-08', mechanic: 'Lisa Wang', cost: '$1,200', status: 'Completed' },
];

const columns = [
  { key: 'id', label: 'Work Order' },
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'type', label: 'Service Type' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'mechanic', label: 'Mechanic' },
  { key: 'cost', label: 'Est. Cost' },
  { key: 'status', label: 'Status' },
];

export default function Maintenance() {
  return (
    <PageShell
      title="Maintenance"
      description="Track work orders, inspections, and preventive maintenance schedules"
      actionLabel="+ New Work Order"
      onAction={() => {}}
    >
      <DataTable columns={columns} data={records} />
    </PageShell>
  );
}
