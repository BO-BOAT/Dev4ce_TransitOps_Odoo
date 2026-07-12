import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore, exportCSV } from "@/lib/store";
import {
  Plus,
  Download,
  CheckCircle2,
  Wrench,
  Clock,
  IndianRupee,
  Truck,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Toolbar, SearchBox, FilterSelect, Modal, Field } from "./_app.vehicles";

export const Route = createFileRoute("/_app/maintenance")({
  component: MaintenancePage,
});

function MaintenancePage() {
  const { maintenance, vehicles, openMaintenance, closeMaintenance } = useStore();
  const [show, setShow] = useState(false);
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState<"all" | "Active" | "Closed">("all");
  const [form, setForm] = useState({
    vehicleId: "",
    description: "",
    cost: 0,
    startDate: new Date().toISOString().slice(0, 10),
  });

  const rows = useMemo(
    () =>
      maintenance.map((m) => {
        const veh = vehicles.find((v) => v.id === m.vehicleId);
        return {
          ...m,
          vehicle: veh?.regNumber ?? "—",
          model: veh?.model ?? "",
          active: !m.endDate,
          daysOpen: m.endDate
            ? 0
            : Math.ceil(
                (Date.now() - new Date(m.startDate).getTime()) / 86400000,
              ),
        };
      }),
    [maintenance, vehicles],
  );

  const filtered = rows
    .filter((r) => {
      if (statusF === "Active") return r.active;
      if (statusF === "Closed") return !r.active;
      return true;
    })
    .filter((r) =>
      [r.vehicle, r.model, r.description]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    );

  const stats = useMemo(
    () => ({
      active: rows.filter((r) => r.active).length,
      closed: rows.filter((r) => !r.active).length,
      totalCost: rows.reduce((s, r) => s + r.cost, 0),
      avgCost: rows.length ? Math.round(rows.reduce((s, r) => s + r.cost, 0) / rows.length) : 0,
    }),
    [rows],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleId) return toast.error("Choose a vehicle");
    openMaintenance({ ...form, startDate: new Date(form.startDate).toISOString() });
    toast.success("Maintenance opened — vehicle set to In Shop");
    setShow(false);
    setForm({
      vehicleId: "",
      description: "",
      cost: 0,
      startDate: new Date().toISOString().slice(0, 10),
    });
  };

  const eligibleVehicles = vehicles.filter((v) => v.status !== "Retired");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Log"
        subtitle="Log service jobs. Opening one flips the vehicle to In Shop automatically, removing it from dispatch."
      >
        <button onClick={() => exportCSV("maintenance.csv", rows)} className="btn-ghost">
          <Download className="size-4" /> Export
        </button>
        <button onClick={() => setShow(true)} className="btn-primary">
          <Plus className="size-4" /> New record
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Active Jobs", value: stats.active, color: "text-warning", icon: Wrench },
          { label: "Completed", value: stats.closed, color: "text-success", icon: CheckCircle2 },
          { label: "Total Cost", value: `₹${stats.totalCost.toLocaleString()}`, color: "text-foreground", icon: IndianRupee },
          { label: "Avg. Cost", value: `₹${stats.avgCost.toLocaleString()}`, color: "text-muted-foreground", icon: IndianRupee },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <s.icon className="size-3.5" />
              {s.label}
            </div>
            <div className={`mt-1 font-display text-2xl font-bold ${s.color}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <Toolbar>
        <SearchBox value={q} onChange={setQ} placeholder="Search vehicle, description..." />
        <FilterSelect
          value={statusF}
          onChange={(v) => setStatusF(v as never)}
          label="Status"
          options={["all", "Active", "Closed"]}
        />
      </Toolbar>

      <div className="grid gap-3">
        {filtered.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-5 transition ${
              m.active ? "border-warning/40 bg-warning/5" : "border-border bg-card"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`grid size-10 place-items-center rounded-lg ${
                    m.active ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Wrench className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold">{m.vehicle}</span>
                    <span className="text-xs text-muted-foreground">{m.model}</span>
                    {m.active && (
                      <span className="rounded-md bg-warning/15 px-1.5 py-0.5 text-[10px] font-medium text-warning ring-1 ring-inset ring-warning/30">
                        In Shop
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{m.description}</p>
                  <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      Started: {m.startDate.slice(0, 10)}
                    </span>
                    {m.endDate && <span>Closed: {m.endDate.slice(0, 10)}</span>}
                    {m.active && m.daysOpen > 0 && (
                      <span className="text-warning">
                        {m.daysOpen} day{m.daysOpen !== 1 ? "s" : ""} in shop
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <IndianRupee className="size-3" />
                      <span className="font-medium text-foreground">
                        {m.cost.toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {m.active ? (
                  <button
                    onClick={() => {
                      closeMaintenance(m.id);
                      toast.success("Closed — vehicle restored to Available");
                    }}
                    className="btn-primary"
                  >
                    <CheckCircle2 className="size-4" /> Close job
                  </button>
                ) : (
                  <span className="rounded-md bg-success/15 px-2 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/30">
                    Closed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No maintenance records match your filters.
          </div>
        )}
      </div>

      {show && (
        <Modal onClose={() => setShow(false)} title="Open maintenance record">
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <Field label="Vehicle" required>
              <select
                required
                value={form.vehicleId}
                onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
                className="input"
              >
                <option value="">Select vehicle...</option>
                {eligibleVehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.regNumber} — {v.model} ({v.status})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Start date">
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="input"
              />
            </Field>
            <div className="col-span-2">
              <Field label="Description" required>
                <input
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input"
                  placeholder="e.g. Engine overhaul, brake replacement..."
                />
              </Field>
            </div>
            <Field label="Estimated cost (₹)">
              <input
                type="number"
                min={0}
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: +e.target.value })}
                className="input"
              />
            </Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)} className="btn-ghost">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Open record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
