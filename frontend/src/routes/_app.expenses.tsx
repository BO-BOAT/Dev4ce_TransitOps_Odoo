import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore, exportCSV, type ExpenseKind } from "@/lib/store";
import { Plus, Download, Fuel, Receipt, Search, TrendingUp, Wrench, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Toolbar, SearchBox, FilterSelect, Th, Td, Modal, Field } from "./_app.vehicles";

export const Route = createFileRoute("/_app/expenses")({
  component: ExpensesPage,
});

function ExpensesPage() {
  const { expenses, vehicles, maintenance, trips, addExpense } = useStore();
  const [kindF, setKindF] = useState<"all" | ExpenseKind>("all");
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    vehicleId: "",
    kind: "Fuel" as ExpenseKind,
    amount: 0,
    liters: 0,
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  const rows = useMemo(
    () =>
      expenses
        .filter((e) => kindF === "all" || e.kind === kindF)
        .filter((e) => {
          if (!q) return true;
          const veh = vehicles.find((v) => v.id === e.vehicleId);
          return [veh?.regNumber, veh?.model, e.kind, e.note]
            .join(" ")
            .toLowerCase()
            .includes(q.toLowerCase());
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((e) => ({
          ...e,
          vehicle: vehicles.find((v) => v.id === e.vehicleId)?.regNumber ?? "—",
        })),
    [expenses, vehicles, kindF, q],
  );

  const costByVehicle = useMemo(() => {
    return vehicles.map((v) => {
      const fuelExp = expenses.filter((e) => e.vehicleId === v.id && e.kind === "Fuel");
      const fuel = fuelExp.reduce((s, e) => s + e.amount, 0);
      const liters = fuelExp.reduce((s, e) => s + (e.liters ?? 0), 0);
      const other = expenses.filter((e) => e.vehicleId === v.id && e.kind !== "Fuel").reduce((s, e) => s + e.amount, 0);
      const maint = maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
      const completed = trips.filter((t) => t.vehicleId === v.id && t.status === "Completed");
      const distance = completed.reduce((s, t) => s + (t.actualKm ?? 0), 0);
      const fuelEff = liters > 0 ? +(distance / liters).toFixed(2) : 0;
      return { veh: v.regNumber, fuel, liters, maint, other, total: fuel + maint + other, distance, fuelEff };
    });
  }, [vehicles, expenses, maintenance, trips]);

  const summary = useMemo(() => {
    const totalFuel = expenses.filter((e) => e.kind === "Fuel").reduce((s, e) => s + e.amount, 0);
    const totalOther = expenses.filter((e) => e.kind !== "Fuel").reduce((s, e) => s + e.amount, 0);
    const totalMaint = maintenance.reduce((s, m) => s + m.cost, 0);
    return { totalFuel, totalOther, totalMaint, grandTotal: totalFuel + totalOther + totalMaint };
  }, [expenses, maintenance]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleId) return toast.error("Choose a vehicle");
    addExpense({
      vehicleId: form.vehicleId,
      kind: form.kind,
      amount: form.amount,
      liters: form.kind === "Fuel" ? form.liters : undefined,
      date: new Date(form.date).toISOString(),
      note: form.note,
    });
    toast.success("Expense recorded");
    setShow(false);
    setForm({
      vehicleId: "",
      kind: "Fuel",
      amount: 0,
      liters: 0,
      date: new Date().toISOString().slice(0, 10),
      note: "",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fuel & Expense Management"
        subtitle="Record fuel logs, tolls, and other expenses. Operational cost totals per vehicle update automatically."
      >
        <button onClick={() => exportCSV("expenses.csv", rows)} className="btn-ghost">
          <Download className="size-4" /> Export
        </button>
        <button onClick={() => setShow(true)} className="btn-primary">
          <Plus className="size-4" /> Add expense
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Fuel", value: `₹${summary.totalFuel.toLocaleString()}`, color: "text-primary", icon: Fuel },
          { label: "Other Expenses", value: `₹${summary.totalOther.toLocaleString()}`, color: "text-muted-foreground", icon: Receipt },
          { label: "Maintenance", value: `₹${summary.totalMaint.toLocaleString()}`, color: "text-warning", icon: Wrench },
          { label: "Operational Total", value: `₹${summary.grandTotal.toLocaleString()}`, color: "text-foreground", icon: IndianRupee },
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

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Receipt className="size-4 text-primary" />
              <h3 className="font-display font-semibold">Expense Log</h3>
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {rows.length}
              </span>
            </div>
          </div>

          <div className="border-b border-border px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search vehicle, type, note..."
                  className="w-full rounded-lg border border-border bg-background py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary"
                />
              </div>
              <FilterSelect
                value={kindF}
                onChange={(v) => setKindF(v as never)}
                label="Kind"
                options={["all", "Fuel", "Toll", "Parking", "Other"]}
              />
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <Th>Date</Th>
                  <Th>Vehicle</Th>
                  <Th>Kind</Th>
                  <Th>Amount</Th>
                  <Th>Litres</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.id} className="border-t border-border hover:bg-muted/30">
                    <Td className="text-xs text-muted-foreground">{e.date.slice(0, 10)}</Td>
                    <Td className="font-mono text-xs">{e.vehicle}</Td>
                    <Td>
                      {e.kind === "Fuel" ? (
                        <span className="inline-flex items-center gap-1 text-primary">
                          <Fuel className="size-3" /> Fuel
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{e.kind}</span>
                      )}
                    </Td>
                    <Td className="font-medium">₹{e.amount.toLocaleString()}</Td>
                    <Td>{e.liters ? `${e.liters} L` : "—"}</Td>
                  </tr>
                ))}
                {!rows.length && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-xs text-muted-foreground">
                      No expenses match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              <h3 className="font-display font-semibold">Operational Cost per Vehicle</h3>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Fuel + Maintenance + Other expenses, with fuel efficiency
            </p>
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <Th>Vehicle</Th>
                  <Th>Fuel</Th>
                  <Th>Maint.</Th>
                  <Th>Other</Th>
                  <Th>Fuel Eff.</Th>
                  <Th>Total</Th>
                </tr>
              </thead>
              <tbody>
                {costByVehicle.map((r) => (
                  <tr key={r.veh} className="border-t border-border hover:bg-muted/30">
                    <Td className="font-mono text-xs">{r.veh}</Td>
                    <Td>₹{r.fuel.toLocaleString()}</Td>
                    <Td>₹{r.maint.toLocaleString()}</Td>
                    <Td>₹{r.other.toLocaleString()}</Td>
                    <Td>
                      {r.fuelEff > 0 ? (
                        <span className="text-primary">{r.fuelEff} km/L</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </Td>
                    <Td className="font-semibold text-primary">
                      ₹{r.total.toLocaleString()}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {show && (
        <Modal onClose={() => setShow(false)} title="Record expense">
          <form onSubmit={submit} className="grid grid-cols-2 gap-4">
            <Field label="Vehicle" required>
              <select
                required
                value={form.vehicleId}
                onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
                className="input"
              >
                <option value="">Select vehicle...</option>
                {vehicles
                  .filter((v) => v.status !== "Retired")
                  .map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.regNumber} — {v.model}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label="Expense Type">
              <select
                value={form.kind}
                onChange={(e) => setForm({ ...form, kind: e.target.value as ExpenseKind })}
                className="input"
              >
                {["Fuel", "Toll", "Parking", "Other"].map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </Field>
            <Field label="Amount (₹)" required>
              <input
                type="number"
                required
                min={0}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: +e.target.value })}
                className="input"
              />
            </Field>
            {form.kind === "Fuel" && (
              <Field label="Litres">
                <input
                  type="number"
                  min={0}
                  value={form.liters}
                  onChange={(e) => setForm({ ...form, liters: +e.target.value })}
                  className="input"
                  placeholder="Fuel volume"
                />
              </Field>
            )}
            <Field label="Date">
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input"
              />
            </Field>
            <div className="col-span-2">
              <Field label="Note">
                <input
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="input"
                  placeholder="Optional description..."
                />
              </Field>
            </div>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)} className="btn-ghost">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Record expense
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
