import React, { createContext, useContext, useState, useMemo } from "react";
import {
  LayoutGrid, Truck, Users, Repeat, Wrench, FileBarChart2, BarChart3,
  Sun, Moon, LogOut, Plus, Search, Pencil, Trash2, Download, MapPin,
  AlertTriangle, Send, CheckCircle2, XCircle, X,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

/* ============================================================
   1. STATE MANAGEMENT — FleetContext
   Holds all in-memory data + mutation functions + business rules
   ============================================================ */

const FleetContext = createContext(null);
const useFleet = () => useContext(FleetContext);

const initialVehicles = [
  { id: "v1", regNumber: "DL-03-EF-9012", model: "Mahindra Blazo X", type: "Tanker", region: "North", maxLoad: 20000, odometer: 67800, acquisitionCost: 3600000, status: "In Shop" },
  { id: "v2", regNumber: "GJ-05-JK-7890", model: "Force Traveller", type: "Van", region: "West", maxLoad: 1800, odometer: 28900, acquisitionCost: 1450000, status: "Available" },
  { id: "v3", regNumber: "KA-01-AB-1234", model: "Tata Prima 4928", type: "Truck", region: "South", maxLoad: 25000, odometer: 84300, acquisitionCost: 4200000, status: "Available" },
  { id: "v4", regNumber: "MH-12-CD-5678", model: "Ashok Leyland Boss", type: "Truck", region: "West", maxLoad: 16000, odometer: 121500, acquisitionCost: 2900000, status: "On Trip" },
  { id: "v5", regNumber: "TN-22-GH-3456", model: "Eicher Pro 6055", type: "Trailer", region: "South", maxLoad: 35000, odometer: 45200, acquisitionCost: 5100000, status: "Available" },
  { id: "v6", regNumber: "UP-14-LM-2345", model: "Isuzu D-Max", type: "Pickup", region: "North", maxLoad: 1200, odometer: 96700, acquisitionCost: 1100000, status: "Retired" },
];

const initialDrivers = [
  { id: "d1", name: "Rajesh Kumar", licenseNumber: "DL-9823741", category: "E", expiryDate: "2027-06-14", contact: "+91 98204 33421", safetyScore: 92, status: "Available" },
  { id: "d2", name: "Suresh Patel", licenseNumber: "DL-4471289", category: "D", expiryDate: "2026-02-08", contact: "+91 90112 88291", safetyScore: 88, status: "On Trip" },
  { id: "d3", name: "Meera Iyer", licenseNumber: "DL-6612388", category: "C", expiryDate: "2028-11-30", contact: "+91 99887 22110", safetyScore: 95, status: "Available" },
  { id: "d4", name: "Vikram Singh", licenseNumber: "DL-2298471", category: "E", expiryDate: "2025-08-20", contact: "+91 89123 99801", safetyScore: 74, status: "Off Duty" },
  { id: "d5", name: "Anita Reddy", licenseNumber: "DL-8814487", category: "D", expiryDate: "2026-05-11", contact: "+91 90887 12233", safetyScore: 81, status: "Suspended" },
];

const initialTrips = [
  { id: "t1", source: "Mumbai", destination: "Pune", vehicleId: "v4", driverId: "d2", cargoWeight: 14000, plannedDistance: 150, revenue: 0, status: "Dispatched" },
  { id: "t2", source: "Bangalore", destination: "Chennai", vehicleId: "v3", driverId: "d1", cargoWeight: 22000, plannedDistance: 350, revenue: 85000, status: "Completed" },
  { id: "t3", source: "Delhi", destination: "Jaipur", vehicleId: "v5", driverId: "d3", cargoWeight: 30000, plannedDistance: 280, revenue: 0, status: "Draft" },
];

const initialMaintenance = [
  { id: "m1", vehicleId: "v1", description: "Engine overhaul & brake replacement", startDate: "2026-07-12", cost: 68000, isActive: true },
];

const initialExpenses = [
  { id: "e1", date: "2026-07-12", vehicleId: "v3", kind: "Fuel", amount: 28500, liters: 320 },
  { id: "e2", date: "2026-07-12", vehicleId: "v3", kind: "Toll", amount: 2400, liters: null },
  { id: "e3", date: "2026-07-12", vehicleId: "v4", kind: "Fuel", amount: 12200, liters: 140 },
  { id: "e4", date: "2026-07-12", vehicleId: "v5", kind: "Fuel", amount: 21000, liters: 240 },
];

let idCounter = 100;
const nextId = (prefix) => `${prefix}${idCounter++}`;

function FleetProvider({ children }) {
  const [user, setUser] = useState(null); // { name, role }
  const [isDark, setIsDark] = useState(true);
  const [page, setPage] = useState("dashboard");

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [trips, setTrips] = useState(initialTrips);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [expenses, setExpenses] = useState(initialExpenses);

  const login = (email, password, role) => setUser({ name: "Alex Admin", email, role });
  const logout = () => setUser(null);

  const isLicenseExpired = (d) => new Date(d.expiryDate) < new Date("2026-07-12");

  // ---- Vehicles ----
  const addVehicle = (v) => {
    if (vehicles.some((x) => x.regNumber.toLowerCase() === v.regNumber.toLowerCase())) {
      return { ok: false, error: "Registration number already exists." };
    }
    setVehicles((prev) => [...prev, { ...v, id: nextId("v"), status: v.status || "Available" }]);
    return { ok: true };
  };
  const updateVehicle = (id, patch) => setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  const deleteVehicle = (id) => setVehicles((prev) => prev.filter((v) => v.id !== id));

  // ---- Drivers ----
  const addDriver = (d) => {
    setDrivers((prev) => [...prev, { ...d, id: nextId("d"), status: d.status || "Available" }]);
    return { ok: true };
  };
  const updateDriver = (id, patch) => setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  const deleteDriver = (id) => setDrivers((prev) => prev.filter((d) => d.id !== id));

  // ---- Eligibility pools ----
  const dispatchEligibleVehicles = useMemo(
    () => vehicles.filter((v) => v.status === "Available"),
    [vehicles]
  );
  const dispatchEligibleDrivers = useMemo(
    () => drivers.filter((d) => d.status === "Available" && !isLicenseExpired(d)),
    [drivers]
  );

  // ---- Trips ----
  const addTrip = (t) => {
    setTrips((prev) => [...prev, { ...t, id: nextId("t"), status: "Draft", revenue: t.revenue || 0 }]);
    return { ok: true };
  };

  const dispatchTrip = (tripId) => {
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return { ok: false, error: "Trip not found." };
    const vehicle = vehicles.find((v) => v.id === trip.vehicleId);
    const driver = drivers.find((d) => d.id === trip.driverId);
    if (!vehicle || vehicle.status !== "Available") return { ok: false, error: "Vehicle is not available." };
    if (!driver || driver.status !== "Available" || isLicenseExpired(driver)) return { ok: false, error: "Driver is not available." };
    if (trip.cargoWeight > vehicle.maxLoad) return { ok: false, error: "Cargo weight exceeds vehicle's max load." };
    setTrips((prev) => prev.map((t) => (t.id === tripId ? { ...t, status: "Dispatched" } : t)));
    updateVehicle(vehicle.id, { status: "On Trip" });
    updateDriver(driver.id, { status: "On Trip" });
    return { ok: true };
  };

  const completeTrip = (tripId, revenue) => {
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return { ok: false, error: "Trip not found." };
    setTrips((prev) => prev.map((t) => (t.id === tripId ? { ...t, status: "Completed", revenue: revenue ?? t.revenue } : t)));
    updateVehicle(trip.vehicleId, { status: "Available" });
    updateDriver(trip.driverId, { status: "Available" });
    return { ok: true };
  };

  const cancelTrip = (tripId) => {
    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return { ok: false, error: "Trip not found." };
    if (trip.status === "Dispatched") {
      updateVehicle(trip.vehicleId, { status: "Available" });
      updateDriver(trip.driverId, { status: "Available" });
    }
    setTrips((prev) => prev.map((t) => (t.id === tripId ? { ...t, status: "Cancelled" } : t)));
    return { ok: true };
  };

  // ---- Maintenance ----
  const openMaintenance = (rec) => {
    setMaintenance((prev) => [...prev, { ...rec, id: nextId("m"), isActive: true }]);
    updateVehicle(rec.vehicleId, { status: "In Shop" });
    return { ok: true };
  };
  const closeMaintenance = (recId) => {
    const rec = maintenance.find((m) => m.id === recId);
    if (!rec) return { ok: false, error: "Record not found." };
    setMaintenance((prev) => prev.map((m) => (m.id === recId ? { ...m, isActive: false } : m)));
    const vehicle = vehicles.find((v) => v.id === rec.vehicleId);
    if (vehicle && vehicle.status !== "Retired") updateVehicle(vehicle.id, { status: "Available" });
    return { ok: true };
  };

  // ---- Expenses ----
  const addExpense = (exp) => {
    setExpenses((prev) => [...prev, { ...exp, id: nextId("e") }]);
    return { ok: true };
  };

  const value = {
    user, login, logout,
    isDark, setIsDark,
    page, setPage,
    vehicles, addVehicle, updateVehicle, deleteVehicle,
    drivers, addDriver, updateDriver, deleteDriver,
    trips, addTrip, dispatchTrip, completeTrip, cancelTrip,
    maintenance, openMaintenance, closeMaintenance,
    expenses, addExpense,
    dispatchEligibleVehicles, dispatchEligibleDrivers,
    isLicenseExpired,
  };

  return <FleetContext.Provider value={value}>{children}</FleetContext.Provider>;
}

/* ============================================================
   SHARED UI HELPERS — theme tokens, badges, cards, modal shell
   ============================================================ */

const T = (isDark) => ({
  bg: isDark ? "bg-[#0b0f17]" : "bg-slate-50",
  panel: isDark ? "bg-[#0e1420]" : "bg-white",
  border: isDark ? "border-white/5" : "border-slate-200",
  text: isDark ? "text-slate-100" : "text-slate-900",
  sub: isDark ? "text-slate-400" : "text-slate-500",
  hover: isDark ? "hover:bg-white/5" : "hover:bg-slate-100",
});

const STATUS_STYLES = {
  Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "On Trip": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  "In Shop": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Retired: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  "Off Duty": "bg-slate-500/15 text-slate-400 border-slate-500/30",
  Suspended: "bg-red-500/15 text-red-400 border-red-500/30",
  Draft: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  Dispatched: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${STATUS_STYLES[status] || "bg-slate-500/15 text-slate-400 border-slate-500/30"}`}>
      {status}
    </span>
  );
}

function Card({ isDark, className = "", children }) {
  const t = T(isDark);
  return <div className={`${t.panel} border ${t.border} rounded-xl ${className}`}>{children}</div>;
}

function PrimaryButton({ children, onClick, icon: Icon, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#04121a] text-sm font-semibold transition-colors ${className}`}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, icon: Icon, isDark }) {
  const t = T(isDark);
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border ${t.border} ${t.text} text-sm font-medium ${t.hover} transition-colors`}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

function Modal({ isDark, title, onClose, children, wide }) {
  const t = T(isDark);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className={`${t.panel} border ${t.border} rounded-xl w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[85vh] overflow-y-auto`}>
        <div className={`flex items-center justify-between px-5 py-4 border-b ${t.border}`}>
          <h3 className={`font-semibold ${t.text}`}>{title}</h3>
          <button onClick={onClose} className={`p-1 rounded-md ${t.hover} ${t.sub}`}>
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs text-slate-400 mb-1">{label}</span>
      {children}
    </label>
  );
}

const inputCls = (isDark) =>
  `w-full px-3 py-2 rounded-lg text-sm outline-none border ${
    isDark ? "bg-[#0b0f17] border-white/10 text-slate-100 placeholder:text-slate-500" : "bg-white border-slate-300 text-slate-900"
  } focus:border-cyan-500`;

function ErrorText({ children }) {
  if (!children) return null;
  return <p className="text-xs text-red-400 mt-2">{children}</p>;
}

/* ============================================================
   2. SIDEBAR NAVIGATION
   ============================================================ */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "vehicles", label: "Vehicles", icon: Truck },
  { key: "drivers", label: "Drivers", icon: Users },
  { key: "trips", label: "Trips", icon: Repeat },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "expenses", label: "Fuel & Expenses", icon: FileBarChart2 },
  { key: "reports", label: "Reports", icon: BarChart3 },
];

function Sidebar() {
  const { page, setPage, user, logout, isDark } = useFleet();
  const t = T(isDark);
  return (
    <aside className={`w-[212px] shrink-0 ${t.panel} border-r ${t.border} flex flex-col justify-between py-5`}>
      <div>
        <div className="flex items-center gap-2 px-5 pb-6">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Truck size={16} />
          </div>
          <span className={`font-bold tracking-tight ${t.text}`}>Fleetwave</span>
        </div>
        <nav className="px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = page === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? "bg-cyan-500 text-[#04121a] font-semibold" : `${t.sub} ${t.hover}`
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="px-3">
        <div className={`flex items-center gap-2 px-3 py-2 mb-2 rounded-lg`}>
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
            AA
          </div>
          <div className="leading-tight">
            <div className={`text-sm font-medium ${t.text}`}>{user?.name || "Alex Admin"}</div>
            <div className={`text-xs ${t.sub}`}>{user?.role || "Admin"}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${t.sub} ${t.hover}`}
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );
}

