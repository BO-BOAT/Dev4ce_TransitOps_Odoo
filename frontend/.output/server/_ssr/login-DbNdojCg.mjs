import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as useStore } from "./store-9LEy85iz.mjs";
import { h as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Truck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DbNdojCg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	useStore((s) => s.login);
	const users = useStore((s) => s.users);
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("admin@fleet.io");
	const [password, setPassword] = (0, import_react.useState)("demo");
	const setLogin = useStore((s) => s.login);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new URLSearchParams();
			formData.append("username", email);
			formData.append("password", password);
			const response = await fetch(`/api/v1/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: formData
			});
			if (!response.ok) throw new Error("Invalid credentials");
			const data = await response.json();
			localStorage.setItem("access_token", data.access_token);
			const u = setLogin(email, password);
			if (u) toast.success(`Welcome, ${u.name}`);
			else toast.success(`Welcome, ${email}`);
			navigate({ to: "/dashboard" });
		} catch (err) {
			toast.error("Invalid credentials");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-bg opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -left-40 size-500px rounded-full bg-primary/20 blur-140px" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -right-40 size-500px rounded-full bg-accent/20 blur-140px" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-8 flex items-center gap-2 self-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-bold",
						children: "Fleetwave"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl shadow-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-bold",
							children: "Sign in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Access your operations command center."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 transition focus:border-primary focus:ring-4",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 transition focus:border-primary focus:ring-4",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90",
									children: "Sign in →"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "flex w-full items-center justify-center rounded-lg border border-border bg-card/40 py-2.5 text-sm font-semibold transition hover:bg-card",
									children: "← Back"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Demo accounts (any password works):"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 space-y-1",
								children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEmail(u.email),
									className: "flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs hover:bg-background",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: u.email
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-primary/15 px-1.5 py-0.5 text-10px uppercase text-primary",
										children: u.role
									})]
								}, u.id))
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
