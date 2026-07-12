import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useStore } from "./store-DJ7oVqbZ.mjs";
import { _ as Navigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as ChartColumn, f as ShieldCheck, g as Route, o as Truck, r as Wrench, t as Zap } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BtM997Tb.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	if (useStore((s) => s.currentUser)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-bold tracking-tight",
							children: "Fleetwave"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
						children: "Sign in"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-bg opacity-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-7xl px-6 py-24 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent animate-pulse" }), "Live operations, one command center"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl",
								children: [
									"The transport operations platform that ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
										children: "enforces the rules"
									}),
									" for you."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground",
								children: "Digitize your fleet end-to-end. Vehicles, drivers, dispatch, maintenance and expenses — with automatic status transitions and business-rule guardrails built in."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:translate-y-[-1px]",
									children: "Open the dashboard →"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#features",
									className: "rounded-lg border border-border bg-card/40 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-card",
									children: "See features"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs text-muted-foreground",
								children: [
									"Demo login: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded bg-muted px-1.5 py-0.5",
										children: "admin@fleet.io"
									}),
									" / any password"
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "features",
				className: "mx-auto max-w-7xl px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: [
						{
							icon: Truck,
							title: "Vehicle Registry",
							desc: "Unique-VIN registry, statuses, and lifecycle tracking."
						},
						{
							icon: Route,
							title: "Dispatch Engine",
							desc: "Rule-enforced trip creation with cargo & license checks."
						},
						{
							icon: Wrench,
							title: "Maintenance Log",
							desc: "Open a ticket, vehicle auto-flips to In Shop."
						},
						{
							icon: ChartColumn,
							title: "Ops Analytics",
							desc: "Fuel efficiency, utilization, and ROI per vehicle."
						},
						{
							icon: ShieldCheck,
							title: "RBAC & Audit",
							desc: "Admin, dispatcher, manager roles baked in."
						},
						{
							icon: Zap,
							title: "Live KPIs",
							desc: "Active trips, available fleet, drivers on duty."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group rounded-xl border border-border bg-card p-6 transition hover:border-primary/50 hover:shadow-elevated",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-lg font-semibold",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: f.desc
							})
						]
					}, f.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border/60 py-8 text-center text-sm text-muted-foreground",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Fleetwave — Smart Transport Operations Platform"
				]
			})
		]
	});
}
//#endregion
export { Landing as component };
