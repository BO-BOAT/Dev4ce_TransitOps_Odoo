import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, exportCSV, type Trip } from "@/lib/store";
import { Plus, Download, Send, CheckCircle2, XCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Toolbar, SearchBox, FilterSelect, StatusBadge, Th, Td, Modal, Field } from "./_app.vehicles";

export const Route = createFileRoute("/_app/trips")({
  component: TripsPage,
});

function TripsPage() {
  const { trips, vehicles, drivers, createTrip, dispatchTrip, completeTrip, cancelTrip } = useStore();
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState<"all" | Trip["status"]>("all");
  const [show, setShow] = useState(false);
  const [completing, setCompleting] = useState<Trip | null>(null);
  const [actualKm, setActualKm] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [form, setForm] = useState({
    source: "", destination: "", vehicleId: "", driverId: "", cargoKg: 0, plannedKm: 0,
  });

  const availableVehicles = vehicles.filter((v) => v.status === "Available");
  const availableDrivers = drivers.filter(
    (d) => d.status === "Available" && new Date(d.licenseExpiry) > new Date(),
  );

  const filtered = trips
    .filter((t) => statusF === "all" || t.status === statusF)
    .filter((t) => [t.source, t.destination].join(" ").toLowerCase().includes(q.toLowerCase()));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createTrip(form);
    if (!res.ok) return toast.error(res.error!);
    toast.success("Trip drafted");
    setShow(false);
    setForm({ source: "", destination: "", vehicleId: "", driverId: "", cargoKg: 0, plannedKm: 0 });
  };

  const vehicleName = (id: string) => vehicles.find((v) => v.id === id)?.regNumber ?? "—";
  const driverName = (id: string) => drivers.find((d) => d.id === id)?.name ?? "—";

  const selectedVeh = vehicles.find((v) => v.id === form.vehicleId);
  const overCapacity = selectedVeh ? form.cargoKg > selectedVeh.maxLoadKg : false;

  return (
    <div className="space-y-6">
      <PageHeader title="Trip Management" subtitle="Dispatch trips with automatic rule enforcement.">
        <button onClick={() => exportCSV("trips.csv", filtered)} className="btn-ghost"><Download className="size-4" /> Export</button>
        <button onClick={() => setShow(true)} className="btn-primary"><Plus className="size-4" /> New trip</button>
      </PageHeader>

      <Toolbar>
        <SearchBox value={q} onChange={setQ} placeholder="Search source, destination..." />
        <FilterSelect value={statusF} onChange={(v) => setStatusF(v as never)} label="Status" options={["all", "Draft", "Dispatched", "Completed", "Cancelled"]} />
      </Toolbar>

      <div className="grid gap-3">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-display text-base font-semibold">
                    {t.source} <span className="text-muted-foreground">→</span> {t.destination}
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>Vehicle: <span className="font-mono text-foreground">{vehicleName(t.vehicleId)}</span></span>
                    <span>Driver: <span className="text-foreground">{driverName(t.driverId)}</span></span>
                    <span>Cargo: <span className="text-foreground">{t.cargoKg.toLocaleString()} kg</span></span>
                    <span>Planned: <span className="text-foreground">{t.plannedKm} km</span></span>
                    {t.revenue != null && <span>Revenue: <span className="text-success">₹{t.revenue.toLocaleString()}</span></span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={t.status} />
                {t.status === "Draft" && (
                  <>
                    <button onClick={() => { const r = dispatchTrip(t.id); r.ok ? toast.success("Dispatched") : toast.error(r.error!); }} className="btn-primary"><Send className="size-4" /> Dispatch</button>
                    <button onClick={() => { cancelTrip(t.id); toast.success("Cancelled"); }} className="btn-ghost"><XCircle className="size-4" /></button>
                  </>
                )}
                {t.status === "Dispatched" && (
                  <>
                    <button onClick={() => { setCompleting(t); setActualKm(t.plannedKm); setRevenue(0); }} className="btn-primary"><CheckCircle2 className="size-4" /> Complete</button>
                    <button onClick={() => { cancelTrip(t.id); toast.success("Cancelled"); }} className="btn-ghost"><XCircle className="size-4" /></button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No trips yet.</div>}
      </div>

      {show && (
        <Modal onClose={() => setShow(false)} title="New trip">
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <Field label="Source" required><input required value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="input" /></Field>
            <Field label="Destination" required><input required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="input" /></Field>
            <Field label={`Vehicle (${availableVehicles.length} available)`} required>
              <select required value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} className="input">
                <option value="">Select vehicle...</option>
                {availableVehicles.map((v) => <option key={v.id} value={v.id}>{v.regNumber} — {v.model} ({v.maxLoadKg.toLocaleString()}kg)</option>)}
              </select>
            </Field>
            <Field label={`Driver (${availableDrivers.length} eligible)`} required>
              <select required value={form.driverId} onChange={(e) => setForm({ ...form, driverId: e.target.value })} className="input">
                <option value="">Select driver...</option>
                {availableDrivers.map((d) => <option key={d.id} value={d.id}>{d.name} — Cat {d.licenseCategory}</option>)}
              </select>
            </Field>
            <Field label="Cargo weight (kg)" required>
              <input type="number" required value={form.cargoKg} onChange={(e) => setForm({ ...form, cargoKg: +e.target.value })} className="input" />
              {overCapacity && <p className="mt-1 text-xs text-destructive">Exceeds vehicle capacity of {selectedVeh?.maxLoadKg.toLocaleString()} kg</p>}
            </Field>
            <Field label="Planned distance (km)" required><input type="number" required value={form.plannedKm} onChange={(e) => setForm({ ...form, plannedKm: +e.target.value })} className="input" /></Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)} className="btn-ghost">Cancel</button>
              <button type="submit" disabled={overCapacity} className="btn-primary disabled:opacity-50">Create trip</button>
            </div>
          </form>
        </Modal>
      )}

      {completing && (
        <Modal onClose={() => setCompleting(null)} title={`Complete trip: ${completing.source} → ${completing.destination}`}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Actual distance (km)" required><input type="number" value={actualKm} onChange={(e) => setActualKm(+e.target.value)} className="input" /></Field>
            <Field label="Revenue collected (₹)"><input type="number" value={revenue} onChange={(e) => setRevenue(+e.target.value)} className="input" /></Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button onClick={() => setCompleting(null)} className="btn-ghost">Cancel</button>
              <button onClick={() => { completeTrip(completing.id, actualKm, revenue); toast.success("Trip completed"); setCompleting(null); }} className="btn-primary">Mark complete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
