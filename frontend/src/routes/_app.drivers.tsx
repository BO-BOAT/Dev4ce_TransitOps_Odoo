import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, exportCSV, type Driver, type DriverStatus } from "@/lib/store";
import { Plus, Download, Edit3, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Toolbar, SearchBox, FilterSelect, StatusBadge, Th, Td, Modal, Field } from "./_app.vehicles";

export const Route = createFileRoute("/_app/drivers")({
  component: DriversPage,
});

const empty: Omit<Driver, "id"> = {
  name: "", licenseNumber: "", licenseCategory: "C",
  licenseExpiry: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
  contact: "", safetyScore: 85, status: "Available",
};

function DriversPage() {
  const { drivers, addDriver, updateDriver, deleteDriver } = useStore();
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState<"all" | DriverStatus>("all");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<Driver | null>(null);
  const [form, setForm] = useState(empty);

  const filtered = drivers
    .filter((d) => statusF === "all" || d.status === statusF)
    .filter((d) => [d.name, d.licenseNumber, d.contact].join(" ").toLowerCase().includes(q.toLowerCase()));

  const openNew = () => { setEditing(null); setForm(empty); setShow(true); };
  const openEdit = (d: Driver) => { setEditing(d); setForm(d); setShow(true); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) { updateDriver(editing.id, form); toast.success("Driver updated"); }
    else { addDriver(form); toast.success("Driver added"); }
    setShow(false);
  };

  const isExpired = (iso: string) => new Date(iso) < new Date();
  const isExpiringSoon = (iso: string) => {
    const d = (new Date(iso).getTime() - Date.now()) / 86400000;
    return d > 0 && d < 180;
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Driver Management" subtitle="Profiles, licenses, safety scores.">
        <button onClick={() => exportCSV("drivers.csv", filtered)} className="btn-ghost"><Download className="size-4" /> Export</button>
        <button onClick={openNew} className="btn-primary"><Plus className="size-4" /> Add driver</button>
      </PageHeader>

      <Toolbar>
        <SearchBox value={q} onChange={setQ} placeholder="Search name, license, phone..." />
        <FilterSelect value={statusF} onChange={(v) => setStatusF(v as never)} label="Status" options={["all", "Available", "On Trip", "Off Duty", "Suspended"]} />
      </Toolbar>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><Th>Name</Th><Th>License</Th><Th>Cat</Th><Th>Expiry</Th><Th>Contact</Th><Th>Safety</Th><Th>Status</Th><Th /></tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-border hover:bg-muted/30">
                  <Td className="font-medium">{d.name}</Td>
                  <Td className="font-mono text-xs">{d.licenseNumber}</Td>
                  <Td>{d.licenseCategory}</Td>
                  <Td className={isExpired(d.licenseExpiry) ? "text-destructive" : isExpiringSoon(d.licenseExpiry) ? "text-warning" : ""}>
                    <div className="flex items-center gap-1.5">
                      {(isExpired(d.licenseExpiry) || isExpiringSoon(d.licenseExpiry)) && <AlertTriangle className="size-3.5" />}
                      {d.licenseExpiry.slice(0, 10)}
                    </div>
                  </Td>
                  <Td className="text-xs">{d.contact}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${d.safetyScore}%` }} />
                      </div>
                      <span className="font-mono text-xs">{d.safetyScore}</span>
                    </div>
                  </Td>
                  <Td><StatusBadge status={d.status} /></Td>
                  <Td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(d)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Edit3 className="size-4" /></button>
                      <button onClick={() => { if (confirm("Delete driver?")) { deleteDriver(d.id); toast.success("Deleted"); } }} className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="size-4" /></button>
                    </div>
                  </Td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={8} className="p-8 text-center text-sm text-muted-foreground">No drivers match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {show && (
        <Modal onClose={() => setShow(false)} title={editing ? "Edit driver" : "Add driver"}>
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <Field label="Name" required><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></Field>
            <Field label="License Number" required><input required value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} className="input" /></Field>
            <Field label="License Category">
              <select value={form.licenseCategory} onChange={(e) => setForm({ ...form, licenseCategory: e.target.value as Driver["licenseCategory"] })} className="input">
                {["A", "B", "C", "D", "E"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="License Expiry"><input type="date" required value={form.licenseExpiry.slice(0, 10)} onChange={(e) => setForm({ ...form, licenseExpiry: e.target.value })} className="input" /></Field>
            <Field label="Contact"><input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="input" /></Field>
            <Field label="Safety Score"><input type="number" min={0} max={100} required value={form.safetyScore} onChange={(e) => setForm({ ...form, safetyScore: +e.target.value })} className="input" /></Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as DriverStatus })} className="input">
                {["Available", "On Trip", "Off Duty", "Suspended"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)} className="btn-ghost">Cancel</button>
              <button type="submit" className="btn-primary">{editing ? "Save" : "Add driver"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