function TopBar({ title }) {
  const { isDark, setIsDark } = useFleet();
  const t = T(isDark);
  return (
    <div className={`flex items-center justify-between px-8 pt-5 pb-2`}>
      <span className={`text-xs tracking-widest font-medium ${t.sub}`}>{title}</span>
      <button
        onClick={() => setIsDark((d) => !d)}
        className={`p-2 rounded-lg ${t.hover} ${t.sub}`}
        title="Toggle theme"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
}

/* ============================================================
   3. LOGIN PAGE (Auth & mock RBAC)
   ============================================================ */

function LoginPage() {
  const { login } = useFleet();
  const [email, setEmail] = useState("alex@fleetwave.io");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter both email and password.");
      return;
    }
    login(email, password, role);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0f17]">
      <div className="w-full max-w-sm bg-[#0e1420] border border-white/5 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Truck size={17} />
          </div>
          <span className="font-bold text-lg text-slate-100 tracking-tight">Fleetwave</span>
        </div>
        <h1 className="text-xl font-semibold text-slate-100 mb-1">Welcome back</h1>
        <p className="text-sm text-slate-400 mb-6">Sign in to manage your fleet operations.</p>
        <form onSubmit={submit}>
          <Field label="Email">
            <input className={inputCls(true)} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          </Field>
          <Field label="Password">
            <input type="password" className={inputCls(true)} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </Field>
          <Field label="Role">
            <div className="grid grid-cols-2 gap-2">
              {["Admin", "Dispatcher"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                    role === r ? "bg-cyan-500 text-[#04121a] border-cyan-500" : "border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </Field>
          <ErrorText>{error}</ErrorText>
          <button type="submit" className="w-full mt-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#04121a] font-semibold text-sm">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   4. OPERATIONS DASHBOARD (View 2)
   ============================================================ */

const DONUT_COLORS = { Available: "#10b981", "On Trip": "#06b6d4", "In Shop": "#f59e0b", Retired: "#64748b" };

function KpiCard({ isDark, label, value, icon: Icon, iconBg, iconColor }) {
  const t = T(isDark);
  return (
    <Card isDark={isDark} className="p-5">
      <div className="flex items-start justify-between mb-6">
        <span className={`text-[11px] tracking-wider font-medium ${t.sub}`}>{label}</span>
        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${iconBg}`}>
          <Icon size={14} className={iconColor} />
        </div>
      </div>
      <div className={`text-3xl font-bold ${t.text}`}>{value}</div>
    </Card>
  );
}

function Dashboard() {
  const { isDark, vehicles, drivers, trips, expenses, maintenance, isLicenseExpired } = useFleet();
  const t = T(isDark);
  const [typeF, setTypeF] = useState("All");
  const [statusF, setStatusF] = useState("All");
  const [regionF, setRegionF] = useState("All");

  const filteredVehicles = vehicles.filter(
    (v) => (typeF === "All" || v.type === typeF) && (statusF === "All" || v.status === statusF) && (regionF === "All" || v.region === regionF)
  );

  const activeVehicles = filteredVehicles.filter((v) => v.status === "On Trip").length;
  const availableVehicles = filteredVehicles.filter((v) => v.status === "Available").length;
  const inMaintenance = filteredVehicles.filter((v) => v.status === "In Shop").length;
  const activeTrips = trips.filter((t) => t.status === "Dispatched").length;
  const pendingTrips = trips.filter((t) => t.status === "Draft").length;
  const driversOnDuty = drivers.filter((d) => d.status === "Available" || d.status === "On Trip").length;
  const fleetUtilization = filteredVehicles.length ? Math.round((activeVehicles / filteredVehicles.length) * 100) : 0;
  const licenseAlerts = drivers.filter((d) => isLicenseExpired(d) || new Date(d.expiryDate) < new Date("2027-01-12")).length;

  const spendData = vehicles.map((v) => {
    const spend = expenses.filter((e) => e.vehicleId === v.id).reduce((s, e) => s + e.amount, 0)
      + maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
    return { name: v.regNumber, value: spend };
  });

  const statusCounts = ["Available", "On Trip", "In Shop", "Retired"].map((s) => ({
    name: s, value: vehicles.filter((v) => v.status === s).length,
  }));

  const alertDrivers = drivers
    .filter((d) => new Date(d.expiryDate) < new Date("2027-01-12"))
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  const regions = [...new Set(vehicles.map((v) => v.region))];
  const types = [...new Set(vehicles.map((v) => v.type))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className={`text-2xl font-bold ${t.text}`}>Operations Dashboard</h1>
          <p className={`text-sm ${t.sub}`}>Live snapshot across your fleet, drivers and trips.</p>
        </div>
        <div className="flex items-center gap-2">
          <FilterSelect isDark={isDark} label="Type" value={typeF} onChange={setTypeF} options={["All", ...types]} />
          <FilterSelect isDark={isDark} label="Status" value={statusF} onChange={setStatusF} options={["All", "Available", "On Trip", "In Shop", "Retired"]} />
          <FilterSelect isDark={isDark} label="Region" value={regionF} onChange={setRegionF} options={["All", ...regions]} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <KpiCard isDark={isDark} label="ACTIVE VEHICLES" value={activeVehicles} icon={Truck} iconBg="bg-cyan-500/15" iconColor="text-cyan-400" />
        <KpiCard isDark={isDark} label="AVAILABLE VEHICLES" value={availableVehicles} icon={Truck} iconBg="bg-emerald-500/15" iconColor="text-emerald-400" />
        <KpiCard isDark={isDark} label="IN MAINTENANCE" value={inMaintenance} icon={Wrench} iconBg="bg-amber-500/15" iconColor="text-amber-400" />
        <KpiCard isDark={isDark} label="ACTIVE TRIPS" value={activeTrips} icon={Repeat} iconBg="bg-cyan-500/15" iconColor="text-cyan-400" />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard isDark={isDark} label="PENDING TRIPS" value={pendingTrips} icon={Repeat} iconBg="bg-cyan-500/15" iconColor="text-cyan-400" />
        <KpiCard isDark={isDark} label="DRIVERS ON DUTY" value={driversOnDuty} icon={Users} iconBg="bg-cyan-500/15" iconColor="text-cyan-400" />
        <KpiCard isDark={isDark} label="FLEET UTILIZATION" value={`${fleetUtilization}%`} icon={FileBarChart2} iconBg="bg-emerald-500/15" iconColor="text-emerald-400" />
        <KpiCard isDark={isDark} label="LICENSE ALERTS" value={licenseAlerts} icon={AlertTriangle} iconBg="bg-amber-500/15" iconColor="text-amber-400" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card isDark={isDark} className="col-span-2 p-5">
          <h3 className={`font-semibold ${t.text}`}>Operational spend by vehicle</h3>
          <p className={`text-xs ${t.sub} mb-4`}>Fuel + maintenance + other expenses (₹)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "#0e1420", border: "1px solid #1e293b", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card isDark={isDark} className="p-5">
          <h3 className={`font-semibold ${t.text}`}>Fleet status</h3>
          <p className={`text-xs ${t.sub} mb-2`}>Distribution across states</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2}>
                {statusCounts.map((s) => (
                  <Cell key={s.name} fill={DONUT_COLORS[s.name]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {statusCounts.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: DONUT_COLORS[s.name] }} />
                <span className={t.sub}>{s.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card isDark={isDark} className="p-5 border-amber-500/30 bg-amber-500/[0.04]">
        <div className="flex items-center gap-2 mb-4 text-amber-400 font-semibold text-sm">
          <AlertTriangle size={16} /> Licenses expiring within 6 months
        </div>
        <div className="grid grid-cols-2 gap-3">
          {alertDrivers.map((d) => (
            <div key={d.id} className={`flex items-center justify-between px-4 py-3 rounded-lg ${isDark ? "bg-white/5" : "bg-slate-100"}`}>
              <span className={`text-sm font-medium ${t.text}`}>{d.name}</span>
              <span className="text-xs text-amber-400">exp {d.expiryDate}</span>
            </div>
          ))}
          {alertDrivers.length === 0 && <span className={`text-sm ${t.sub}`}>No upcoming expirations.</span>}
        </div>
      </Card>
    </div>
  );
}

function FilterSelect({ isDark, label, value, onChange, options }) {
  const t = T(isDark);
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${t.border} ${t.panel}`}>
      <span className={`text-xs ${t.sub}`}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-transparent text-sm font-medium outline-none ${t.text}`}
      >
        {options.map((o) => (
          <option key={o} value={o} className="text-black">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ============================================================
   5. VEHICLE REGISTRY (View 3)
   ============================================================ */

function VehicleRegistry() {
  const { isDark, vehicles, deleteVehicle } = useFleet();
  const t = T(isDark);
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState("All");
  const [sort, setSort] = useState("regNumber");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const rows = vehicles
    .filter((v) => statusF === "All" || v.status === statusF)
    .filter((v) => `${v.regNumber} ${v.model} ${v.region}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a[sort] > b[sort] ? 1 : -1));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${t.text}`}>Vehicle Registry</h1>
          <p className={`text-sm ${t.sub}`}>Master list of vehicles with unique registration numbers.</p>
        </div>
        <div className="flex items-center gap-2">
          <GhostButton isDark={isDark} icon={Download}>Export</GhostButton>
          <PrimaryButton icon={Plus} onClick={() => setShowAdd(true)}>Add vehicle</PrimaryButton>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border ${t.border} ${t.panel}`}>
          <Search size={15} className={t.sub} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reg, model, region..."
            className={`bg-transparent outline-none text-sm w-full ${t.text}`}
          />
        </div>
        <FilterSelect isDark={isDark} label="Status" value={statusF} onChange={setStatusF} options={["All", "Available", "On Trip", "In Shop", "Retired"]} />
        <FilterSelect isDark={isDark} label="Sort" value={sort} onChange={setSort} options={["regNumber", "model", "odometer", "acquisitionCost"]} />
      </div>

      <Card isDark={isDark}>
        <table className="w-full text-sm">
          <thead>
            <tr className={`text-left border-b ${t.border} ${t.sub} text-xs`}>
              <th className="px-5 py-3 font-medium">REG NO.</th>
              <th className="px-5 py-3 font-medium">MODEL</th>
              <th className="px-5 py-3 font-medium">TYPE</th>
              <th className="px-5 py-3 font-medium">REGION</th>
              <th className="px-5 py-3 font-medium">MAX LOAD</th>
              <th className="px-5 py-3 font-medium">ODOMETER</th>
              <th className="px-5 py-3 font-medium">COST</th>
              <th className="px-5 py-3 font-medium">STATUS</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.id} className={`border-b ${t.border} last:border-0`}>
                <td className={`px-5 py-3 font-mono text-cyan-400`}>{v.regNumber}</td>
                <td className={`px-5 py-3 font-medium ${t.text}`}>{v.model}</td>
                <td className={`px-5 py-3 ${t.sub}`}>{v.type}</td>
                <td className={`px-5 py-3 ${t.sub}`}>{v.region}</td>
                <td className={`px-5 py-3 ${t.text}`}>{v.maxLoad.toLocaleString()} kg</td>
                <td className={`px-5 py-3 ${t.text}`}>{v.odometer.toLocaleString()} km</td>
                <td className={`px-5 py-3 ${t.text}`}>₹{v.acquisitionCost.toLocaleString()}</td>
                <td className="px-5 py-3"><StatusBadge status={v.status} /></td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => setEditing(v)} className={`p-1.5 rounded-md ${t.hover} ${t.sub}`}><Pencil size={14} /></button>
                    <button onClick={() => deleteVehicle(v.id)} className={`p-1.5 rounded-md ${t.hover} text-red-400`}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {(showAdd || editing) && (
        <VehicleFormModal
          isDark={isDark}
          vehicle={editing}
          onClose={() => { setShowAdd(false); setEditing(null); }}
        />
      )}
    </div>
  );
}

