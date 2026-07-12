import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Truck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const login = useStore((s) => s.login);
  const users = useStore((s) => s.users);
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@fleet.io");
  const [password, setPassword] = useState("demo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = login(email, password);
    if (!u) return toast.error("Invalid credentials");
    toast.success(`Welcome, ${u.name}`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-accent/20 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link to="/" className="mb-8 flex items-center gap-2 self-center">
          <div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <Truck className="size-5" />
          </div>
          <span className="font-display text-2xl font-bold">Fleetwave</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl shadow-elevated">
          <h1 className="font-display text-2xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Access your operations command center.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 transition focus:border-primary focus:ring-4"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/20 transition focus:border-primary focus:ring-4"
                required
              />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
              Sign in →
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-3">
            <p className="text-xs font-medium text-muted-foreground">Demo accounts (any password works):</p>
            <div className="mt-2 space-y-1">
              {users.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setEmail(u.email)}
                  className="flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs hover:bg-background"
                >
                  <span className="font-mono">{u.email}</span>
                  <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] uppercase text-primary">{u.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
