import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import { Database, Plus, Trash2, Save, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/mongodb-demo")({
  component: MongoDemoPage,
});

function MongoDemoPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchApi("/vehicles");
      setVehicles(data || []);
    } catch (err) {
      toast.error("Failed to fetch data from MongoDB");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async () => {
    const newVehicle = {
      registration_number: `DEMO-${Math.floor(Math.random() * 10000)}`,
      make: "DemoMake",
      model: "DemoModel",
      year: 2024,
      capacity: 5000,
      mileage: 0,
      depot: "HQ",
    };
    try {
      await fetchApi("/vehicles", {
        method: "POST",
        body: JSON.stringify(newVehicle),
      });
      toast.success("Row added to MongoDB");
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Error adding row");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchApi(`/vehicles/${id}`, { method: "DELETE" });
      toast.success("Row deleted from MongoDB");
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Error deleting row");
    }
  };

  const handleEdit = (v: any) => {
    setEditingId(v._id || v.id);
    setEditForm({
      registration_number: v.registration_number || v.regNumber || "",
      capacity: v.capacity || v.maxLoadKg || 0,
      mileage: v.mileage || v.odometer || 0,
      depot: v.depot || v.region || "",
    });
  };

  const handleSave = async (id: string) => {
    try {
      await fetchApi(`/vehicles/${id}`, {
        method: "PUT",
        body: JSON.stringify(editForm),
      });
      toast.success("Row updated in MongoDB");
      setEditingId(null);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Error updating row");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
            <Database className="size-6 text-primary" />
            MongoDB Operations Sheet
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Directly view and edit raw records in the backend database.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadData} className="flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            <RefreshCw className="size-4" /> Refresh
          </button>
          <button onClick={handleAdd} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 shadow-glow">
            <Plus className="size-4" /> Add Row
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 font-medium">ID (_id)</th>
                <th className="px-4 py-3 font-medium">Registration</th>
                <th className="px-4 py-3 font-medium">Capacity (kg)</th>
                <th className="px-4 py-3 font-medium">Mileage (km)</th>
                <th className="px-4 py-3 font-medium">Depot</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading from MongoDB...</td>
                </tr>
              ) : vehicles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No records found in MongoDB.</td>
                </tr>
              ) : (
                vehicles.map((v) => {
                  const id = v._id || v.id;
                  const isEditing = editingId === id;
                  return (
                    <tr key={id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{id}</td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="text" className="w-full rounded border border-input px-2 py-1 bg-background" value={editForm.registration_number} onChange={e => setEditForm({...editForm, registration_number: e.target.value})} />
                        ) : (
                          v.registration_number || v.regNumber || "-"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="number" className="w-full rounded border border-input px-2 py-1 bg-background" value={editForm.capacity} onChange={e => setEditForm({...editForm, capacity: Number(e.target.value)})} />
                        ) : (
                          v.capacity || v.maxLoadKg || 0
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="number" className="w-full rounded border border-input px-2 py-1 bg-background" value={editForm.mileage} onChange={e => setEditForm({...editForm, mileage: Number(e.target.value)})} />
                        ) : (
                          v.mileage || v.odometer || 0
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="text" className="w-full rounded border border-input px-2 py-1 bg-background" value={editForm.depot} onChange={e => setEditForm({...editForm, depot: e.target.value})} />
                        ) : (
                          v.depot || v.region || "-"
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button onClick={() => handleSave(id)} className="rounded bg-primary/10 p-1.5 text-primary hover:bg-primary/20"><Save className="size-4" /></button>
                              <button onClick={() => setEditingId(null)} className="rounded bg-muted p-1.5 hover:bg-muted/80"><X className="size-4" /></button>
                            </>
                          ) : (
                            <button onClick={() => handleEdit(v)} className="text-xs font-medium text-primary hover:underline">Edit</button>
                          )}
                          <button onClick={() => handleDelete(id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
