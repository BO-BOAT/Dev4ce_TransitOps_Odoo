import { i as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useStore } from "./_ssr/store-DJ7oVqbZ.mjs";
import { _ as Navigate, d as Outlet, h as Link, y as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as ChartColumn, S as Menu, T as LayoutDashboard, _ as Receipt, d as Sun, g as Route, i as Users, n as X, o as Truck, r as Wrench, w as LogOut, x as Moon } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-Bx_lIoHk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_URL = "http://127.0.0.1:8000/api/v1";
async function fetchApi(endpoint, options = {}) {
	const token = localStorage.getItem("access_token");
	const headers = new Headers(options.headers || {});
	if (token) headers.set("Authorization", `Bearer ${token}`);
	if (!headers.has("Content-Type") && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers
	});
	if (!response.ok) {
		if (response.status === 401) localStorage.removeItem("access_token");
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.detail || `Request failed with status ${response.status}`);
	}
	if (response.status === 204) return null;
	return response.json();
}
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/vehicles",
		label: "Vehicles",
		icon: Truck
	},
	{
		to: "/drivers",
		label: "Drivers",
		icon: Users
	},
	{
		to: "/trips",
		label: "Trips",
		icon: Route
	},
	{
		to: "/maintenance",
		label: "Maintenance",
		icon: Wrench
	},
	{
		to: "/expenses",
		label: "Fuel & Expenses",
		icon: Receipt
	},
	{
		to: "/reports",
		label: "Reports",
		icon: ChartColumn
	}
];
function AppLayout() {
	const user = useStore((s) => s.currentUser);
	const logout = useStore((s) => s.logout);
	const theme = useStore((s) => s.theme);
	const toggleTheme = useStore((s) => s.toggleTheme);
	const hydrate = useStore((s) => s.hydrate);
	const router = useRouter();
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user) Promise.all([
			fetchApi("/vehicles").catch(() => []),
			fetchApi("/drivers").catch(() => []),
			fetchApi("/trips").catch(() => []),
			fetchApi("/maintenance").catch(() => []),
			fetchApi("/finance/expenses").catch(() => []),
			fetchApi("/finance/fuel").catch(() => [])
		]).then(([vehicles, drivers, trips, maintenance, backendExpenses, backendFuel]) => {
			const mappedVehicles = vehicles.map((v) => ({
				...v,
				id: v._id || v.id,
				regNumber: v.registration_number || v.regNumber,
				maxLoadKg: v.capacity || v.maxLoadKg,
				odometer: v.mileage || v.odometer,
				region: v.depot || v.region,
				type: "Truck",
				acquisitionCost: 0
			}));
			const mappedDrivers = drivers.map((d) => ({
				...d,
				id: d._id || d.id,
				name: d.name || `${d.first_name} ${d.last_name}`,
				licenseNumber: d.license_number || d.licenseNumber,
				licenseExpiry: d.license_expiry || d.licenseExpiry,
				contact: d.contact_number || d.contact,
				safetyScore: d.safety_score || d.safetyScore,
				licenseCategory: "C"
			}));
			const mappedTrips = trips.map((t) => ({
				...t,
				id: t._id || t.id,
				vehicleId: t.vehicle_id || t.vehicleId,
				driverId: t.driver_id || t.driverId,
				cargoKg: t.cargo_weight || t.cargoKg,
				plannedKm: t.planned_distance || t.plannedKm,
				actualKm: t.actual_distance || t.actualKm,
				createdAt: t.created_at || t.createdAt,
				revenue: 0
			}));
			const mappedMaintenance = maintenance.map((m) => ({
				...m,
				id: m._id || m.id,
				vehicleId: m.vehicle_id || m.vehicleId,
				startDate: m.start_date || m.startDate,
				endDate: m.end_date || m.endDate
			}));
			const expenses = [...backendExpenses.map((e) => ({
				...e,
				id: e._id || e.id,
				vehicleId: e.vehicle_id || e.vehicleId,
				kind: e.category || e.type || e.kind || "Other"
			})), ...backendFuel.map((f) => ({
				...f,
				id: f._id || f.id,
				vehicleId: f.vehicle_id || f.vehicleId,
				kind: "Fuel",
				amount: f.cost
			}))];
			hydrate({
				vehicles: mappedVehicles,
				drivers: mappedDrivers,
				trips: mappedTrips,
				maintenance: mappedMaintenance,
				expenses
			});
		});
	}, [user, hydrate]);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	const currentPath = router.state.location.pathname;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:flex lg:translate-x-0 ${open ? "translate-x-0 flex" : "-translate-x-full"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-16 items-center gap-2 border-b border-sidebar-border px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: "Fleetwave"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 p-3",
					children: nav.map((n) => {
						const active = currentPath.startsWith(n.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							onClick: () => setOpen(false),
							className: `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "size-4" }), n.label]
						}, n.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-sidebar-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-sidebar-accent p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-8 place-items-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold",
								children: user.name.split(" ").map((n) => n[0]).join("")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: user.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-sidebar-foreground/60 capitalize",
									children: user.role
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								logout();
								router.navigate({ to: "/" });
							},
							className: "mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-sidebar-border py-1.5 text-xs font-medium text-sidebar-foreground/80 transition hover:bg-sidebar hover:text-sidebar-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), " Sign out"]
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:pl-64",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(!open),
						className: "rounded-md p-2 hover:bg-muted lg:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "hidden font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground lg:block",
						children: nav.find((n) => currentPath.startsWith(n.to))?.label ?? "Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggleTheme,
							className: "rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "p-4 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AppLayout as component };
