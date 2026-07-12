import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore, exportCSV, type Trip } from "@/lib/store";
import {
  Plus,
  Download,
  Send,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  Truck,
  User,
  Package,
  Ruler,
  IndianRupee,
  CircleDot,
} from "lucide-react";
import { toast } from "sonner";
import {
  PageHeader,
  Toolbar,
  SearchBox,
  FilterSelect,
  StatusBadge,
  Modal,
  Field,
} from "./_app.vehicles";

export const Route = createFileRoute("/_app/trips")({
  component: TripsPage,
});

const lifecycleSteps = ["Draft", "Dispatched", "Completed"] as const;

function LifecycleBar({ status }: { status: Trip["status"] }) {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-destructive">
        <XCircle className="size-3.5" />
        <span className="font-medium">Cancelled</span>
      </div>
    );
  }
  const idx = lifecycleSteps.indexOf(status as "Draft" | "Dispatched" | "Completed");
  return (
    <div className="flex items-center gap-1">
      {lifecycleSteps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
              i <= idx
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <CircleDot className="size-3" />
            {step}
          </div>
          {i < lifecycleSteps.length - 1 && (
            <div
              className={`h-px w-4 ${
                i < idx ? "bg-primary/50" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function TripsPage() {
  const {
    trips,
    vehicles,
    drivers,
    createTrip,
    dispatchTrip,
    completeTrip,
    cancelTrip,
  } = useStore();
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState<"all" | Trip["status"]>("all");
  const [show, setShow] = useState(false);
  const [completing, setCompleting] = useState<Trip | null>(null);
  const [actualKm, setActualKm] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [dispatchConfirm, setDispatchConfirm] = useState<Trip | null>(null);

  const [form, setForm] = useState({
    source: "",
    destination: "",
    vehicleId: "",
    driverId: "",
    cargoKg: 0,
    plannedKm: 0,
  });

  const availableVehicles = vehicles.filter((v) => v.status === "Available");
  const availableDrivers = drivers.filter(
    (d) =>
      d.status === "Available" && new Date(d.licenseExpiry) > new Date(),
  );

  const filtered = trips
    .filter((t) => statusF === "all" || t.status === statusF)
    .filter((t) =>
      [t.source, t.destination, driverName(t.driverId), vehicleName(t.vehicleId)]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    );

  const stats = useMemo(
    () => ({
      total: trips.length,
      draft: trips.filter((t) => t.status === "Draft").length,
      active: trips.filter((t) => t.status === "Dispatched").length,
      completed: trips.filter((t) => t.status === "Completed").length,
      cancelled: trips.filter((t) => t.status === "Cancelled").length,
    }),
    [trips],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createTrip(form);
    if (!res.ok) return toast.error(res.error!);
    toast.success("Trip drafted");
    setShow(false);
    setForm({
      source: "",
      destination: "",
      vehicleId: "",
      driverId: "",
      cargoKg: 0,
      plannedKm: 0,
    });
  };

  const vehicleName = (id: string) =>
    vehicles.find((v) => v.id === id)?.regNumber ?? "—";
  const driverName = (id: string) =>
    drivers.find((d) => d.id === id)?.name ?? "—";
  const vehicleModel = (id: string) =>
    vehicles.find((v) => v.id === id)?.model ?? "";

  const selectedVeh = vehicles.find((v) => v.id === form.vehicleId);
  const overCapacity = selectedVeh
    ? form.cargoKg > selectedVeh.maxLoadKg
    : false;

  const doDispatch = (trip: Trip) => {
    const r = dispatchTrip(trip.id);
    if (r.ok) {
      toast.success("Trip dispatched — vehicle and driver assigned");
    } else {
      toast.error(r.error!);
    }
    setDispatchConfirm(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trip Management"
        subtitle="Dispatch trips with automatic rule enforcement."
      >
        <button
          onClick={() => exportCSV("trips.csv", filtered)}
          className="btn-ghost"
        >
          <Download className="size-4" /> Export
        </button>
        <button onClick={() => setShow(true)} className="btn-primary">
          <Plus className="size-4" /> New trip
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Total", value: stats.total, color: "text-foreground" },
          { label: "Draft", value: stats.draft, color: "text-muted-foreground" },
          { label: "Active", value: stats.active, color: "text-primary" },
          { label: "Completed", value: stats.completed, color: "text-success" },
          { label: "Cancelled", value: stats.cancelled, color: "text-destructive" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className={`mt-1 font-display text-2xl font-bold ${s.color}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <Toolbar>
        <SearchBox
          value={q}
          onChange={setQ}
          placeholder="Search source, destination, driver, vehicle..."
        />
        <FilterSelect
          value={statusF}
          onChange={(v) => setStatusF(v as never)}
          label="Status"
          options={["all", "Draft", "Dispatched", "Completed", "Cancelled"]}
        />
      </Toolbar>

      <div className="grid gap-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/40"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-display text-base font-semibold">
                    {t.source}{" "}
                    <span className="text-muted-foreground">→</span>{" "}
                    {t.destination}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Truck className="size-3" />
                      <span className="font-mono text-foreground">
                        {vehicleName(t.vehicleId)}
                      </span>
                      <span className="text-muted-foreground/60">
                        {vehicleModel(t.vehicleId)}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="size-3" />
                      <span className="text-foreground">
                        {driverName(t.driverId)}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Package className="size-3" />
                      <span className="text-foreground">
                        {t.cargoKg.toLocaleString()} kg
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Ruler className="size-3" />
                      <span className="text-foreground">
                        {t.plannedKm.toLocaleString()} km
                      </span>
                    </span>
                    {t.revenue != null && (
                      <span className="inline-flex items-center gap-1">
                        <IndianRupee className="size-3" />
                        <span className="font-medium text-success">
                          {t.revenue.toLocaleString()}
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <LifecycleBar status={t.status} />
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground/60">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      Created {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                    {t.completedAt && (
                      <span>
                        Completed{" "}
                        {new Date(t.completedAt).toLocaleDateString()}
                      </span>
                    )}
                    {t.actualKm != null && (
                      <span>Actual: {t.actualKm.toLocaleString()} km</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={t.status} />
                {t.status === "Draft" && (
                  <>
                    <button
                      onClick={() => {
                        setActualKm(t.plannedKm);
                        setDispatchConfirm(t);
                      }}
                      className="btn-primary"
                    >
                      <Send className="size-4" /> Dispatch
                    </button>
                    <button
                      onClick={() => {
                        cancelTrip(t.id);
                        toast.success("Trip cancelled");
                      }}
                      className="btn-ghost"
                      title="Cancel trip"
                    >
                      <XCircle className="size-4" />
                    </button>
                  </>
                )}
                {t.status === "Dispatched" && (
                  <>
                    <button
                      onClick={() => {
                        setCompleting(t);
                        setActualKm(t.plannedKm);
                        setRevenue(0);
                      }}
                      className="btn-primary"
                    >
                      <CheckCircle2 className="size-4" /> Complete
                    </button>
                    <button
                      onClick={() => {
                        cancelTrip(t.id);
                        toast.success("Trip cancelled");
                      }}
                      className="btn-ghost"
                      title="Cancel trip"
                    >
                      <XCircle className="size-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No trips match your filters.
          </div>
        )}
      </div>

      {show && (
        <Modal onClose={() => setShow(false)} title="Create new trip">
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <Field label="Source" required>
              <input
                required
                value={form.source}
                onChange={(e) =>
                  setForm({ ...form, source: e.target.value })
                }
                className="input"
                placeholder="e.g. Mumbai"
              />
            </Field>
            <Field label="Destination" required>
              <input
                required
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
                className="input"
                placeholder="e.g. Pune"
              />
            </Field>
            <Field
              label={`Vehicle (${availableVehicles.length} available)`}
              required
            >
              <select
                required
                value={form.vehicleId}
                onChange={(e) =>
                  setForm({ ...form, vehicleId: e.target.value })
                }
                className="input"
              >
                <option value="">Select vehicle...</option>
                {availableVehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.regNumber} — {v.model} ({v.maxLoadKg.toLocaleString()}{" "}
                    kg capacity)
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label={`Driver (${availableDrivers.length} eligible)`}
              required
            >
              <select
                required
                value={form.driverId}
                onChange={(e) =>
                  setForm({ ...form, driverId: e.target.value })
                }
                className="input"
              >
                <option value="">Select driver...</option>
                {availableDrivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — Cat {d.licenseCategory} (Score:{" "}
                    {d.safetyScore})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Cargo weight (kg)" required>
              <input
                type="number"
                required
                min={0}
                value={form.cargoKg}
                onChange={(e) =>
                  setForm({ ...form, cargoKg: +e.target.value })
                }
                className="input"
              />
              {overCapacity && (
                <p className="mt-1 text-xs text-destructive">
                  Exceeds vehicle capacity of{" "}
                  {selectedVeh?.maxLoadKg.toLocaleString()} kg
                </p>
              )}
              {selectedVeh && !overCapacity && form.cargoKg > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {Math.round((form.cargoKg / selectedVeh.maxLoadKg) * 100)}%
                  of capacity used
                </p>
              )}
            </Field>
            <Field label="Planned distance (km)" required>
              <input
                type="number"
                required
                min={1}
                value={form.plannedKm}
                onChange={(e) =>
                  setForm({ ...form, plannedKm: +e.target.value })
                }
                className="input"
              />
            </Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={overCapacity}
                className="btn-primary disabled:opacity-50"
              >
                Create trip
              </button>
            </div>
          </form>
        </Modal>
      )}

      {dispatchConfirm && (
        <Modal
          onClose={() => setDispatchConfirm(null)}
          title={`Dispatch: ${dispatchConfirm.source} → ${dispatchConfirm.destination}`}
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              <p>
                Vehicle{" "}
                <span className="font-mono font-medium">
                  {vehicleName(dispatchConfirm.vehicleId)}
                </span>{" "}
                and driver{" "}
                <span className="font-medium">
                  {driverName(dispatchConfirm.driverId)}
                </span>{" "}
                will be set to <strong>On Trip</strong> and removed from the
                available pool.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDispatchConfirm(null)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => doDispatch(dispatchConfirm)}
                className="btn-primary"
              >
                <Send className="size-4" /> Confirm dispatch
              </button>
            </div>
          </div>
        </Modal>
      )}

      {completing && (
        <Modal
          onClose={() => setCompleting(null)}
          title={`Complete trip: ${completing.source} → ${completing.destination}`}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Actual distance (km)" required>
              <input
                type="number"
                min={0}
                value={actualKm}
                onChange={(e) => setActualKm(+e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Revenue collected (₹)">
              <input
                type="number"
                min={0}
                value={revenue}
                onChange={(e) => setRevenue(+e.target.value)}
                className="input"
              />
            </Field>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCompleting(null)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  completeTrip(completing.id, actualKm, revenue);
                  toast.success("Trip completed — vehicle and driver released");
                  setCompleting(null);
                }}
                className="btn-primary"
              >
                Mark complete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
