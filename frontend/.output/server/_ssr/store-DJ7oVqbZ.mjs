import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DJ7oVqbZ.js
var uid = () => Math.random().toString(36).slice(2, 10);
var today = () => (/* @__PURE__ */ new Date()).toISOString();
var seedUsers = [
	{
		id: "u1",
		email: "admin@fleet.io",
		name: "Alex Admin",
		role: "admin"
	},
	{
		id: "u2",
		email: "dispatch@fleet.io",
		name: "Dana Dispatcher",
		role: "dispatcher"
	},
	{
		id: "u3",
		email: "manager@fleet.io",
		name: "Morgan Manager",
		role: "manager"
	}
];
var seedVehicles = [
	{
		id: "v1",
		regNumber: "KA-01-AB-1234",
		model: "Tata Prima 4928",
		type: "Truck",
		maxLoadKg: 25e3,
		odometer: 84300,
		acquisitionCost: 42e5,
		status: "Available",
		region: "South"
	},
	{
		id: "v2",
		regNumber: "MH-12-CD-5678",
		model: "Ashok Leyland Boss",
		type: "Truck",
		maxLoadKg: 16e3,
		odometer: 121500,
		acquisitionCost: 29e5,
		status: "On Trip",
		region: "West"
	},
	{
		id: "v3",
		regNumber: "DL-03-EF-9012",
		model: "Mahindra Blazo X",
		type: "Tanker",
		maxLoadKg: 2e4,
		odometer: 67800,
		acquisitionCost: 36e5,
		status: "In Shop",
		region: "North"
	},
	{
		id: "v4",
		regNumber: "TN-22-GH-3456",
		model: "Eicher Pro 6055",
		type: "Trailer",
		maxLoadKg: 35e3,
		odometer: 45200,
		acquisitionCost: 51e5,
		status: "Available",
		region: "South"
	},
	{
		id: "v5",
		regNumber: "GJ-05-JK-7890",
		model: "Force Traveller",
		type: "Van",
		maxLoadKg: 1800,
		odometer: 28900,
		acquisitionCost: 145e4,
		status: "Available",
		region: "West"
	},
	{
		id: "v6",
		regNumber: "UP-14-LM-2345",
		model: "Isuzu D-Max",
		type: "Pickup",
		maxLoadKg: 1200,
		odometer: 96700,
		acquisitionCost: 11e5,
		status: "Retired",
		region: "North"
	}
];
var seedDrivers = [
	{
		id: "d1",
		name: "Rajesh Kumar",
		licenseNumber: "DL-9823741",
		licenseCategory: "E",
		licenseExpiry: "2027-06-14",
		contact: "+91 98204 33421",
		safetyScore: 92,
		status: "Available"
	},
	{
		id: "d2",
		name: "Suresh Patel",
		licenseNumber: "DL-4471209",
		licenseCategory: "D",
		licenseExpiry: "2026-02-08",
		contact: "+91 90112 88291",
		safetyScore: 88,
		status: "On Trip"
	},
	{
		id: "d3",
		name: "Meera Iyer",
		licenseNumber: "DL-6612388",
		licenseCategory: "C",
		licenseExpiry: "2028-11-30",
		contact: "+91 99887 22110",
		safetyScore: 95,
		status: "Available"
	},
	{
		id: "d4",
		name: "Vikram Singh",
		licenseNumber: "DL-2298471",
		licenseCategory: "E",
		licenseExpiry: "2025-08-20",
		contact: "+91 89123 99801",
		safetyScore: 74,
		status: "Off Duty"
	},
	{
		id: "d5",
		name: "Anita Reddy",
		licenseNumber: "DL-8814407",
		licenseCategory: "D",
		licenseExpiry: "2026-05-11",
		contact: "+91 90887 12233",
		safetyScore: 81,
		status: "Suspended"
	}
];
var seedTrips = [
	{
		id: "t1",
		source: "Mumbai",
		destination: "Pune",
		vehicleId: "v2",
		driverId: "d2",
		cargoKg: 14e3,
		plannedKm: 150,
		status: "Dispatched",
		createdAt: today()
	},
	{
		id: "t2",
		source: "Bangalore",
		destination: "Chennai",
		vehicleId: "v1",
		driverId: "d1",
		cargoKg: 22e3,
		plannedKm: 350,
		actualKm: 358,
		revenue: 85e3,
		status: "Completed",
		createdAt: today(),
		completedAt: today()
	},
	{
		id: "t3",
		source: "Delhi",
		destination: "Jaipur",
		vehicleId: "v4",
		driverId: "d3",
		cargoKg: 3e4,
		plannedKm: 280,
		status: "Draft",
		createdAt: today()
	}
];
var seedMaintenance = [{
	id: "m1",
	vehicleId: "v3",
	description: "Engine overhaul & brake replacement",
	cost: 68e3,
	startDate: today()
}];
var seedExpenses = [
	{
		id: "e1",
		vehicleId: "v1",
		kind: "Fuel",
		amount: 28500,
		liters: 320,
		date: today(),
		note: "Full tank Bangalore depot"
	},
	{
		id: "e2",
		vehicleId: "v1",
		kind: "Toll",
		amount: 2400,
		date: today()
	},
	{
		id: "e3",
		vehicleId: "v2",
		kind: "Fuel",
		amount: 12200,
		liters: 140,
		date: today()
	},
	{
		id: "e4",
		vehicleId: "v4",
		kind: "Fuel",
		amount: 21e3,
		liters: 240,
		date: today()
	}
];
var useStore = create()(persist((set, get) => ({
	currentUser: null,
	users: seedUsers,
	vehicles: seedVehicles,
	drivers: seedDrivers,
	trips: seedTrips,
	maintenance: seedMaintenance,
	expenses: seedExpenses,
	theme: "dark",
	login: (email, password) => {
		const user = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
		if (!user || password.length < 3) return null;
		set({ currentUser: user });
		return user;
	},
	logout: () => set({ currentUser: null }),
	toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
	hydrate: (data) => set((state) => ({
		...state,
		...data
	})),
	addVehicle: (v) => {
		if (get().vehicles.some((x) => x.regNumber.toLowerCase() === v.regNumber.toLowerCase())) return {
			ok: false,
			error: "Registration number must be unique"
		};
		set({ vehicles: [...get().vehicles, {
			...v,
			id: uid()
		}] });
		return { ok: true };
	},
	updateVehicle: (id, v) => set({ vehicles: get().vehicles.map((x) => x.id === id ? {
		...x,
		...v
	} : x) }),
	deleteVehicle: (id) => set({ vehicles: get().vehicles.filter((x) => x.id !== id) }),
	addDriver: (d) => set({ drivers: [...get().drivers, {
		...d,
		id: uid()
	}] }),
	updateDriver: (id, d) => set({ drivers: get().drivers.map((x) => x.id === id ? {
		...x,
		...d
	} : x) }),
	deleteDriver: (id) => set({ drivers: get().drivers.filter((x) => x.id !== id) }),
	createTrip: (t) => {
		const veh = get().vehicles.find((v) => v.id === t.vehicleId);
		const drv = get().drivers.find((d) => d.id === t.driverId);
		if (!veh || !drv) return {
			ok: false,
			error: "Vehicle and driver required"
		};
		if (veh.status === "Retired" || veh.status === "In Shop") return {
			ok: false,
			error: "Vehicle is not dispatchable"
		};
		if (veh.status === "On Trip") return {
			ok: false,
			error: "Vehicle already on trip"
		};
		if (drv.status === "Suspended") return {
			ok: false,
			error: "Driver is suspended"
		};
		if (new Date(drv.licenseExpiry) < /* @__PURE__ */ new Date()) return {
			ok: false,
			error: "Driver license expired"
		};
		if (drv.status === "On Trip") return {
			ok: false,
			error: "Driver already on trip"
		};
		if (t.cargoKg > veh.maxLoadKg) return {
			ok: false,
			error: `Cargo exceeds max load (${veh.maxLoadKg} kg)`
		};
		set({ trips: [...get().trips, {
			...t,
			id: uid(),
			status: "Draft",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}] });
		return { ok: true };
	},
	dispatchTrip: (id) => {
		const trip = get().trips.find((t) => t.id === id);
		if (!trip || trip.status !== "Draft") return {
			ok: false,
			error: "Trip not in draft"
		};
		const veh = get().vehicles.find((v) => v.id === trip.vehicleId);
		const drv = get().drivers.find((d) => d.id === trip.driverId);
		if (veh.status !== "Available") return {
			ok: false,
			error: "Vehicle unavailable"
		};
		if (drv.status !== "Available") return {
			ok: false,
			error: "Driver unavailable"
		};
		if (new Date(drv.licenseExpiry) < /* @__PURE__ */ new Date()) return {
			ok: false,
			error: "Driver license expired"
		};
		set({
			trips: get().trips.map((t) => t.id === id ? {
				...t,
				status: "Dispatched"
			} : t),
			vehicles: get().vehicles.map((v) => v.id === veh.id ? {
				...v,
				status: "On Trip"
			} : v),
			drivers: get().drivers.map((d) => d.id === drv.id ? {
				...d,
				status: "On Trip"
			} : d)
		});
		return { ok: true };
	},
	completeTrip: (id, actualKm, revenue) => {
		const trip = get().trips.find((t) => t.id === id);
		if (!trip) return;
		set({
			trips: get().trips.map((t) => t.id === id ? {
				...t,
				status: "Completed",
				actualKm,
				revenue,
				completedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : t),
			vehicles: get().vehicles.map((v) => v.id === trip.vehicleId ? {
				...v,
				status: "Available",
				odometer: v.odometer + actualKm
			} : v),
			drivers: get().drivers.map((d) => d.id === trip.driverId ? {
				...d,
				status: "Available"
			} : d)
		});
	},
	cancelTrip: (id) => {
		const trip = get().trips.find((t) => t.id === id);
		if (!trip) return;
		const wasDispatched = trip.status === "Dispatched";
		set({
			trips: get().trips.map((t) => t.id === id ? {
				...t,
				status: "Cancelled"
			} : t),
			vehicles: wasDispatched ? get().vehicles.map((v) => v.id === trip.vehicleId ? {
				...v,
				status: "Available"
			} : v) : get().vehicles,
			drivers: wasDispatched ? get().drivers.map((d) => d.id === trip.driverId ? {
				...d,
				status: "Available"
			} : d) : get().drivers
		});
	},
	openMaintenance: (m) => {
		set({
			maintenance: [...get().maintenance, {
				...m,
				id: uid()
			}],
			vehicles: get().vehicles.map((v) => v.id === m.vehicleId && v.status !== "Retired" ? {
				...v,
				status: "In Shop"
			} : v)
		});
	},
	closeMaintenance: (id) => {
		const rec = get().maintenance.find((m) => m.id === id);
		if (!rec) return;
		set({
			maintenance: get().maintenance.map((m) => m.id === id ? {
				...m,
				endDate: (/* @__PURE__ */ new Date()).toISOString()
			} : m),
			vehicles: get().vehicles.map((v) => v.id === rec.vehicleId && v.status !== "Retired" ? {
				...v,
				status: "Available"
			} : v)
		});
	},
	addExpense: (e) => set({ expenses: [...get().expenses, {
		...e,
		id: uid()
	}] })
}), { name: "fleet-store-v1" }));
function exportCSV(filename, rows) {
	return _exportCSV(filename, rows);
}
function _exportCSV(filename, rows) {
	if (!rows.length) return;
	const headers = Object.keys(rows[0]);
	const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => {
		const v = r[h];
		const s = v == null ? "" : String(v).replace(/"/g, "\"\"");
		return /[",\n]/.test(s) ? `"${s}"` : s;
	}).join(","))].join("\n");
	const blob = new Blob([csv], { type: "text/csv" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
//#endregion
export { useStore as n, exportCSV as t };
