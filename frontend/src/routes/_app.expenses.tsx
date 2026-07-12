import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore, exportCSV, type ExpenseKind } from "@/lib/store";
import { Plus, Download, Fuel, Receipt } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Toolbar, FilterSelect, Th, Td, Modal, Field } from "./_app.vehicles";

export const Route = createFileRoute("/_app/expenses")({
  component: ExpensesPage,
});

function ExpensesPage() {
  const { expenses, vehicles, maintenance, addExpense } = useStore();
  const [kindF, setKindF] = useState<"all" | ExpenseKind>("all");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ vehicleId: "", kind: "Fuel" as ExpenseKind, amount: 0, liters: 0, date: new Date().toISOString().slice(0, 10), note: "" });

  const rows = expenses
    .filter((e) => kindF === "all" || e.kind === kindF)
    .map((e) => ({ ...e, vehicle: vehicles.find((v) => v.id === e.vehicleId)?.regNumber ?? "—" }));

  const costByVehicle = useMemo(() => {
    return vehicles.map((v) => {
      const fuel = expenses.filter((e) => e.vehicleId === v.id && e.kind === "Fuel").reduce((s, e) => s + e.amount, 0);
      const other = expenses.filter((e) => e.vehicleId === v.id && e.kind !== "Fuel").reduce((s, e) => s + e.amount, 0);
      const maint = maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
      return { veh: v.regNumber, fuel, maint, other, total: fuel + maint + other };
    });
  }, [vehicles, expenses, maintenance]);

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
    setForm({ vehicleId: "", kind: "Fuel", amount: 0, liters: 0, date: new Date().toISOString().slice(0, 10), note: "" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Fuel & Expenses" subtitle="Track fuel, tolls, parking. Operational cost totals per vehicle update automatically.">
        <button onClick={() => exportCSV("expenses.csv", rows)} className="btn-ghost"><Download className="size-4" /> Export</button>
        <button onClick={() => setShow(true)} className="btn-primary"><Plus className="size-4" /> Add expense</button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Receipt className="size-4 text-primary" />
              <h3 className="font-display font-semibold">Recent expenses</h3>
            </div>
            <FilterSelect value={kindF} onChange={(v) => setKindF(v as never)} label="Kind" options={["all", "Fuel", "Toll", "Parking", "Other"]} />
          </div>
          
          <div className="max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><Th>Date</Th><Th>Vehicle</Th><Th>Kind</Th><Th>Amount</Th><Th>Litres</Th></tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.id} className="border-t border-border">
                    <Td className="text-xs text-muted-foreground">{e.date.slice(0, 10)}</Td>
                    <Td className="font-mono text-xs">{e.vehicle}</Td>
                    <Td>{e.kind === "Fuel" ? <span className="inline-flex items-center gap-1 text-primary"><Fuel className="size-3" /> Fuel</span> : e.kind}</Td>
                    <Td>₹{e.amount.toLocaleString()}</Td>
                    <Td>{e.liters ? `${e.liters} L` : "—"}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="font-display font-semibold">Total operational cost per vehicle</h3>
            <p className="text-xs text-muted-foreground">Fuel + Maintenance + Other</p>
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><Th>Vehicle</Th><Th>Fuel</Th><Th>Maint.</Th><Th>Other</Th><Th>Total</Th></tr>
              </thead>
              <tbody>
                {costByVehicle.map((r) => (
                  <tr key={r.veh} className="border-t border-border">
                    <Td className="font-mono text-xs">{r.veh}</Td>
                    <Td>₹{r.fuel.toLocaleString()}</Td>
                    <Td>₹{r.maint.toLocaleString()}</Td>
                    <Td>₹{r.other.toLocaleString()}</Td>
                    <Td className="font-semibold text-primary">₹{r.total.toLocaleString()}</Td>
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
              <select required value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} className="input">
                <option value="">Select vehicle...</option>
                {vehicles.map((v) => <option key={v.id} value={v.id}>{v.regNumber}</option>)}
              </select>
            </Field>
            <Field label="Kind">
              <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as ExpenseKind })} className="input">
                {["Fuel", "Toll", "Parking", "Other"].map((k) => <option key={k}>{k}</option>)}
              </select>
            </Field>
            <Field label="Amount (₹)" required><input type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: +e.target.value })} className="input" /></Field>
            {form.kind === "Fuel" && <Field label="Litres"><input type="number" value={form.liters} onChange={(e) => setForm({ ...form, liters: +e.target.value })} className="input" /></Field>}
            <Field label="Date"><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input" /></Field>
            <div className="col-span-2"><Field label="Note"><input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="input" /></Field></div>
            <div className="col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)} className="btn-ghost">Cancel</button>
              <button type="submit" className="btn-primary">Record</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
