import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Route as RouteIcon,
  Wrench,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const features = [
    {
      icon: Truck,
      title: "Vehicle Registry",
      desc: "Unique-VIN registry, statuses, and lifecycle tracking.",
    },
    {
      icon: RouteIcon,
      title: "Dispatch Engine",
      desc: "Rule-enforced trip creation with cargo & license checks.",
    },
    {
      icon: Wrench,
      title: "Maintenance Log",
      desc: "Open a ticket, vehicle auto-flips to In Shop.",
    },
    {
      icon: BarChart3,
      title: "Ops Analytics",
      desc: "Fuel efficiency, utilization, and ROI per vehicle.",
    },
    {
      icon: ShieldCheck,
      title: "RBAC & Audit",
      desc: "Admin, dispatcher, manager roles baked in.",
    },
    {
      icon: Zap,
      title: "Live KPIs",
      desc: "Active trips, available fleet, drivers on duty.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
              <Truck className="size-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Fleetwave
            </span>
          </div>
          <Link
            to="/login"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Live operations, one command center
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            The transport operations platform that{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              enforces the rules
            </span>{" "}
            for you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Digitize your fleet end-to-end. Vehicles, drivers, dispatch,
            maintenance and expenses — with automatic status transitions and
            business-rule guardrails built in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:translate-y-[-1px]"
            >
              Open the dashboard →
            </Link>
            <a
              href="#features"
              className="rounded-lg border border-border bg-card/40 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-card"
            >
              See features
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Demo login:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              admin@fleet.io
            </code>{" "}
            / any password
          </p>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition hover:border-primary/50 hover:shadow-elevated"
            >
              <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Fleetwave — Smart Transport Operations
        Platform
      </footer>
    </div>
  );
}
