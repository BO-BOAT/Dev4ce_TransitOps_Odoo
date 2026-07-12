import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, exportCSV } from "@/lib/store";
import { Plus, Download, CheckCircle2, Wrench } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Toolbar, Modal, Field } from "./_app.vehicles";

export const Route = createFileRoute("/_app/maintenance")({
  component: MaintenancePage,
});

function MaintenancePage() {
  const { maintenance, vehicles, openMaintenance, closeMaintenance } = useStore();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ vehicleId: "", description: "", cost: 0, startDate: new Date().toISOString().slice(0, 10) });

  const rows = maintenance.map((m) => ({
    ...m,
    vehicle: vehicles.find((v) => v.id === m.vehicleId)?.regNumber ?? "—",
    active: !m.endDate,
  }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleId) return toast.error("Choose a vehicle");
    openMaintenance({ ...form, startDate: new Date(form.startDate).toISOString() });
    toast.success("Maintenance opened — vehicle set to In Shop");
    setShow(false);
    setForm({ vehicleId: "", description: "", cost: 0, startDate: new Date().toISOString().slice(0, 10) });
  };

  const eligibleVehicles = vehicles.filter((v) => v.status !== "Retired");

  return (
    <div className="space-y-6">
      <PageHeader title="Maintenance" subtitle="Log service jobs. Opening one flips the vehicle to In Shop automatically.">
        <button onClick={() => exportCSV("maintenance.csv", rows)} className="btn-ghost"><Download className="size-4" /> Export</button>
        <button onClick={() => setShow(true)} className="btn-primary"><Plus className="size-4" /> New record</button>
      </PageHeader>

      <Toolbar>
        <div className="rounded-lg border border-border bg-card px-4 py-2 text-xs">
          <span className="text-muted-foreground">Active jobs: </span>
          <span className="font-mono text-foreground">{rows.filter((r) => r.active).length}</span>
        </div>
      </Toolbar>

      <div className="grid gap-3">
        {rows.map((m) => (
          <div key={m.id} className={`rounded-xl border p-5 transition ${m.active ? "border-warning/40 bg-warning/5" : "border-border bg-card"}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`grid size-10 place-items-center rounded-lg ${m.active ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"}`}>
                  <Wrench className="size-5" />
                </div>
                <div>
                  <div className="font-display font-semibold">{m.vehicle}</div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{m.description}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>Started: {m.startDate.slice(0, 10)}</span>
                    {m.endDate && <span>Closed: {m.endDate.slice(0, 10)}</span>}
                    <span>Cost: <span className="text-foreground">₹{m.cost.toLocaleString()}</span></span>
                  </div>
                </div>
              </div>
              {m.active ? (
                <button onClick={() => { closeMaintenance(m.id); toast.success("Closed — vehicle restored"); }} className="btn-primary"><CheckCircle2 className="size-4" /> Close job</button>
              ) : (
                <span className="rounded-md bg-success/15 px-2 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/30">Closed</span>
              )}
            </div>
          </div>
        ))}
        {!rows.length && <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No maintenance records yet.</div>}
      </div>

      {show && (
        <Modal onClose={() => setShow(false)} title="Open maintenance record">
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <Field label="Vehicle" required>
              <select required value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} className="input">
                <option value="">Select vehicle...</option>
                {eligibleVehicles.map((v) => <option key={v.id} value={v.id}>{v.regNumber} — {v.status}</option>)}
              </select>
            </Field>
            <Field label="Start date"><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input" /></Field>
            <div className="col-span-2"><Field label="Description" required><input required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" placeholder="What's the service?" /></Field></div>
            <Field label="Estimated cost (₹)"><input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: +e.target.value })} className="input" /></Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)} className="btn-ghost">Cancel</button>
              <button type="submit" className="btn-primary">Open record</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
