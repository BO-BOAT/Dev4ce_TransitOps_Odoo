import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, exportCSV, type Vehicle, type VehicleStatus } from "@/lib/store";
import { Plus, Search, Download, Trash2, Edit3 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/vehicles")({
  component: VehiclesPage,
});

const empty: Omit<Vehicle, "id"> = {
  regNumber: "", model: "", type: "Truck", maxLoadKg: 10000, odometer: 0,
  acquisitionCost: 0, status: "Available", region: "North",
};

function VehiclesPage() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useStore();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<keyof Vehicle>("regNumber");
  const [statusFilter, setStatusFilter] = useState<"all" | VehicleStatus>("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState(empty);

  const filtered = vehicles
    .filter((v) => (statusFilter === "all" || v.status === statusFilter))
    .filter((v) => [v.regNumber, v.model, v.region].join(" ").toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort])));

  const openNew = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (v: Vehicle) => { setEditing(v); setForm(v); setShowForm(true); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const dup = vehicles.some((x) => x.id !== editing.id && x.regNumber.toLowerCase() === form.regNumber.toLowerCase());
      if (dup) return toast.error("Registration number must be unique");
      updateVehicle(editing.id, form);
      toast.success("Vehicle updated");
    } else {
      const res = addVehicle(form);
      if (!res.ok) return toast.error(res.error!);
      toast.success("Vehicle added");
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Vehicle Registry" subtitle="Master list of vehicles with unique registration numbers.">
        <button onClick={() => exportCSV("vehicles.csv", filtered)} className="btn-ghost"><Download className="size-4" /> Export</button>
        <button onClick={openNew} className="btn-primary"><Plus className="size-4" /> Add vehicle</button>
      </PageHeader>

      <Toolbar>
        <SearchBox value={q} onChange={setQ} placeholder="Search by reg, model, region..." />
        <FilterSelect value={statusFilter} onChange={(v) => setStatusFilter(v as never)} label="Status"
          options={["all", "Available", "On Trip", "In Shop", "Retired"]} />
        <FilterSelect value={sort} onChange={(v) => setSort(v as keyof Vehicle)} label="Sort"
          options={["regNumber", "model", "odometer", "acquisitionCost"]} />
      </Toolbar>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <Th>Reg No.</Th><Th>Model</Th><Th>Type</Th><Th>Region</Th>
                <Th>Max Load</Th><Th>Odometer</Th><Th>Cost</Th><Th>Status</Th><Th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-t border-border hover:bg-muted/30">
                  <Td className="font-mono text-xs">{v.regNumber}</Td>
                  <Td className="font-medium">{v.model}</Td>
                  <Td>{v.type}</Td>
                  <Td>{v.region}</Td>
                  <Td>{v.maxLoadKg.toLocaleString()} kg</Td>
                  <Td>{v.odometer.toLocaleString()} km</Td>
                  <Td>₹{v.acquisitionCost.toLocaleString()}</Td>
                  <Td><StatusBadge status={v.status} /></Td>
                  <Td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(v)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Edit3 className="size-4" /></button>
                      <button onClick={() => { if (confirm("Delete vehicle?")) { deleteVehicle(v.id); toast.success("Deleted"); } }} className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                    </div>
                  </Td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={9} className="p-8 text-center text-sm text-muted-foreground">No vehicles match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)} title={editing ? "Edit vehicle" : "Add vehicle"}>
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <Field label="Registration No." required><input required value={form.regNumber} onChange={(e) => setForm({ ...form, regNumber: e.target.value })} className="input" /></Field>
            <Field label="Model"><input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="input" /></Field>
            <Field label="Type">
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Vehicle["type"] })} className="input">
                {["Truck", "Van", "Tanker", "Trailer", "Pickup"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Region">
              <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="input">
                {["North", "South", "East", "West"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Max Load (kg)"><input type="number" required value={form.maxLoadKg} onChange={(e) => setForm({ ...form, maxLoadKg: +e.target.value })} className="input" /></Field>
            <Field label="Odometer (km)"><input type="number" required value={form.odometer} onChange={(e) => setForm({ ...form, odometer: +e.target.value })} className="input" /></Field>
            <Field label="Acquisition Cost (₹)"><input type="number" required value={form.acquisitionCost} onChange={(e) => setForm({ ...form, acquisitionCost: +e.target.value })} className="input" /></Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as VehicleStatus })} className="input">
                {["Available", "On Trip", "In Shop", "Retired"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              <button type="submit" className="btn-primary">{editing ? "Save" : "Add vehicle"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* --- Reusable UI primitives (kept inline for prototype tightness) --- */

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none ring-ring/20 transition focus:border-primary focus:ring-4" />
    </div>
  );
}

export function FilterSelect({ value, onChange, label, options }: { value: string; onChange: (v: string) => void; label: string; options: readonly string[] }) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm outline-none">
        {options.map((o) => <option key={o} value={o} className="bg-background">{o === "all" ? "All" : o}</option>)}
      </select>
    </label>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Available: "bg-success/15 text-success ring-success/30",
    "On Trip": "bg-primary/15 text-primary ring-primary/30",
    "In Shop": "bg-warning/15 text-warning ring-warning/30",
    Retired: "bg-muted text-muted-foreground ring-border",
    "Off Duty": "bg-muted text-muted-foreground ring-border",
    Suspended: "bg-destructive/15 text-destructive ring-destructive/30",
    Draft: "bg-muted text-muted-foreground ring-border",
    Dispatched: "bg-primary/15 text-primary ring-primary/30",
    Completed: "bg-success/15 text-success ring-success/30",
    Cancelled: "bg-destructive/15 text-destructive ring-destructive/30",
  };
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${map[status] ?? ""}`}>{status}</span>;
}

export function Th({ children }: { children?: React.ReactNode }) {
  return <th className="px-4 py-3 text-left font-medium">{children}</th>;
}
export function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-elevated" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 font-display text-xl font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}{required && " *"}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
