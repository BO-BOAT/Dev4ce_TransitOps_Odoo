import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { m as Search } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.vehicles-CqR2UKDW.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./_app.vehicles-CHp4u9Cy.mjs");
var Route$1 = createFileRoute("/_app/vehicles")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
function PageHeader({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col justify-between gap-4 md:flex-row md:items-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: subtitle
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children
		})]
	});
}
function Toolbar({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-center gap-2",
		children
	});
}
function SearchBox({ value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex-1 min-w-[240px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none ring-ring/20 transition focus:border-primary focus:ring-4"
		})]
	});
}
function FilterSelect({ value, onChange, label, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "bg-transparent text-sm outline-none",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o,
				className: "bg-background",
				children: o === "all" ? "All" : o
			}, o))
		})]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${{
			Available: "bg-success/15 text-success ring-success/30",
			"On Trip": "bg-primary/15 text-primary ring-primary/30",
			"In Shop": "bg-warning/15 text-warning ring-warning/30",
			Retired: "bg-muted text-muted-foreground ring-border",
			"Off Duty": "bg-muted text-muted-foreground ring-border",
			Suspended: "bg-destructive/15 text-destructive ring-destructive/30",
			Draft: "bg-muted text-muted-foreground ring-border",
			Dispatched: "bg-primary/15 text-primary ring-primary/30",
			Completed: "bg-success/15 text-success ring-success/30",
			Cancelled: "bg-destructive/15 text-destructive ring-destructive/30"
		}[status] ?? ""}`,
		children: status
	});
}
function Th({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: "px-4 py-3 text-left font-medium",
		children
	});
}
function Td({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: `px-4 py-3 ${className}`,
		children
	});
}
function Modal({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-elevated",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-xl font-semibold",
				children: title
			}), children]
		})
	});
}
function Field({ label, children, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
			children: [label, required && " *"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children
		})]
	});
}
//#endregion
export { Route$1 as a, Td as c, PageHeader as i, Th as l, FilterSelect as n, SearchBox as o, Modal as r, StatusBadge as s, Field as t, Toolbar as u };