function VehicleFormModal({ isDark, vehicle, onClose }) {
  const { addVehicle, updateVehicle } = useFleet();
  const [form, setForm] = useState(
    vehicle || { regNumber: "", model: "", type: "Truck", region: "North", maxLoad: "", odometer: "", acquisitionCost: "", status: "Available" }
  );
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const submit = () => {
    if (!form.regNumber || !form.model || !form.maxLoad) {
      setError("Please fill in registration number, model and max load.");
      return;
    }
    const payload = { ...form, maxLoad: Number(form.maxLoad), odometer: Number(form.odometer) || 0, acquisitionCost: Number(form.acquisitionCost) || 0 };
    if (vehicle) {
      updateVehicle(vehicle.id, payload);
      onClose();
    } else {
      const res = addVehicle(payload);
      if (!res.ok) setError(res.error);
      else onClose();
    }
  };

  return (
    <Modal isDark={isDark} title={vehicle ? "Edit vehicle" : "Add vehicle"} onClose={onClose} wide>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Registration number">
          <input className={inputCls(isDark)} value={form.regNumber} onChange={(e) => setForm({ ...form, regNumber: e.target.value })} placeholder="KA-01-AB-1234" />
        </Field>
        <Field label="Model">
          <input className={inputCls(isDark)} value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Tata Prima 4928" />
        </Field>
        <Field label="Type">
          <select className={inputCls(isDark)} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {["Truck", "Van", "Tanker", "Trailer", "Pickup"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Region">
          <select className={inputCls(isDark)} value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}>
            {["North", "South", "East", "West"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Max load (kg)">
          <input type="number" className={inputCls(isDark)} value={form.maxLoad} onChange={(e) => setForm({ ...form, maxLoad: e.target.value })} />
        </Field>
        <Field label="Odometer (km)">
          <input type="number" className={inputCls(isDark)} value={form.odometer} onChange={(e) => setForm({ ...form, odometer: e.target.value })} />
        </Field>
        <Field label="Acquisition cost (₹)">
          <input type="number" className={inputCls(isDark)} value={form.acquisitionCost} onChange={(e) => setForm({ ...form, acquisitionCost: e.target.value })} />
        </Field>
        <Field label="Status">
          <select className={inputCls(isDark)} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {["Available", "On Trip", "In Shop", "Retired"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Document upload">
        <label className={`flex flex-col items-center justify-center border border-dashed ${isDark ? "border-white/15" : "border-slate-300"} rounded-lg py-6 cursor-pointer text-xs ${T(isDark).sub}`}>
          {fileName || "Drop RC / insurance PDF here, or click to browse"}
          <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
        </label>
      </Field>
      <ErrorText>{error}</ErrorText>
      <div className="flex justify-end gap-2 mt-2">
        <GhostButton isDark={isDark} onClick={onClose}>Cancel</GhostButton>
        <PrimaryButton onClick={submit}>{vehicle ? "Save changes" : "Add vehicle"}</PrimaryButton>
      </div>
    </Modal>
  );
}

/* ============================================================
   6. DRIVER MANAGEMENT (View 4)
   ============================================================ */

function SafetyBar({ score }) {
  const color = score >= 90 ? "bg-emerald-500" : score >= 75 ? "bg-cyan-500" : "bg-amber-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-slate-300">{score}</span>
    </div>
  );
}

function DriverManagement() {
  const { isDark, drivers, deleteDriver, isLicenseExpired } = useFleet();
  const t = T(isDark);
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const rows = drivers
    .filter((d) => statusF === "All" || d.status === statusF)
    .filter((d) => `${d.name} ${d.licenseNumber} ${d.contact}`.toLowerCase().includes(search.toLowerCase()));

  const nearExpiry = (d) => {
    const diffDays = (new Date(d.expiryDate) - new Date("2026-07-12")) / (1000 * 60 * 60 * 24);
    return diffDays < 180;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${t.text}`}>Driver Management</h1>
          <p className={`text-sm ${t.sub}`}>Profiles, licenses, safety scores.</p>
        </div>
        <div className="flex items-center gap-2">
          <GhostButton isDark={isDark} icon={Download}>Export</GhostButton>
          <PrimaryButton icon={Plus} onClick={() => setShowAdd(true)}>Add driver</PrimaryButton>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border ${t.border} ${t.panel}`}>
          <Search size={15} className={t.sub} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, license, phone..."
            className={`bg-transparent outline-none text-sm w-full ${t.text}`}
          />
        </div>
        <FilterSelect isDark={isDark} label="Status" value={statusF} onChange={setStatusF} options={["All", "Available", "On Trip", "Off Duty", "Suspended"]} />
      </div>

      <Card isDark={isDark}>
        <table className="w-full text-sm">
          <thead>
            <tr className={`text-left border-b ${t.border} ${t.sub} text-xs`}>
              <th className="px-5 py-3 font-medium">NAME</th>
              <th className="px-5 py-3 font-medium">LICENSE</th>
              <th className="px-5 py-3 font-medium">CAT</th>
              <th className="px-5 py-3 font-medium">EXPIRY</th>
              <th className="px-5 py-3 font-medium">CONTACT</th>
              <th className="px-5 py-3 font-medium">SAFETY</th>
              <th className="px-5 py-3 font-medium">STATUS</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.id} className={`border-b ${t.border} last:border-0`}>
                <td className={`px-5 py-3 font-medium ${t.text}`}>{d.name}</td>
                <td className={`px-5 py-3 font-mono ${t.sub}`}>{d.licenseNumber}</td>
                <td className={`px-5 py-3 ${t.text}`}>{d.category}</td>
                <td className="px-5 py-3">
                  <span className={`flex items-center gap-1 ${nearExpiry(d) ? "text-red-400" : t.text}`}>
                    {nearExpiry(d) && <AlertTriangle size={12} />} {d.expiryDate}
                  </span>
                </td>
                <td className={`px-5 py-3 ${t.sub}`}>{d.contact}</td>
                <td className="px-5 py-3"><SafetyBar score={d.safetyScore} /></td>
                <td className="px-5 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => setEditing(d)} className={`p-1.5 rounded-md ${t.hover} ${t.sub}`}><Pencil size={14} /></button>
                    <button onClick={() => deleteDriver(d.id)} className={`p-1.5 rounded-md ${t.hover} text-red-400`}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {(showAdd || editing) && (
        <DriverFormModal isDark={isDark} driver={editing} onClose={() => { setShowAdd(false); setEditing(null); }} />
      )}
    </div>
  );
}

function DriverFormModal({ isDark, driver, onClose }) {
  const { addDriver, updateDriver } = useFleet();
  const [form, setForm] = useState(
    driver || { name: "", licenseNumber: "", category: "C", expiryDate: "", contact: "", safetyScore: 80, status: "Available" }
  );
  const [error, setError] = useState("");

  const submit = () => {
    if (!form.name || !form.licenseNumber || !form.expiryDate) {
      setError("Please fill in name, license number and expiry date.");
      return;
    }
    const payload = { ...form, safetyScore: Number(form.safetyScore) };
    if (driver) updateDriver(driver.id, payload);
    else addDriver(payload);
    onClose();
  };

  return (
    <Modal isDark={isDark} title={driver ? "Edit driver" : "Add driver"} onClose={onClose} wide>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Full name">
          <input className={inputCls(isDark)} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="License number">
          <input className={inputCls(isDark)} value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} />
        </Field>
        <Field label="Category">
          <select className={inputCls(isDark)} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {["C", "D", "E"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Expiry date">
          <input type="date" className={inputCls(isDark)} value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
        </Field>
        <Field label="Contact">
          <input className={inputCls(isDark)} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="+91 90000 00000" />
        </Field>
        <Field label="Safety score">
          <input type="number" min="0" max="100" className={inputCls(isDark)} value={form.safetyScore} onChange={(e) => setForm({ ...form, safetyScore: e.target.value })} />
        </Field>
        <Field label="Status">
          <select className={inputCls(isDark)} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {["Available", "On Trip", "Off Duty", "Suspended"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <ErrorText>{error}</ErrorText>
      <div className="flex justify-end gap-2 mt-2">
        <GhostButton isDark={isDark} onClick={onClose}>Cancel</GhostButton>
        <PrimaryButton onClick={submit}>{driver ? "Save changes" : "Add driver"}</PrimaryButton>
      </div>
    </Modal>
  );
}

/* ============================================================
   7. TRIP MANAGEMENT (View 5)
   ============================================================ */

function TripManagement() {
  const { isDark, trips, vehicles, drivers, dispatchTrip, completeTrip, cancelTrip } = useFleet();
  const t = T(isDark);
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState("All");
  const [showNew, setShowNew] = useState(false);
  const [banner, setBanner] = useState("");

  const regOf = (id) => vehicles.find((v) => v.id === id)?.regNumber || "—";
  const nameOf = (id) => drivers.find((d) => d.id === id)?.name || "—";

  const rows = trips
    .filter((tr) => statusF === "All" || tr.status === statusF)
    .filter((tr) => `${tr.source} ${tr.destination}`.toLowerCase().includes(search.toLowerCase()));

  const runAction = (fn, id) => {
    const res = fn(id);
    if (!res.ok) setBanner(res.error);
    else setBanner("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${t.text}`}>Trip Management</h1>
          <p className={`text-sm ${t.sub}`}>Dispatch trips with automatic rule enforcement.</p>
        </div>
        <div className="flex items-center gap-2">
          <GhostButton isDark={isDark} icon={Download}>Export</GhostButton>
          <PrimaryButton icon={Plus} onClick={() => setShowNew(true)}>New trip</PrimaryButton>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border ${t.border} ${t.panel}`}>
          <Search size={15} className={t.sub} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search source, destination..."
            className={`bg-transparent outline-none text-sm w-full ${t.text}`}
          />
        </div>
        <FilterSelect isDark={isDark} label="Status" value={statusF} onChange={setStatusF} options={["All", "Draft", "Dispatched", "Completed", "Cancelled"]} />
      </div>

      {banner && (
        <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <AlertTriangle size={14} /> {banner}
        </div>
      )}

      <div className="space-y-3">
        {rows.map((tr) => (
          <Card isDark={isDark} key={tr.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <div>
                <div className={`font-semibold ${t.text}`}>{tr.source} → {tr.destination}</div>
                <div className={`text-xs ${t.sub} flex flex-wrap gap-x-3 gap-y-0.5 mt-1`}>
                  <span>Vehicle: <span className="text-cyan-400 font-mono">{regOf(tr.vehicleId)}</span></span>
                  <span>Driver: <span className={t.text}>{nameOf(tr.driverId)}</span></span>
                  <span>Cargo: <span className={t.text}>{tr.cargoWeight.toLocaleString()} kg</span></span>
                  <span>Planned: <span className={t.text}>{tr.plannedDistance} km</span></span>
                  {tr.status === "Completed" && <span>Revenue: <span className="text-emerald-400">₹{tr.revenue.toLocaleString()}</span></span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={tr.status} />
              {tr.status === "Draft" && (
                <>
                  <PrimaryButton icon={Send} onClick={() => runAction(dispatchTrip, tr.id)}>Dispatch</PrimaryButton>
                  <button onClick={() => runAction(cancelTrip, tr.id)} className={`p-2 rounded-lg ${t.hover} text-red-400`}><XCircle size={16} /></button>
                </>
              )}
              {tr.status === "Dispatched" && (
                <>
                  <PrimaryButton icon={CheckCircle2} onClick={() => {
                    const revenue = Number(window.prompt("Enter trip revenue (₹)", "0")) || 0;
                    runAction((id) => completeTrip(id, revenue), tr.id);
                  }}>Complete</PrimaryButton>
                  <button onClick={() => runAction(cancelTrip, tr.id)} className={`p-2 rounded-lg ${t.hover} text-red-400`}><XCircle size={16} /></button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {showNew && <NewTripModal isDark={isDark} onClose={() => setShowNew(false)} />}
    </div>
  );
}

function NewTripModal({ isDark, onClose }) {
  const { addTrip, dispatchEligibleVehicles, dispatchEligibleDrivers } = useFleet();
  const [form, setForm] = useState({ source: "", destination: "", vehicleId: "", driverId: "", cargoWeight: "", plannedDistance: "", revenue: "" });
  const [error, setError] = useState("");

  const selectedVehicle = dispatchEligibleVehicles.find((v) => v.id === form.vehicleId);

  const submit = () => {
    if (!form.source || !form.destination || !form.vehicleId || !form.driverId || !form.cargoWeight) {
      setError("Please fill in all required fields.");
      return;
    }
    if (selectedVehicle && Number(form.cargoWeight) > selectedVehicle.maxLoad) {
      setError(`Cargo weight exceeds ${selectedVehicle.regNumber}'s max load of ${selectedVehicle.maxLoad.toLocaleString()} kg.`);
      return;
    }
    addTrip({
      source: form.source, destination: form.destination, vehicleId: form.vehicleId, driverId: form.driverId,
      cargoWeight: Number(form.cargoWeight), plannedDistance: Number(form.plannedDistance) || 0, revenue: Number(form.revenue) || 0,
    });
    onClose();
  };

  return (
    <Modal isDark={isDark} title="New trip" onClose={onClose} wide>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Source"><input className={inputCls(isDark)} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} /></Field>
        <Field label="Destination"><input className={inputCls(isDark)} value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} /></Field>
        <Field label="Vehicle (available only)">
          <select className={inputCls(isDark)} value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}>
            <option value="">Select vehicle</option>
            {dispatchEligibleVehicles.map((v) => <option key={v.id} value={v.id}>{v.regNumber} — {v.model}</option>)}
          </select>
        </Field>
        <Field label="Driver (available, valid license only)">
          <select className={inputCls(isDark)} value={form.driverId} onChange={(e) => setForm({ ...form, driverId: e.target.value })}>
            <option value="">Select driver</option>
            {dispatchEligibleDrivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </Field>
        <Field label={`Cargo weight (kg)${selectedVehicle ? ` — max ${selectedVehicle.maxLoad.toLocaleString()}` : ""}`}>
          <input type="number" className={inputCls(isDark)} value={form.cargoWeight} onChange={(e) => setForm({ ...form, cargoWeight: e.target.value })} />
        </Field>
        <Field label="Planned distance (km)">
          <input type="number" className={inputCls(isDark)} value={form.plannedDistance} onChange={(e) => setForm({ ...form, plannedDistance: e.target.value })} />
        </Field>
      </div>
      <ErrorText>{error}</ErrorText>
      <div className="flex justify-end gap-2 mt-2">
        <GhostButton isDark={isDark} onClick={onClose}>Cancel</GhostButton>
        <PrimaryButton onClick={submit}>Save as draft</PrimaryButton>
      </div>
    </Modal>
  );
}

/* ============================================================
   8. MAINTENANCE LOG (View 6)
   ============================================================ */

function MaintenanceLog() {
  const { isDark, maintenance, vehicles, closeMaintenance } = useFleet();
  const t = T(isDark);
  const [showNew, setShowNew] = useState(false);
  const activeJobs = maintenance.filter((m) => m.isActive);
  const regOf = (id) => vehicles.find((v) => v.id === id)?.regNumber || "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${t.text}`}>Maintenance</h1>
          <p className={`text-sm ${t.sub}`}>Log service jobs. Opening one flips the vehicle to In Shop automatically.</p>
        </div>
        <div className="flex items-center gap-2">
          <GhostButton isDark={isDark} icon={Download}>Export</GhostButton>
          <PrimaryButton icon={Plus} onClick={() => setShowNew(true)}>New record</PrimaryButton>
        </div>
      </div>

      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${t.border} ${t.panel} mb-4 text-sm`}>
        <span className={t.sub}>Active jobs:</span>
        <span className={`font-semibold ${t.text}`}>{activeJobs.length}</span>
      </div>

      <div className="space-y-3">
        {activeJobs.map((m) => (
          <Card isDark={isDark} key={m.id} className="p-4 flex items-center justify-between border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Wrench size={16} />
              </div>
              <div>
                <div className={`font-semibold ${t.text}`}>{regOf(m.vehicleId)}</div>
                <div className={`text-sm ${t.sub}`}>{m.description}</div>
                <div className={`text-xs ${t.sub} mt-1`}>Started: {m.startDate} &nbsp; Cost: <span className="text-amber-400 font-medium">₹{m.cost.toLocaleString()}</span></div>
              </div>
            </div>
            <PrimaryButton icon={CheckCircle2} onClick={() => closeMaintenance(m.id)}>Close job</PrimaryButton>
          </Card>
        ))}
        {activeJobs.length === 0 && <p className={`text-sm ${t.sub}`}>No active maintenance jobs.</p>}
      </div>

      {showNew && <NewMaintenanceModal isDark={isDark} onClose={() => setShowNew(false)} />}
    </div>
  );
}

function NewMaintenanceModal({ isDark, onClose }) {
  const { openMaintenance, vehicles } = useFleet();
  const eligible = vehicles.filter((v) => v.status !== "Retired" && v.status !== "In Shop");
  const [form, setForm] = useState({ vehicleId: "", description: "", startDate: "2026-07-12", cost: "" });
  const [error, setError] = useState("");

  const submit = () => {
    if (!form.vehicleId || !form.description) {
      setError("Please select a vehicle and enter a description.");
      return;
    }
    openMaintenance({ vehicleId: form.vehicleId, description: form.description, startDate: form.startDate, cost: Number(form.cost) || 0 });
    onClose();
  };

  return (
    <Modal isDark={isDark} title="New maintenance record" onClose={onClose}>
      <Field label="Vehicle (excludes Retired / already In Shop)">
        <select className={inputCls(isDark)} value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}>
          <option value="">Select vehicle</option>
          {eligible.map((v) => <option key={v.id} value={v.id}>{v.regNumber} — {v.model}</option>)}
        </select>
      </Field>
      <Field label="Description">
        <input className={inputCls(isDark)} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Engine overhaul & brake replacement" />
      </Field>
      <Field label="Start date">
        <input type="date" className={inputCls(isDark)} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
      </Field>
      <Field label="Cost (₹)">
        <input type="number" className={inputCls(isDark)} value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
      </Field>
      <ErrorText>{error}</ErrorText>
      <div className="flex justify-end gap-2 mt-2">
        <GhostButton isDark={isDark} onClick={onClose}>Cancel</GhostButton>
        <PrimaryButton onClick={submit}>Open job</PrimaryButton>
      </div>
    </Modal>
  );
}

/* ============================================================
   9. FUEL & EXPENSE MANAGEMENT (View 7)
   ============================================================ */

function FuelExpenses() {
  const { isDark, expenses, vehicles, maintenance, addExpense } = useFleet();
  const t = T(isDark);
  const [kindF, setKindF] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const regOf = (id) => vehicles.find((v) => v.id === id)?.regNumber || "—";

  const rows = expenses.filter((e) => kindF === "All" || e.kind === kindF).sort((a, b) => new Date(b.date) - new Date(a.date));

  const summary = vehicles.map((v) => {
    const fuel = expenses.filter((e) => e.vehicleId === v.id && e.kind === "Fuel").reduce((s, e) => s + e.amount, 0);
    const other = expenses.filter((e) => e.vehicleId === v.id && (e.kind === "Toll" || e.kind === "Other")).reduce((s, e) => s + e.amount, 0);
    const maint = maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
    return { reg: v.regNumber, fuel, maint, other, total: fuel + maint + other };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${t.text}`}>Fuel & Expenses</h1>
          <p className={`text-sm ${t.sub}`}>Track fuel, tolls, parking. Operational cost totals per vehicle update automatically.</p>
        </div>
        <div className="flex items-center gap-2">
          <GhostButton isDark={isDark} icon={Download}>Export</GhostButton>
          <PrimaryButton icon={Plus} onClick={() => setShowAdd(true)}>Add expense</PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card isDark={isDark} className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-semibold flex items-center gap-2 ${t.text}`}><FileBarChart2 size={15} className="text-cyan-400" /> Recent expenses</h3>
            <FilterSelect isDark={isDark} label="Kind" value={kindF} onChange={setKindF} options={["All", "Fuel", "Toll", "Maintenance", "Other"]} />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left border-b ${t.border} ${t.sub} text-xs`}>
                <th className="py-2 font-medium">DATE</th>
                <th className="py-2 font-medium">VEHICLE</th>
                <th className="py-2 font-medium">KIND</th>
                <th className="py-2 font-medium">AMOUNT</th>
                <th className="py-2 font-medium">LITRES</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className={`border-b ${t.border} last:border-0`}>
                  <td className={`py-2.5 ${t.sub}`}>{e.date}</td>
                  <td className="py-2.5 font-mono text-cyan-400">{regOf(e.vehicleId)}</td>
                  <td className={`py-2.5 ${t.text}`}>{e.kind}</td>
                  <td className={`py-2.5 ${t.text}`}>₹{e.amount.toLocaleString()}</td>
                  <td className={`py-2.5 ${t.sub}`}>{e.liters ? `${e.liters} L` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card isDark={isDark} className="p-5">
          <h3 className={`font-semibold ${t.text}`}>Total operational cost per vehicle</h3>
          <p className={`text-xs ${t.sub} mb-3`}>Fuel + Maintenance + Other</p>
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left border-b ${t.border} ${t.sub} text-xs`}>
                <th className="py-2 font-medium">VEHICLE</th>
                <th className="py-2 font-medium">FUEL</th>
                <th className="py-2 font-medium">MAINT.</th>
                <th className="py-2 font-medium">OTHER</th>
                <th className="py-2 font-medium">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((s) => (
                <tr key={s.reg} className={`border-b ${t.border} last:border-0`}>
                  <td className="py-2.5 font-mono text-cyan-400">{s.reg}</td>
                  <td className={`py-2.5 ${t.text}`}>₹{s.fuel.toLocaleString()}</td>
                  <td className={`py-2.5 ${t.text}`}>₹{s.maint.toLocaleString()}</td>
                  <td className={`py-2.5 ${t.text}`}>₹{s.other.toLocaleString()}</td>
                  <td className="py-2.5 text-cyan-400 font-semibold">₹{s.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {showAdd && <NewExpenseModal isDark={isDark} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

function NewExpenseModal({ isDark, onClose }) {
  const { addExpense, vehicles } = useFleet();
  const [form, setForm] = useState({ date: "2026-07-12", vehicleId: "", kind: "Fuel", amount: "", liters: "" });
  const [error, setError] = useState("");

  const submit = () => {
    if (!form.vehicleId || !form.amount) {
      setError("Please select a vehicle and enter an amount.");
      return;
    }
    addExpense({ date: form.date, vehicleId: form.vehicleId, kind: form.kind, amount: Number(form.amount), liters: form.kind === "Fuel" ? Number(form.liters) || 0 : null });
    onClose();
  };

  return (
    <Modal isDark={isDark} title="Add expense" onClose={onClose}>
      <Field label="Vehicle">
        <select className={inputCls(isDark)} value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}>
          <option value="">Select vehicle</option>
          {vehicles.map((v) => <option key={v.id} value={v.id}>{v.regNumber}</option>)}
        </select>
      </Field>
      <Field label="Kind">
        <select className={inputCls(isDark)} value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })}>
          {["Fuel", "Toll", "Maintenance", "Other"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </Field>
      <Field label="Date">
        <input type="date" className={inputCls(isDark)} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      </Field>
      <Field label="Amount (₹)">
        <input type="number" className={inputCls(isDark)} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      </Field>
      {form.kind === "Fuel" && (
        <Field label="Litres">
          <input type="number" className={inputCls(isDark)} value={form.liters} onChange={(e) => setForm({ ...form, liters: e.target.value })} />
        </Field>
      )}
      <ErrorText>{error}</ErrorText>
      <div className="flex justify-end gap-2 mt-2">
        <GhostButton isDark={isDark} onClick={onClose}>Cancel</GhostButton>
        <PrimaryButton onClick={submit}>Add expense</PrimaryButton>
      </div>
    </Modal>
  );
}

/* ============================================================
   10. REPORTS & ANALYTICS (View 8)
   ============================================================ */

function ReportsAnalytics() {
  const { isDark, vehicles, trips, expenses, maintenance } = useFleet();
  const t = T(isDark);

  const nonRetired = vehicles.filter((v) => v.status !== "Retired");
  const onTrip = vehicles.filter((v) => v.status === "On Trip").length;
  const fleetUtilization = nonRetired.length ? Math.round((onTrip / nonRetired.length) * 100) : 0;

  const perVehicle = vehicles.map((v) => {
    const completedTrips = trips.filter((tr) => tr.vehicleId === v.id && tr.status === "Completed");
    const distance = completedTrips.reduce((s, tr) => s + tr.plannedDistance, 0);
    const revenue = completedTrips.reduce((s, tr) => s + tr.revenue, 0);
    const fuelExpenses = expenses.filter((e) => e.vehicleId === v.id && e.kind === "Fuel");
    const fuelCost = fuelExpenses.reduce((s, e) => s + e.amount, 0);
    const liters = fuelExpenses.reduce((s, e) => s + (e.liters || 0), 0);
    const maintCost = maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
    const fuelEfficiency = liters ? distance / liters : 0;
    const roi = v.acquisitionCost ? ((revenue - (maintCost + fuelCost)) / v.acquisitionCost) * 100 : 0;
    return { reg: v.regNumber, distance, fuelEfficiency, fuelCost, maintCost, revenue, roi };
  });

  const fuelEffData = perVehicle.filter((p) => p.fuelEfficiency > 0).map((p) => ({ name: p.reg, value: Number(p.fuelEfficiency.toFixed(2)) }));

  const costRevData = vehicles.map((v) => {
    const cost = expenses.filter((e) => e.vehicleId === v.id).reduce((s, e) => s + e.amount, 0)
      + maintenance.filter((m) => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
    const revenue = trips.filter((tr) => tr.vehicleId === v.id).reduce((s, tr) => s + tr.revenue, 0);
    return { name: v.regNumber, cost, revenue };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${t.text}`}>Reports & Analytics</h1>
          <p className={`text-sm ${t.sub}`}>Fuel efficiency, utilization, operational cost and ROI per vehicle.</p>
        </div>
        <PrimaryButton icon={Download}>Export CSV</PrimaryButton>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card isDark={isDark} className="p-5 flex flex-col items-center justify-center">
          <h3 className={`self-start font-semibold ${t.text} mb-2`}>Fleet Utilization</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={[{ name: "used", value: fleetUtilization }, { name: "rest", value: 100 - fleetUtilization }]} dataKey="value" innerRadius={55} outerRadius={80} startAngle={90} endAngle={-270}>
                <Cell fill="#06b6d4" />
                <Cell fill={isDark ? "#1e293b" : "#e2e8f0"} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className={`text-2xl font-bold -mt-24 ${t.text}`}>{fleetUtilization}%</div>
        </Card>
        <Card isDark={isDark} className="p-5">
          <h3 className={`font-semibold ${t.text} mb-4`}>Fuel Efficiency (km/L)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={fuelEffData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "#0e1420", border: "1px solid #1e293b", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card isDark={isDark} className="p-5 mb-4">
        <h3 className={`font-semibold ${t.text}`}>Operational Cost vs Revenue</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={costRevData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} />
            <YAxis tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} />
            <Tooltip contentStyle={{ background: "#0e1420", border: "1px solid #1e293b", borderRadius: 8, fontSize: 12 }} />
            <Legend />
            <Line type="monotone" dataKey="cost" stroke="#f59e0b" name="Total Cost" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card isDark={isDark} className="p-5">
        <h3 className={`font-semibold ${t.text}`}>Per-vehicle scorecard</h3>
        <p className={`text-xs ${t.sub} mb-3`}>ROI = (Revenue − (Maintenance + Fuel)) ÷ Acquisition Cost</p>
        <table className="w-full text-sm">
          <thead>
            <tr className={`text-left border-b ${t.border} ${t.sub} text-xs`}>
              <th className="py-2 font-medium">VEHICLE</th>
              <th className="py-2 font-medium">DISTANCE</th>
              <th className="py-2 font-medium">FUEL EFFICIENCY</th>
              <th className="py-2 font-medium">FUEL COST</th>
              <th className="py-2 font-medium">MAINT. COST</th>
              <th className="py-2 font-medium">REVENUE</th>
              <th className="py-2 font-medium">ROI</th>
            </tr>
          </thead>
          <tbody>
            {perVehicle.map((p) => (
              <tr key={p.reg} className={`border-b ${t.border} last:border-0`}>
                <td className="py-2.5 font-mono text-cyan-400">{p.reg}</td>
                <td className={`py-2.5 ${t.text}`}>{p.distance} km</td>
                <td className={`py-2.5 ${t.text}`}>{p.fuelEfficiency ? `${p.fuelEfficiency.toFixed(2)} km/L` : "—"}</td>
                <td className={`py-2.5 ${t.text}`}>₹{p.fuelCost.toLocaleString()}</td>
                <td className={`py-2.5 ${t.text}`}>₹{p.maintCost.toLocaleString()}</td>
                <td className={`py-2.5 ${t.text}`}>₹{p.revenue.toLocaleString()}</td>
                <td className={`py-2.5 font-semibold ${p.roi >= 0 ? "text-emerald-400" : "text-red-400"}`}>{p.roi.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ============================================================
   11. ROOT APP SHELL
   ============================================================ */

export default function FleetwaveRoot() {
  return (
    <FleetProvider>
      <FleetwaveApp />
    </FleetProvider>
  );
}

function FleetwaveApp() {
  const { user, isDark } = useFleet();
  const t = T(isDark);
  if (!user) return <LoginPage />;
  return (
    <div className={`min-h-screen w-full flex ${t.bg}`}>
      <Sidebar />
      <MainArea />
    </div>
  );
}

function MainArea() {
  const { page } = useFleet();
  const titleMap = {
    dashboard: "DASHBOARD", vehicles: "VEHICLES", drivers: "DRIVERS", trips: "TRIPS",
    maintenance: "MAINTENANCE", expenses: "FUEL & EXPENSES", reports: "REPORTS",
  };
  return (
    <div className="flex-1 overflow-y-auto">
      <TopBar title={titleMap[page]} />
      <div className="px-8 pb-10">
        {page === "dashboard" && <Dashboard />}
        {page === "vehicles" && <VehicleRegistry />}
        {page === "drivers" && <DriverManagement />}
        {page === "trips" && <TripManagement />}
        {page === "maintenance" && <MaintenanceLog />}
        {page === "expenses" && <FuelExpenses />}
        {page === "reports" && <ReportsAnalytics />}
      </div>
    </div>
  );
}
